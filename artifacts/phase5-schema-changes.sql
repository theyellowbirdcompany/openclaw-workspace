-- =============================================================================
-- Agent OS v3 — Phase 5 Schema Changes
-- Prepared by: Devan (Technical Builder)
-- Status: Ready for Atlas review → Bernard sign-off → Brett approval
-- Date: 2026-03-07
-- =============================================================================
-- IMPORTANT: Run this file in full, in order, in a single transaction.
-- Test against staging before applying to production.
-- Brett's directive: Logging is the contract. Non-negotiable from day one.
-- =============================================================================

BEGIN;

-- =============================================================================
-- TASK 1 — Add run_id to agent_logs, agent_costs, todos
-- =============================================================================
-- NOTE: A foreign key constraint to agent_runs(id) is intentionally omitted
-- per the spec. Rows in these tables may exist independently of a run (e.g.,
-- manual entries, legacy data). If referential integrity becomes a requirement
-- in a future phase, add:
--   CONSTRAINT fk_run_id FOREIGN KEY (run_id) REFERENCES agent_runs(id) ON DELETE SET NULL
-- with a deferred or partial index strategy to handle nulls.
-- =============================================================================

ALTER TABLE agent_logs
  ADD COLUMN IF NOT EXISTS run_id UUID NULL;

COMMENT ON COLUMN agent_logs.run_id
  IS 'Optional reference to agent_runs(id). No FK constraint — run may not exist for all log entries.';

-- -----------------------------------------------------------------------------

ALTER TABLE agent_costs
  ADD COLUMN IF NOT EXISTS run_id UUID NULL;

COMMENT ON COLUMN agent_costs.run_id
  IS 'Optional reference to agent_runs(id). No FK constraint — cost may be logged outside of a tracked run.';

-- -----------------------------------------------------------------------------

ALTER TABLE todos
  ADD COLUMN IF NOT EXISTS run_id UUID NULL;

COMMENT ON COLUMN todos.run_id
  IS 'Optional reference to agent_runs(id). No FK constraint — todos may be created outside of a tracked run.';


-- =============================================================================
-- TASK 2 — Create agent_status table
-- =============================================================================
-- Designed for upsert on heartbeat. Each agent maintains one row keyed by
-- agent_name. On each pulse, agents issue:
--   INSERT INTO agent_status (...) VALUES (...)
--   ON CONFLICT (agent_name) DO UPDATE SET last_seen = ..., status = ..., ...
-- =============================================================================

CREATE TABLE IF NOT EXISTS agent_status (
  agent_name   TEXT        NOT NULL,
  last_seen    TIMESTAMPTZ NOT NULL,
  current_task TEXT        NULL,
  status       TEXT        NOT NULL CHECK (status IN ('active', 'idle', 'offline')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT agent_status_pkey PRIMARY KEY (agent_name)
);

COMMENT ON TABLE agent_status
  IS 'Live heartbeat/status table. One row per agent. Designed for upsert on each pulse.';

COMMENT ON COLUMN agent_status.agent_name
  IS 'Unique agent identifier. Primary key. e.g. bernard, devan, atlas.';

COMMENT ON COLUMN agent_status.last_seen
  IS 'Timestamp of the most recent heartbeat from this agent.';

COMMENT ON COLUMN agent_status.current_task
  IS 'Short description of the task the agent is currently executing. Null when idle.';

COMMENT ON COLUMN agent_status.status
  IS 'Current lifecycle state. One of: active, idle, offline.';

COMMENT ON COLUMN agent_status.updated_at
  IS 'Timestamp of the last row update. Set by the agent on each upsert.';

-- Enable Row Level Security
ALTER TABLE agent_status ENABLE ROW LEVEL SECURITY;

-- Anon full access policy (matching existing table pattern)
CREATE POLICY "anon_full_access_agent_status"
  ON agent_status
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);


