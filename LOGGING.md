# LOGGING.md — Agent OS Run Lifecycle

All worker agents must follow this lifecycle for every task.

Supabase URL: https://jcfsmpgugqqsasfrswyw.supabase.co
Supabase Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjZnNtcGd1Z3Fxc2FzZnJzd3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTg2MjQsImV4cCI6MjA4ODMzNDYyNH0.Rwt-6u7gYrS85kJsob10tW7FOXXCjFY8sLJZRD3vQXI

GitHub PAT (theyellowbirdcompany): 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
Tavily API Key (Christopher): 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
Jina Reader API Key (Christopher): jina_22bc94e06bbc40cebd8c88a19e3790cdMmmzGtGPgzcKcxiJHIvyvXtAGa5G
E2B API Key (Devan): e2b_de5ade11f9a25fc44fa49bc915f797150fb6af4b
GitHub API PAT (Devan): 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
Google Gemini API Key (Vale / design): AIzaSyCC9UNmrbVutdSbblloGl7EIH0eJ0Ax-QQ
GitHub Repo: https://github.com/FrozenCorn2113/OpenClaw_Dashboard.git
GitHub Username for pushes: theyellowbirdcompany
GitHub Email for pushes: theyellowbirdcompany@gmail.com
Supabase Service Role Key (Devan DDL only): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjZnNtcGd1Z3Fxc2FzZnJzd3l3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc1ODYyNCwiZXhwIjoyMDg4MzM0NjI0fQ.Xlunv65ZPZgFkTrFvOwlkxzprpRlKXfEwZMypW0DR20

## Git Push Rules
- ONLY Claw and Devan may push to GitHub
- ONLY with: name=theyellowbirdcompany, email=theyellowbirdcompany@gmail.com
- Bernard and all other agents hand off to Devan or Claw for final push
- Always verify author before pushing: git log --format="%an <%ae>" -1

## Credential Policy
- Anon key → agents may use and commit to private repos
- GitHub PAT → agents may use for pushes to private repos
- Service role key → Devan (DDL/schema only) + Brett. Never in any repo. Never used by other agents.

---

## CREDENTIAL POLICY — EFFECTIVE 2026-03-07

**Anon key** — Agent credential. Respects RLS. Safe to store in this file. Agents use this for all reads and writes.

**Service role key** — Devan may use this for Supabase DDL/schema operations only. Brett also holds this key. Never committed to any repo. No other agents may use it.

> Devan does not need the service role key. Schema changes are Brett's domain.

This is an operational boundary, not a suggestion. Every agent on the team must understand it.

---

## ⚠️ STANDING INSTRUCTION — SCHEMA INTROSPECTION (2026-03-07)

**Before writing to ANY Supabase table, you MUST introspect the live schema.**
Do NOT assume column names. Do NOT rely on documentation or memory.
The source of truth is the live schema returned by the OpenAPI endpoint.

```
GET https://jcfsmpgugqqsasfrswyw.supabase.co/rest/v1/
Headers:
  apikey: <anon key>
  Authorization: Bearer <anon key>
```

The response contains a `definitions` object with all tables and their actual column names.
Introspect first. Write second. No exceptions.

**This applies to ALL agents: Bernard, Christopher, Devan, Vale, Scribe, Atlas, Claw.**
This instruction is included in every agent brief going forward.

---

## Live Supabase Schema (Phase 6 — Verified 2026-03-07)

> Columns verified by live OpenAPI introspection. Re-verify before writing. Schema may change.

### agent_logs
`id`, `agent_name`, `task_description`, `model_used`, `tokens_used`, `cost_usd`, `status`, `north_star_id`, `created_at`, `run_id`, `archived_at`

> ⚠️ No `department` column. No `message` column. Use `task_description` for task summary.

### agent_costs
`id`, `agent_name`, `model_used`, `tokens_input`, `tokens_output`, `cost_usd`, `session_date`, `north_star_id`, `created_at`, `run_id`

