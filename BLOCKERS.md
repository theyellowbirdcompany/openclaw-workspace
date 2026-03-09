# BLOCKERS.md — Agent OS v3

## Active Blockers

### 🚨 CRITICAL: Agent Dispatch Mechanism Broken (2026-03-09)

**Status:** BLOCKING all orchestration workflows

**Root Cause Found:** OpenClaw v2026.3.8 runtime has hardcoded empty subagent allowlist

**Problem:**
Claw cannot programmatically dispatch tasks to specialist agents (Vale, Devan, Christopher, etc.).

**What's broken:**
1. `sessions_spawn(agentId="growth", task="...")` → Runtime error: "agentId is not allowed (allowed: none)"
2. Runtime allowlist shows ZERO agents allowed (only `main` in agents_list)
3. Config-level settings don't control this — it's hardcoded in the binary/runtime
4. No active sessions exist for specialists → can't use `sessionKey` workaround

**Expected behavior:**
```javascript
// Should work:
sessions_spawn({
  agentId: "growth",  // or "builder", "researcher", etc.
  task: "Review BRAND.md and refine it",
  mode: "run"
})
```

**Investigation done:**
- ✅ Verified agent registry is correct in openclaw.json (7 agents configured)
- ✅ Tried adding `acp.allowedAgents` config — ignored by runtime
- ✅ Tried `agents.defaults.subagents.allowedAgents` — invalid schema
- ✅ Checked `agents_list` — returns `(allowed: none)` hardcoded at runtime
- ❌ Allowlist is NOT in openclaw.json, not in separate config files, not in environment

**Impact:**
- Claw cannot delegate to Bernard
- Bernard cannot delegate to specialists
- All multi-agent workflows blocked
- Single-agent (Claw-only) workflows still work

**Likely cause:**
OpenClaw v2026.3.8 changed subagent policy to default-deny (security feature?) but didn't provide UI/config to set allowlist.

**Required fix (system-level):**
This requires direct intervention:
1. Check OpenClaw v2026.3.8 release notes for subagent allowlist changes
2. Find where the runtime policy is configured (may require direct system access)
3. Either: enable subagent dispatch globally, OR add allowlist configuration that this runtime respects
4. Possible: rollback to v2026.3.7 (known working) if fix isn't available

**Current workaround:**
- Manual specialist dispatch via Discord channels (#vale-growth-specialist, etc.)
- Not automated, defeats Agent OS v3 architecture

**Assigned to:** System Administrator (requires system-level access)  
**Priority:** P0 (blocks all orchestration)  
**Created:** 2026-03-09 13:38 PDT  
**Updated:** 2026-03-09 13:50 PDT  
**Reporter:** Claw

---

### Temporary Mitigation

Until fixed, Claw will:
1. Handle all tasks directly (no delegation)
2. Document tasks that require specialist expertise
3. Queue them for manual dispatch when mechanism is restored

This defeats the purpose of Agent OS v3 architecture, but keeps system operational.

---

## Resolved Blockers

(None yet)
