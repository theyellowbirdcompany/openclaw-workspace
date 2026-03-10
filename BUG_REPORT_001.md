# BUG REPORT #001: Subagent Cannot Spawn Other Subagents

**Date:** 2026-03-09  
**Severity:** P0 - BLOCKING  
**Reporter:** Claw  
**Affected:** Agent OS v3 orchestration workflow

---

## Summary

Bernard (strategist subagent) cannot spawn Devan (builder subagent), despite:
- ✅ `builder` in Bernard's `allowAgents` config
- ✅ `builder` agent properly configured
- ✅ `agents_list` tool shows all agents available
- ✅ Gateway restarted with clean config

**Error behavior:** Bernard reports "subagent was not recognized" when attempting delegation.

---

## Expected Behavior

```
Brett → Claw → sessions_spawn(agentId="strategist")
              ↓
           Bernard → sessions_spawn(agentId="builder")
                    ↓
                 Devan → executes task
                    ↓
           Bernard ← results
              ↓
Claw ← finalized output
  ↓
Brett
```

---

## Actual Behavior

```
Brett → Claw → sessions_spawn(agentId="strategist")
              ↓
           Bernard → sessions_spawn(agentId="builder")
                    ↓
                    ❌ ERROR: "subagent was not recognized"
                    ↓
           Bernard → simulates work instead (workaround)
              ↓
Claw ← fake output (no actual work done)
```

---

## Investigation

### Config Check
```bash
$ openclaw config get agents.list.1.subagents.allowAgents
[
  "researcher",
  "builder",
  "growth",
  "communicator",
  "ops"
]
```
✅ Config is correct

### Agent List Check
```bash
$ agents_list
{
  "requester": "main",
  "agents": [
    { "id": "builder", "name": "Devan", "configured": true },
    ...
  ]
}
```
✅ All agents are recognized

### Permission Hypothesis
**Theory:** Subagents (Bernard) don't have access to `sessions_spawn` or `subagents` tools when running as subagents themselves.

**Evidence:**
- Claw (main agent) CAN spawn Bernard ✅
- Bernard (subagent) CANNOT spawn Devan ❌
- Bernard tried multiple delegation methods, all failed

---

## Root Cause (Hypothesis)

**OpenClaw runtime restricts tool availability for subagents.**

When Bernard runs as a subagent:
- He may not have `sessions_spawn` tool
- Or `sessions_spawn` from a subagent context is blocked
- Or `allowAgents` only works for main agent → subagent, not subagent → subagent

**This is likely a security/permission feature**, not a bug per se, but it breaks our Agent OS v3 architecture.

---

## Impact

- **P0 BLOCKING:** Multi-level delegation impossible
- Agent OS v3 workflow broken (Brett → Claw → Bernard → specialists)
- Bernard cannot coordinate team
- Workaround: Claw must spawn all agents directly (defeats orchestration)

---

## Reproduction Steps

1. Spawn Bernard: `sessions_spawn(agentId="strategist", task="...")`
2. In Bernard's task, attempt: `sessions_spawn(agentId="builder", task="...")`
3. Observe: Bernard reports delegation failure

---

## Proposed Solutions

### Option A: Enable Nested Subagent Spawning
- Modify OpenClaw runtime to allow subagents to spawn subagents
- Requires: OpenClaw core change or config flag
- Risk: Security implications (recursive spawning)

### Option B: Flat Orchestration (Current Workaround)
- Claw spawns all agents directly
- Bernard becomes a "planning" agent, not orchestrator
- Claw handles all delegation
- Limitation: Loses hierarchical coordination benefits

### Option C: Tool Permissions Override
- Add explicit tool permissions to Bernard's agent config
- Allow `sessions_spawn` for strategist role
- Requires: OpenClaw permission system support

---

## Next Steps

1. **Verify tool availability in Bernard's context**
   - Can Bernard see `sessions_spawn` tool?
   - Can Bernard see `subagents` tool?

2. **Check OpenClaw documentation**
   - Is nested subagent spawning supported?
   - Are there permission flags we missed?

3. **Test alternative delegation methods**
   - Try `sessions_send` with existing session keys
   - Try spawning via different runtime parameters

4. **Report to OpenClaw team if confirmed bug**
   - This may be intended behavior
   - Or a regression from recent updates

---

## Temporary Mitigation

**For now:** Claw spawns all specialist agents directly.

**Modified workflow:**
```
Brett → Claw → spawns Bernard (planning)
            → spawns Devan (execution)
            → spawns Vale (polish)
            → coordinates results
            → delivers to Brett
```

Bernard becomes a planner, not an orchestrator.

---

## Related Issues

- Original issue at session start (2026-03-09 early): Agent dispatch was broken, fixed by adding `allowAgents` config
- That fix enabled Claw → Bernard spawning
- But did NOT enable Bernard → Devan spawning

---

## Status

**OPEN** - Awaiting systematic investigation

**Priority:** P0 - Blocking multi-agent workflows

**Owner:** Claw + Brett
