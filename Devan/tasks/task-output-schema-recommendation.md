# task_output Schema Design — Architectural Recommendation

**Author:** Devan  
**Date:** 2026-03-12  
**Status:** Proposal — Do Not Implement Yet  
**Task:** Design `task_output` storage for agent work products

---

## 1. Current State Assessment

### What `agent_logs` captures today

```sql
agent_logs (
  id               uuid,
  run_id           uuid,          -- FK to agent_runs (optional)
  agent_name       text,
  department       text,
  task_description text,          -- WHAT the agent was asked to do
  model_used       text,
  status           text,          -- completed | failed
  message          text,          -- short freeform note (often null)
  created_at       timestamptz
)
```

### The gap

`agent_logs` records **that** work happened and **whether** it succeeded. It has no structured place for **what the agent produced**. The `message` field is closest but it's a weak text field — no size guidance, no typing, no queryability.

When 7 agents answer "What is your favorite color?", the current schema can log:
- ✅ Agent name, timestamp, status
- ❌ The actual answer (gold, blue, navy, electric blue, cyan, etc.)

### The parallel schema: `office_phase1_migration.sql`

The office visualization migration already has a `task_logs` table with `task_output text`. This is a newer, cleaner model. However, `agent_logs` is the **operative logging table** per `LOGGING_SPEC.md`, so any output solution needs to fit there or extend it.

---

## 2. The Two Options

### Option A — Add `task_output` column to `agent_logs` (Simple)

Add one column directly to the existing table:

```sql
ALTER TABLE public.agent_logs
  ADD COLUMN IF NOT EXISTS task_output text;
```

**How agents use it:**

```bash
curl -X POST ".../agent_logs" \
  -d '{
    "agent_name": "Devan",
    "task_description": "What is your favorite color?",
    "status": "completed",
    "task_output": "Electric blue — specifically #0047FF. No context needed."
  }'
```

**Pros:**
- Zero schema complexity — one column, one table
- LOGGING_SPEC.md stays mostly unchanged (just add `task_output` as optional field)
- Command Center reads from one place
- No JOINs needed for the office visualization
- Agents log everything in one shot