### agent_status
`agent_name`, `last_seen`, `current_task`, `status`, `created_at`, `updated_at`

### heartbeat_logs
`id`, `agent_name`, `current_task`, `north_star_alignment`, `confidence_score`, `notes`, `north_star_id`, `created_at`, `archived_at`

### todos
`id`, `title`, `category`, `assigned_agent`, `priority`, `pipeline`, `due_date`, `completed`, `status`, `track_status`, `north_star_id`, `created_at`, `run_id`, `archived_at`

### north_star
`id`, `title`, `prompt`, `expanded_by_agents`, `is_active`, `set_by`, `created_at`

### north_star_history
`id`, `north_star_id`, `content`, `changed_at`, `changed_by`, `reason`

---

## Team Standards

### Operational Standards
- **Always introspect the live schema before writing** — this is a hard operational standard
  - OpenAPI endpoint: `GET https://jcfsmpgugqqsasfrswyw.supabase.co/rest/v1/` with anon key
  - Source of truth is the live schema, not documentation or memory
- Logging is the contract
- `north_star_id` is required on all entries when a north star is active
- Anon key is the only agent credential
- Service role key → Devan (DDL/schema only) + Brett. Never in any repo. No other agents.

### Code Standards
**For all frontend, backend, and config work, see STANDARDS.md** — this is the SOP.

Key points:
- Constants defined once in `src/lib/constants.js`, never locally
- All queries use `.maybeSingle()` not `.single()`
- Config changes via `openclaw config CLI`, never direct file edits
- Agent loop scripts must reference themselves (no copy-paste from other agents)
- No hardcoded fallback UUIDs — exit gracefully if north star not found

---

## Department Values

| Agent | Department |
|---|---|
| Christopher | research |
| Devan | development |
| Vale | marketing |
| Scribe | content |
| Atlas | operations |
| Bernard | strategy |

---

## Required Run Lifecycle

### 1. Start Run
At task start, create an entry in `agent_runs`:
- agent_name
- department
- task
- status = "running"
- trigger_source = "agent" or "todo"

### 2. Perform Task
Complete the assigned work. Do not log intermediate steps or chain-of-thought.

### 3. Record Outputs (if applicable)
If the task produces a meaningful deliverable, create an entry in `artifacts`:
- Final output only (research reports, code, plans, briefs, documents)
- Never internal reasoning

### 4. Final Log
Before returning the final response, create one entry in `agent_logs`:
- agent_name
- task_description
- model_used
- status = "completed" or "failed"
- message summarizing the outcome

### 5. Finalize Run
Update the `agent_runs` record:
- status = "completed" or "failed"
- finished_at timestamp

Failed tasks must still be logged and finalized.

### 6. Return Final Response
Only after the run is finalized may the agent return its final response.

---

## Hard Gate Rule

Worker agents may NOT return their final output until:
- ✅ agent_runs record exists
- ✅ run status has been finalized
- ✅ at least one final agent_logs entry has been written

Claw enforces this gate before accepting any final response.

---

## Table Access by Mode

### Execution Mode (task-performing agents)
Write access: agent_runs, agent_logs, artifacts

### Review Mode
Agents run their own self-reviews only.

### Restricted (worker agents never write directly to)
- tool_calls
- todos
- run_reviews

---

## Lifecycle Confirmation Block

Every agent must include this block at the end of their final response:

### Execution Mode
```
LIFECYCLE_CONFIRMATION
run_started: true
run_finalized: true
final_log_written: true
artifact_written: true|false
run_status: completed|failed
mode: execution
```

### Review Mode
```
LIFECYCLE_CONFIRMATION
review_written: true
self_review_check: passed
mode: review
review_target_agent: [agent name]
```

---

## Rejection Rules (Claw Enforces)

If the LIFECYCLE_CONFIRMATION block is missing, false, or malformed:
1. Reject the output
2. Return to agent: "LIFECYCLE_CONFIRMATION block invalid. Resubmit after completing lifecycle."
3. Do not pass output to Brett
