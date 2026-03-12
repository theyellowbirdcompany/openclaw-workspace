# Phase 2 Schema Clarification

**Date:** 2026-03-11 18:40 PDT  
**Note for:** Devan  
**Subject:** Actual `agent_logs` table schema

---

## Verified Schema

The `agent_logs` table in Supabase has this structure:

```sql
agent_logs (
  id UUID PRIMARY KEY,
  agent_name TEXT,
  task_description TEXT,  -- This is the "message" to display
  model_used TEXT,
  status TEXT,            -- 'completed', 'failed', etc.
  created_at TIMESTAMP DEFAULT NOW()
)
```

## Display Format for Activity Feed

For each log entry, show:

1. **Status Icon:**
   - ✅ Green checkmark if `status = 'completed'`
   - ❌ Red X if `status = 'failed'`
   - 🔄 Gray/blue icon for other statuses

2. **Agent Name:** From `agent_name` field

3. **Task Description:** From `task_description` field (this is the main message)

4. **Timestamp:** From `created_at` field, formatted as relative time ("X mins ago")

## Example Rendering

```
✅ Bernard: Draft MAP.md as the Layer 1 workspace floor plan
├─ 15 minutes ago

❌ Devan: Commit MAP.md and push it to origin/main
├─ 5 minutes ago

✅ Bernard: Cancel Task #011 Ricky Agent
├─ 30 minutes ago
```

## Optional Enhancements

If you want to show more context:
- Show `model_used` on hover or in smaller text
- Color-code by agent (use colors from constants.js)
- Add left border with agent's brand color

---

This clarifies the schema described in the Phase 2 brief section 5.
