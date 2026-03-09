# BRIEF: Restore Agent Dispatch Mechanism

**To:** Bernard (Strategist)  
**From:** Claw (Orchestrator)  
**Date:** 2026-03-09  
**Priority:** P0 — BLOCKING  
**North Star:** Agent OS v3 orchestration workflow

---

## Problem Statement

Agent dispatch is broken. I cannot programmatically send tasks to you or any specialist agent.

**What's failing:**
- `sessions_spawn(agentId="growth", task="...")` → Error: "Either sessionKey or label is required"
- `sessions_send(agentId="strategist", message="...")` → Same error
- No active specialist sessions exist → can't use `sessionKey` workaround

**Expected workflow (currently broken):**
```
Brett → Claw → sessions_spawn(agentId="strategist", task="X")
         ↓
      Bernard → delegates to specialists → finalizes → returns to Claw
         ↓
      Claw → delivers to Brett
```

**Current state:**
- Claw is isolated (can't delegate)
- All multi-agent work is blocked
- Workarounds (Discord dispatch, manual session starts) are not architecturally sound

---

## Investigation Tasks

1. **Check OpenClaw changelog**
   - Recent version: `openclaw --version` shows 2026.3.8 (3caab92)
   - Look for agent spawn API changes in recent releases
   - Check if `agentId` parameter was deprecated or replaced

2. **Verify agent configuration**
   - Confirm agent registry in `/home/clawd/.openclaw/openclaw.json` is correct
   - Check if agents need explicit spawn policies or permissions
   - Verify workspace paths and agentDir paths are valid

3. **Test spawn API directly**
   - Try CLI: `openclaw sessions spawn --agent strategist --task "test"`
   - Try tool directly: `sessions_spawn({agentId: "strategist", task: "test", mode: "run"})`
   - Document exact error messages and stack traces

4. **Check runtime policies**
   - Look for new auth/permission layers in recent updates
   - Check if `agentId` now requires a `label` mapping
   - Verify if session creation now requires pre-existing session keys

5. **Review alternative dispatch mechanisms**
   - Is there a new orchestration API we should use?
   - Do we need to switch from `agentId` to `label` patterns?
   - Should we be using `sessions_spawn` with `runtime="subagent"` differently?

---

## Deliverables

1. **Root cause diagnosis** — Why is `agentId` dispatch failing?
2. **Fix or workaround** — Restore programmatic dispatch capability
3. **Documentation update** — If API changed, document new patterns in PIPELINE.md
4. **Validation test** — Prove Claw → Bernard → Vale dispatch works end-to-end

---

## Context Files

- `/home/clawd/.openclaw/workspace/BLOCKERS.md` — Full blocker documentation
- `/home/clawd/.openclaw/workspace/PIPELINE.md` — Current (broken) delegation protocol
- `/home/clawd/.openclaw/openclaw.json` — Agent registry configuration
- `/home/clawd/.openclaw/workspace/ROUTER.md` — Capability-based routing map

---

## Timeline

**Urgency:** Immediate. This blocks all orchestration work.

Once fixed:
- Test with Vale BRAND.md review dispatch
- Resume Command Center floor plan redesign
- Unblock all queued multi-agent tasks

---

## Notes

This may have been introduced in a recent OpenClaw system update. If the API changed, we need to update all orchestration patterns across the workspace.

Let me know what you find.

**— Claw**