-- =============================================================================
-- TASK 3 — Add archived_at to agent_logs, heartbeat_logs, todos
-- =============================================================================
-- Convention: NULL = active record. Populated = soft-archived.
-- Archiving should be done via UPDATE ... SET archived_at = now()
-- Active record queries should filter: WHERE archived_at IS NULL
-- =============================================================================

ALTER TABLE agent_logs
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ NULL;

COMMENT ON COLUMN agent_logs.archived_at
  IS 'Soft-archive timestamp. NULL = active. Populated = archived. Filter with WHERE archived_at IS NULL for active records.';

-- -----------------------------------------------------------------------------

ALTER TABLE heartbeat_logs
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ NULL;

COMMENT ON COLUMN heartbeat_logs.archived_at
  IS 'Soft-archive timestamp. NULL = active. Populated = archived. Filter with WHERE archived_at IS NULL for active records.';

-- -----------------------------------------------------------------------------

ALTER TABLE todos
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ NULL;

COMMENT ON COLUMN todos.archived_at
  IS 'Soft-archive timestamp. NULL = active. Populated = archived. Filter with WHERE archived_at IS NULL for active records.';


-- =============================================================================
-- TASK 4 — Create north_star_history table
-- =============================================================================
-- Append-only versioning table. No row should ever be updated or deleted.
-- Enforcement strategy:
--   - RLS policy blocks UPDATE and DELETE for all roles including anon.
--   - Application layer should never issue UPDATE/DELETE against this table.
--   - For service-role bypasses: audit at the application layer; RLS alone
--     cannot block service_role in Supabase without additional safeguards.
-- =============================================================================

CREATE TABLE IF NOT EXISTS north_star_history (
  id             UUID        NOT NULL DEFAULT gen_random_uuid(),
  north_star_id  UUID        NOT NULL,
  content        TEXT        NOT NULL,
  changed_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  changed_by     TEXT        NULL,
  reason         TEXT        NULL,

  CONSTRAINT north_star_history_pkey PRIMARY KEY (id)
);

COMMENT ON TABLE north_star_history
  IS 'Append-only audit/version log for north star entries. No updates or deletes permitted.';

COMMENT ON COLUMN north_star_history.id
  IS 'UUID primary key. Auto-generated on insert.';

COMMENT ON COLUMN north_star_history.north_star_id
  IS 'Reference to the north_star record this history entry belongs to.';

COMMENT ON COLUMN north_star_history.content
  IS 'Full snapshot of the north star content at the time of this change.';

COMMENT ON COLUMN north_star_history.changed_at
  IS 'Timestamp when this version was recorded. Immutable after insert.';

COMMENT ON COLUMN north_star_history.changed_by
  IS 'Agent name or user identifier that triggered the change. Nullable.';

COMMENT ON COLUMN north_star_history.reason
  IS 'Optional human-readable explanation for why the north star was updated.';

-- Index for efficient lookup by north_star_id
CREATE INDEX IF NOT EXISTS idx_north_star_history_north_star_id
  ON north_star_history (north_star_id);

-- Enable Row Level Security
ALTER TABLE north_star_history ENABLE ROW LEVEL SECURITY;

-- INSERT allowed for anon (append-only writes)
CREATE POLICY "anon_insert_north_star_history"
  ON north_star_history
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- SELECT allowed for anon (full read access)
CREATE POLICY "anon_select_north_star_history"
  ON north_star_history
  FOR SELECT
  TO anon
  USING (true);

-- NOTE: No UPDATE or DELETE policies are created. This enforces append-only
-- at the RLS layer for all non-service roles. The absence of a policy for
-- UPDATE/DELETE means those operations are denied by default under RLS.
-- Supabase service_role bypasses RLS — enforce append-only at the app layer
-- for service_role operations.


-- =============================================================================
-- END OF PHASE 5 SCHEMA CHANGES
-- =============================================================================

COMMIT;
