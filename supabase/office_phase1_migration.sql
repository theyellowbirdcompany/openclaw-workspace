-- ============================================================
-- Office Visualization Phase 1 — Migration
-- Tables: agent_sessions, task_logs
-- Run in Supabase SQL editor
-- ============================================================

-- ─── agent_sessions ─────────────────────────────────────────
-- One live row per agent — tracks real-time presence & status

create table if not exists agent_sessions (
  id              uuid primary key default gen_random_uuid(),
  agent_id        text not null unique,                   -- claw | bernard | devan | etc.
  agent_name      text not null,                          -- display name
  status          text not null default 'idle'            -- idle | in_task | submitting
                    check (status in ('idle', 'in_task', 'submitting')),
  current_task_id text,                                   -- FK to task_logs.id (nullable)
  logged_in_at    timestamptz not null default now(),
  last_active_at  timestamptz not null default now()
);

-- Indexes
create index if not exists idx_agent_sessions_agent_id   on agent_sessions (agent_id);
create index if not exists idx_agent_sessions_status     on agent_sessions (status);
create index if not exists idx_agent_sessions_last_active on agent_sessions (last_active_at desc);

-- RLS: allow anon reads, service-role writes
alter table agent_sessions enable row level security;

create policy "agent_sessions_read" on agent_sessions
  for select using (true);

create policy "agent_sessions_write" on agent_sessions
  for all using (auth.role() = 'service_role');

-- ─── task_logs ──────────────────────────────────────────────
-- Full task lifecycle — one row per task

create table if not exists task_logs (
  id           uuid primary key default gen_random_uuid(),
  agent_id     text not null references agent_sessions (agent_id) on delete cascade,
  task_title   text not null,
  task_input   text,                                      -- full prompt / instructions
  task_output  text,                                      -- full response / work product
  started_at   timestamptz not null default now(),
  completed_at timestamptz,
  status       text not null default 'in_progress'        -- in_progress | completed | failed
                 check (status in ('in_progress', 'completed', 'failed')),
  created_at   timestamptz not null default now()
);

-- Indexes
create index if not exists idx_task_logs_agent_id    on task_logs (agent_id);
create index if not exists idx_task_logs_status      on task_logs (status);
create index if not exists idx_task_logs_started_at  on task_logs (started_at desc);
create index if not exists idx_task_logs_completed_at on task_logs (completed_at desc nulls last);

-- RLS
alter table task_logs enable row level security;

create policy "task_logs_read" on task_logs
  for select using (true);

create policy "task_logs_write" on task_logs
  for all using (auth.role() = 'service_role');

-- ─── Seed: initial agent rows (idle on boot) ────────────────
insert into agent_sessions (agent_id, agent_name, status)
values
  ('claw',        'Claw',        'idle'),
  ('bernard',     'Bernard',     'idle'),
  ('christopher', 'Christopher', 'idle'),
  ('devan',       'Devan',       'idle'),
  ('vale',        'Vale',        'idle'),
  ('scribe',      'Scribe',      'idle'),
  ('atlas',       'Atlas',       'idle')
on conflict (agent_id) do nothing;

-- ─── Sample INSERTs for Phase 2 testing ────────────────────
-- Run these manually when you want test data:
--
-- INSERT INTO task_logs (agent_id, task_title, task_input, status)
-- VALUES ('devan', 'Build Office Visualization', 'Create Phase 1 office vis...', 'in_progress');
--
-- UPDATE agent_sessions
-- SET status = 'in_task', current_task_id = '<task_log_id>', last_active_at = now()
-- WHERE agent_id = 'devan';
--
-- UPDATE task_logs
-- SET status = 'completed', completed_at = now(), task_output = 'Delivered all deliverables!'
-- WHERE agent_id = 'devan' AND status = 'in_progress';
--
-- UPDATE agent_sessions
-- SET status = 'submitting', last_active_at = now()
-- WHERE agent_id = 'devan';
--
-- UPDATE agent_sessions
-- SET status = 'idle', current_task_id = null, last_active_at = now()
-- WHERE agent_id = 'devan';
