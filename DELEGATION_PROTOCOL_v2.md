# Delegation Protocol v2 — How Agents Actually Work

**Status:** ACTIVE  
**Date:** 2026-03-09  
**Replaces:** Original assumption of nested spawning

---

## The Reality

**Subagents cannot spawn other subagents.**

### What Subagents CAN Do
- ✅ Use `subagents` tool (list/steer/kill)
- ✅ Manage agents spawned *under* them
- ✅ Send messages to their sub-agents via `steer`

### What Subagents CANNOT Do
- ❌ Use `sessions_spawn`
- ❌ Use `sessions_send`
- ❌ Use `agents_list`
- ❌ Create new sub-agents

---

## Correct Workflow

### Example: Command Center Build

**WRONG (our initial assumption):**
```
Brett → Claw → Bernard → Bernard spawns Devan
                       → Bernard spawns Vale
```
❌ This fails because Bernard can't spawn.

**RIGHT (actual architecture):**
```
Brett gives task to Claw
  ↓
Claw spawns Bernard (planning/coordination)
  ↓
Claw spawns Devan (execution, labeled as Bernard's sub-agent)
  ↓  
Claw spawns Vale (polish, labeled as Bernard's sub-agent)
  ↓
Bernard uses subagents(action='steer') to coordinate them
  ↓
Devan & Vale work, report to Bernard
  ↓
Bernard synthesizes results
  ↓
Claw delivers to Brett
```

---

## Claw's Role

**Claw is the spawn authority.**

For multi-agent tasks:
1. **Receive task from Brett**
2. **Identify required agents** (planner + executors)
3. **Spawn all agents upfront**
   - Bernard as coordinator
   - Devan as builder
   - Vale as growth/polish
   - etc.
4. **Label sub-agents appropriately** (so Bernard can find them)
5. **Wait for coordination to complete**
6. **Synthesize and deliver**

---

## Bernard's Role

**Bernard is the coordinator, not spawner.**

When spawned:
1. **Assess the task**
2. **Plan the approach**
3. **Use `subagents(action='list')` to see who's available**
4. **Use `subagents(action='steer')` to direct work:**
   ```javascript
   subagents({
     action: 'steer',
     target: 'Devan',
     message: 'Build the holographic overlay with these specs...'
   })
   ```
5. **Track progress via `subagents(action='list')`**
6. **Synthesize results when all sub-agents complete**
7. **Report back to Claw**

---

## Specialist Agents (Devan, Vale, etc.)

**Pure executors.**

They:
- Receive tasks from Bernard (via steer)
- Execute with Claude Code when possible
- Report results
- Cannot spawn other agents
- Cannot coordinate laterally (unless explicitly given tool access)

---

## Updated Agent OS v3 Architecture

```
Brett (user)
  ↓
Claw (orchestrator) ← YOU ARE HERE
  ├─ spawns all agents needed for task
  ├─ Bernard (strategist/coordinator)
  │   ├─ steers Devan
  │   ├─ steers Vale
  │   └─ synthesizes results
  ├─ Devan (builder) ← receives instructions via steer
  ├─ Vale (growth) ← receives instructions via steer
  ├─ Christopher (researcher)
  ├─ Scribe (communicator)
  └─ Atlas (operations)
```

---

## Example: Correct Multi-Agent Dispatch

### Task: Build holographic overlay

**Step 1: Claw spawns Bernard**
```javascript
sessions_spawn({
  agentId: 'strategist',
  task: 'Plan and coordinate holographic overlay build',
  mode: 'run'
})
```

**Step 2: Claw spawns Devan (labeled for Bernard)**
```javascript
sessions_spawn({
  agentId: 'builder',
  task: 'Stand by for instructions from Bernard on holographic overlay',
  label: 'holographic-builder',
  mode: 'session' // persistent so Bernard can steer
})
```

**Step 3: Claw spawns Vale (labeled for Bernard)**
```javascript
sessions_spawn({
  agentId: 'growth',
  task: 'Stand by for polish instructions from Bernard',
  label: 'holographic-polish',
  mode: 'session'
})
```

**Step 4: Bernard coordinates**
```javascript
// Bernard uses:
subagents({ action: 'list' })
// Sees: Devan (holographic-builder), Vale (holographic-polish)

subagents({
  action: 'steer',
  target: 'holographic-builder',
  message: 'Build Phase 1: React Three Fiber canvas...'
})

// Later:
subagents({
  action: 'steer',
  target: 'holographic-polish',
  message: 'Review Devan\'s work and add final touches...'
})
```

---

## Key Insights

1. **Claw is the spawner** - Only Claw (main agent) can spawn
2. **Bernard is the coordinator** - Uses `subagents` to steer/manage
3. **Specialists are executors** - Pure task completion
4. **Labels matter** - Use descriptive labels so Bernard can find his sub-agents
5. **Mode matters** - Use `mode='session'` for persistent sub-agents that need steering

---

## Why This Matters

**Our original assumption:**
- Bernard → spawns → Devan (nested spawning)

**Reality:**
- Claw → spawns → Bernard
- Claw → spawns → Devan
- Bernard → steers → Devan

**This isn't a bug, it's the architecture.**

It prevents:
- Recursive spawning explosions
- Permission escalation
- Uncontrolled agent proliferation

---

## Action Items

1. ✅ Document correct protocol (this file)
2. ⏸️ Update PIPELINE.md to reflect reality
3. ⏸️ Update BUG_REPORT_001 (not a bug, it's by design)
4. ⏸️ Test correct workflow on next multi-agent task

---

## Status

**ACTIVE** - This is the correct protocol going forward.

All future multi-agent tasks should follow this pattern.
