# LOGGING_SPEC.md - The Canonical Logging Specification

**Version: 1.0**
**Date: 2026-03-11**
**Status: ACTIVE**

---

## 1. Executive Summary

This document is the **single source of truth** for all agent logging requirements. Its purpose is to eliminate ambiguity and provide one clear, operative contract for how and when agents log their work.

Logging is non-negotiable. It provides critical visibility into agent activity, performance, and costs. Adhering to this specification ensures that the entire system remains transparent and debuggable.

This specification supersedes **all** previous logging instructions found in `AGENTS.md`, `SOUL.md`, or any other document. If it's not in this spec, it's not a current requirement.

---

## 2. The Current Operative Contract (MANDATORY)

All agents **must** execute the following `curl` command to the `agent_logs` table **before** sending their final reply for any given task. This is the only logging action required at this time.

### The Command

```bash
curl -s -X POST "https://vzpexiztpmojgyswtkze.supabase.co/rest/v1/agent_logs" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cGV4aXp0cG1vamd5c3d0a3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxODQ1MjQsImV4cCI6MjA4ODc2MDUyNH0.upBYzZheIkZSULw08H45LqsoxPQNEPuJs7qDk1mN_HQ" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cGV4aXp0cG1vamd5c3d0a3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxODQ1MjQsImV4cCI6MjA4ODc2MDUyNH0.upBYzZheIkZSULw08H45LqsoxPQNEPuJs7qDk1mN_HQ" \
  -H "Content-Type: application/json" \
  -d '{
        "agent_name": "[Your Agent Name]",
        "task_description": "[A brief, one-sentence summary of the task]",
        "model_used": "[The model you are currently using]",
        "status": "[completed OR failed]"
      }'
```

### Required Fields

*   `agent_name`: The name of the agent executing the task (e.g., "Scribe", "Christopher").
*   `task_description`: A concise, one-sentence summary of the task's objective.
*   `model_used`: The identifier of the model used to complete the task (e.g., "claude-3-opus-20240229").
*   `status`: Must be either `completed` or `failed`.

---

## 3. Legacy & Aspirational Logging (DECOMMISSIONED)

The following logging tables and concepts were part of a broader, earlier vision for logging. They are **not currently operative**. Do not attempt to write to these tables. They are preserved here for historical context.

*   `agent_runs` - **SUPERSEDED.** This was intended to track the full lifecycle of an agent task. The simplified `agent_logs` contract replaces it for now.
*   `agent_costs` - **PLANNED FOR FUTURE.** Cost tracking is critical, but the mechanism is being redesigned. Do not log costs until a new specification is released.
*   `agent_status` - **PLANNED FOR FUTURE.** A mechanism for heartbeats and live status is planned, but this table is not currently in use.
*   `heartbeat_logs` - **SUPERSEDED.** Heartbeat functionality is being re-evaluated. Do not perform heartbeat logging.
*   `north_star_history` - **DEPRECATED.** This concept is no longer in use.
*   `todos` - **DEPRECATED.** This concept is no longer in use.

---

## 4. Concrete Examples

Use these exact formats for your logging payloads.

### Example 1: Task Success

Devan successfully builds a new React component.

```bash
# ... curl command ...
  -d '{
        "agent_name": "Devan",
        "task_description": "Build the new UserProfile React component",
        "model_used": "claude-3-opus-20240229",
        "status": "completed"
      }'
```

### Example 2: Task Failure

Christopher fails to fetch data from a flaky API.

```bash
# ... curl command ...
  -d '{
        "agent_name": "Christopher",
        "task_description": "Fetch competitive data from the MarketStats API",
        "model_used": "claude-3-sonnet-20240229",
        "status": "failed"
      }'
```

### Example 3: Heartbeat Logging (DEPRECATED)

*This is for historical context only. Do not implement.*
A periodic check-in would have been logged like this.

```bash
# ... curl command ...
  -d '{
        "agent_name": "Bernard",
        "task_description": "Periodic system health check (heartbeat)",
        "model_used": "claude-3-haiku-20240307",
        "status": "completed"
      }'
```

### Example 4: Review Task

Vale completes a brand guidelines review.

```bash
# ... curl command ...
  -d '{
        "agent_name": "Vale",
        "task_description": "Review new marketing copy for brand guideline compliance",
        "model_used": "claude-3-opus-20240229",
        "status": "completed"
      }'
```

### task_output (Optional but Recommended)

Brief summary of what you actually performed or produced.

**Examples:**
- "Scaled avatars to 96px, deployed to production"
- "Reviewed 5 PRs, approved 3, requested changes on 2"
- "Generated 10 test cases for user auth flow"
- "Electric blue"

Keep to ~500 characters.

If your output is large (code, full reports, etc.), store in `artifacts` table instead and reference it here.

---

## 5. The Rules (Non-Negotiable)

1.  **Log Before Reply:** Logging **MUST** happen before your agent sends its final output for the task. No exceptions.
2.  **Log Failures:** If the logging command itself fails, the task outcome is still considered `failed` and must be reported as such. Do not skip logging because of a transient network error.
3.  **Single Table Only:** Agents **MUST NOT** attempt to log to any table other than `agent_logs`. Multi-table logging is error-prone and has been decommissioned.
4.  **This Spec is Authoritative:** This specification overrides any and all contradictory instructions in `AGENTS.md`, `SOUL.md`, or any other document.

---

## 6. Decommissioning Notice

To ensure clarity, the following documents or sections are no longer considered operative regarding logging requirements:

*   **`AGENTS.md`**: The sections titled "LOGGING HARD GATE" and "MANDATORY: Lifecycle Gate Enforcement" are superseded. The simplified `curl` command section is now formalized here.
*   **`SOUL.md`**: The section titled "LOGGING HARD GATE" is superseded.
*   **`LOGGING.md`**: If this file exists, it is superseded by this specification.

**All agents must refer only to `LOGGING_SPEC.md` for logging instructions.**