**Cons:**
- `text` column has no size limit — a long code deliverable or research report could be MBs
- No versioning (can't update an answer mid-task without a new row)
- No structured typing (code vs. prose vs. JSON all look the same)
- Postgres row bloat if many agents log large outputs frequently

---

### Option B — Separate `task_outputs` table with FK (Scalable)

Create a new table, linked by `run_id` or `agent_log_id`:

```sql
CREATE TABLE public.task_outputs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_log_id    uuid REFERENCES public.agent_logs(id) ON DELETE CASCADE,
  agent_name      text NOT NULL,
  output_type     text,           -- 'answer' | 'code' | 'report' | 'plan' | 'brief'
  content         text NOT NULL,  -- the actual output
  content_format  text DEFAULT 'text',  -- 'text' | 'markdown' | 'json' | 'html'
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_task_outputs_agent_log_id ON task_outputs (agent_log_id);
CREATE INDEX idx_task_outputs_agent_name   ON task_outputs (agent_name);
CREATE INDEX idx_task_outputs_created_at   ON task_outputs (created_at DESC);

ALTER TABLE public.task_outputs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "task_outputs_select" ON public.task_outputs
  FOR SELECT USING (auth.role() IN ('anon', 'authenticated', 'service_role'));
CREATE POLICY "task_outputs_insert" ON public.task_outputs
  FOR INSERT WITH CHECK (auth.role() IN ('authenticated', 'service_role'));
```

**How agents use it:** Two-step process:
1. POST to `agent_logs` → get back the new `id`
2. POST to `task_outputs` with that `id` as `agent_log_id`

**Pros:**
- Clean separation of concerns: metadata in `agent_logs`, content in `task_outputs`
- Can store multiple outputs per task (e.g., draft + final)
- Typed (`output_type`, `content_format`) — queryable
- Easier to paginate large outputs
- Future-proof: can add `storage_url` for large files without touching core schema

**Cons:**
- Two API calls per task (adds latency and failure surface)
- Agents need to capture the returned `id` from step 1 to use in step 2
- More complex LOGGING_SPEC.md instructions
- JOIN required in Command Center queries
- Overkill if outputs are mostly short answers

---

## 3. Recommendation: Option A with a size guardrail

**Use Option A (add `task_output` to `agent_logs`)**, with one practical constraint added to LOGGING_SPEC.md:

> If `task_output` exceeds ~8,000 characters, log a summary here and store the full artifact in the `artifacts` table instead.

### Why A wins for this system

1. **Agents are already one-shot loggers.** LOGGING_SPEC.md defines one curl call, one table. Option B breaks this contract and doubles failure surface.

2. **Outputs are mostly small.** "What's your favorite color?" answers, status reports, brief recommendations — these are < 1KB. The rare large output (code, report) should go to `artifacts` (already exists in schema).

3. **Command Center doesn't need to JOIN.** The office visualization can display agent answers in real-time with a simple `SELECT agent_name, task_description, task_output, status FROM agent_logs ORDER BY created_at DESC`.

4. **`artifacts` already handles the large content case.** The existing schema has `artifacts (content text)` linked to `agent_runs`. Large deliverables belong there. `task_output` in `agent_logs` is for the *answer summary*, not the full artifact.

5. **Option B is premature optimization.** The system is early-stage. Add complexity when the problem actually appears.

---

## 4. Proposed Migration SQL

```sql
-- ============================================================
-- Migration: Add task_output to agent_logs
-- Purpose: Capture actual work product / answer per task
-- Safe: non-destructive, nullable column
-- ============================================================

ALTER TABLE public.agent_logs
  ADD COLUMN IF NOT EXISTS task_output text;

COMMENT ON COLUMN public.agent_logs.task_output IS
  'The actual output/answer produced by the agent for this task. 
   Keep to ~8,000 chars max. For large deliverables, use the artifacts table instead.';

-- Optional: index for full-text search if Command Center needs it later
-- CREATE INDEX idx_agent_logs_task_output_fts
--   ON public.agent_logs USING gin(to_tsvector(''english'', coalesce(task_output, '''')));
```

**That's it. One column. Backward-compatible. All existing logs unaffected.**

---

## 5. Updated LOGGING_SPEC.md Payload

After migration, the standard logging payload becomes:

```json
{
  "agent_name": "Devan",
  "task_description": "What is your favorite color?",
  "model_used": "claude-sonnet-4-5",
  "status": "completed",
  "task_output": "Electric blue (#0047FF). It's the most expressive blue in the spectrum."
}
```

`task_output` is **optional** — if omitted, existing behavior is unchanged. Agents include it when they have a meaningful answer to log.

---

## 6. Command Center Query Pattern

For the live office visualization, the Command Center can display recent agent work with:

```sql
-- Latest activity per agent (with output)
SELECT
  agent_name,
  task_description,
  task_output,
  status,
  created_at
FROM agent_logs
ORDER BY created_at DESC
LIMIT 50;

-- Agent answer board (e.g., "favorite color" question)
SELECT
  agent_name,
  task_output,
  created_at
FROM agent_logs
WHERE task_description ILIKE '%favorite color%'
  AND task_output IS NOT NULL
ORDER BY created_at DESC;
```

No JOINs. No complexity. Realtime subscription via Supabase works on a single table.

---

## 7. Considered Alternatives

| Approach | Verdict |
|---|---|
| Add `task_output text` to `agent_logs` | ✅ **Recommended** |
| Separate `task_outputs` table with FK | ❌ Overkill for now — two-call logging breaks simplicity |
| Use `message` field (existing) | ❌ No — `message` is for error notes, not deliverables |
| Store everything in `artifacts` | ❌ Requires `agent_runs` FK — too heavy for simple answers |
| JSONB column for structured output | ❌ Agents can't reliably serialize JSONB in curl; use `content_format` field if needed later |

---

## 8. Future Evolution Path

If/when the system grows:

1. **Large outputs**: Add `task_output_url text` alongside `task_output text` — store large content in Supabase Storage, log the URL
2. **Structured outputs**: Add `task_output_format text DEFAULT 'text'` for typing
3. **Versioning**: If outputs need revision history, *then* extract to `task_outputs` table
4. **Search**: Add GIN index on `task_output` for full-text search when Command Center needs it

These are all additive, non-breaking changes. Start simple.

---

## Summary

**Recommendation:** Add `task_output text` to `agent_logs`. One column. One migration. Agents include it in their existing single-curl log call. Command Center reads from one table with no JOINs.

The `artifacts` table handles large deliverables. `task_output` handles answers, summaries, and brief outputs. Clear separation of size, not a separate table structure.
