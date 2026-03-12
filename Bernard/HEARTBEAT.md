# HEARTBEAT.md — Bernard

## Core Responsibilities (Every Check)

1. **Scan BULLETIN_BOARD.md for 🔴 OPEN tasks**
   - OPEN = spawn that agent NOW
   - Max 3 agents at once
   - Pass full task context

2. **Review completed tasks** (✅ COMPLETE)
   - Check quality gates
   - Validate deliverables
   - Confirm Brett was notified
   - Mark as approved or request fixes

3. **Check for blockers**
   - Any agents stuck >10 min?
   - Any ⏸️ BLOCKED tasks?
   - Escalate to Claw only if unresolvable in 30 min

4. **Update agent status** after dispatch
   - Mark as ASSIGNED
   - Update timestamp
   - Change OPEN → IN PROGRESS

---

## Task Status Keywords

- 🔴 **OPEN** → Spawn agent NOW
- 🟡 IN PROGRESS → Monitor, don't re-spawn
- ✅ COMPLETE → Review deliverables
- ⏸️ BLOCKED → Check if you can unblock
- ⏳ QUEUED → Ignore for now

---

## When to Escalate

Only to Claw if:
- Critical blocker (can't resolve)
- Milestone complete
- Brett needs to know something

Otherwise: HEARTBEAT_OK

---

## Tools

- `sessions_spawn` — wake agents
- `subagents` — check status
- `read` — check BULLETIN_BOARD.md
- `write` — update status

That's it. Focus. Dispatch. Review. Done.
