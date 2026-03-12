# DELEGATION_SPEC.md — Canonical Routing Contract

**Status:** Canonical routing source of truth  
**Effective:** 2026-03-11  
**Owner:** Bernard (strategic coordination) + Claw (orchestration boundary)  
**Supersedes:** Routing guidance scattered across `SOUL.md`, `AGENTS.md`, and `PIPELINE.md`

---

## 1. Purpose

This document defines who decides, who delegates, and who executes work inside Agent OS.

**Goal:** one routing contract, no duplicate authority rules, no ambiguity about whether Claw or Bernard owns a decision.

---

## 2. Authority Boundary

### Claw owns
- User interface and final delivery
- Intake and first-pass routing
- Simple direct answers that do not require specialist execution
- Sending work to Bernard for planning when a task is multi-step, multi-agent, or requires review
- Synthesis of approved outputs back to Brett

### Bernard owns
- Planning and task decomposition
- Multi-agent sequencing
- Specialist assignment once work requires coordination
- Quality review before work is treated as done
- Rejection / resubmission decisions on worker outputs
- Coordination across phases, dependencies, and standards gates

### Specialists own
- Execution inside their domain
- Producing the requested artifact or analysis
- Following standards, lifecycle, and logging gates
- Returning work in a reviewable form

### Hard rule
**Claw does not do Bernard’s planning job. Bernard does not impersonate Claw’s user-facing role.**

---

## 3. Canonical Routing Modes

### Thin Routing Mandate
Claw is a **thin router** for all non-trivial tasks. When a task requires any specialist or multi-step work, Claw delegates to Bernard (or a direct specialist for Mode B) **near-instantly** — no deliberation, no task decomposition, no restating the request at length. Claw's latency on routing should be < 5 seconds.

### Mode A — Direct Answer
**Path:** Claw → Brett
Use when:
- The answer is straightforward
- No files need changing
- No specialist tool or deep review is required

### Mode B — Direct Specialist Execution
**Path:** Claw → Specialist → Claw  
Use when:
- One specialist domain clearly owns the work
- No multi-agent breakdown is needed
- The output can be reviewed directly without project orchestration

Examples:
- Research question → Christopher
- Writing task → Scribe
- Infrastructure/file organization → Atlas
- UI/code change → Devan
- Brand/distribution review → Vale

### Mode C — Planned Multi-Agent Execution
**Path:** Claw → Bernard → Specialists → Bernard review → Claw → Brett  
Use when:
- More than one agent is needed
- The task has phases, dependencies, or quality gates
- The output needs a coordinator and reviewer
- The task changes process, architecture, or operating rules

### Mode D — Research then Execute
**Path:** Claw → Christopher → Target specialist (or Bernard for plan) → reviewer → Claw  
Use when:
- External context must be gathered before implementation
- Discovery materially affects execution choices

### Mode E — Ops / System Debugging
**Path:** Claw → Atlas (optional Bernard review) → Claw  
Use when:
- The problem is infrastructure, file organization, config, agent runtime, or system operations
- The work is not product feature development

---

## 3.5 Technical Routing (sessions_spawn)

Every delegation uses `sessions_spawn` with the `agentId` parameter. The `agentId` maps to the agent's config ID, NOT their name.

| Route | agentId value |
|-------|---------------|
| Claw → Bernard | `agentId: "strategist"` |
| Claw → Christopher | `agentId: "researcher"` |
| Claw → Devan | `agentId: "builder"` |
| Bernard → Devan | `agentId: "builder"` |
| Bernard → Christopher | `agentId: "researcher"` |
| Bernard → Atlas | `agentId: "ops"` |
| Anyone → Scribe | `agentId: "communicator"` |
| Anyone → Vale | `agentId: "growth"` |

**WARNING:** Omitting `agentId` creates a subagent of the CALLING agent, not the target. The `label` parameter is for identification only — it does NOT affect routing.

---

## 4. Routing Decision Matrix

| Task type | Primary owner | Secondary / reviewer | Default route |
|---|---|---|---|
| Simple answer / clarification | Claw | — | Claw answers directly |
| Strategy, planning, sequencing | Bernard | Claw delivers | Claw → Bernard |
| Research / external intel | Christopher | Bernard if project-critical | Claw → Christopher |
| Writing / messaging / docs polish | Scribe | Bernard if part of larger initiative | Claw → Scribe |
| Code / build / implementation | Devan | Bernard or Vale depending on output | Claw → Devan |
| Brand / QA / growth / messaging fit | Vale | Bernard | Claw → Vale |
| Ops / file organization / config / infra | Atlas | Bernard if multi-phase | Claw → Atlas |
| Cross-functional initiative | Bernard | Claw delivers | Claw → Bernard → team |
| Governance / pipeline / process contracts | Bernard | Claw boundary input | Claw → Bernard (+ relevant partner) |

---

## 5. Escalation Rules

Escalate to Bernard when any of the following are true:
- The task requires more than one specialist
- The task needs phased execution
- The task changes operating process or shared standards
- The task has dependencies or blockers to coordinate
- A deliverable must be reviewed before publication
- There is ambiguity about who owns the work

Escalate to Claw when any of the following are true:
- A reviewed deliverable is ready for user-facing synthesis
- A blocker requires user clarification or approval
- A final answer needs to be framed for Brett

Escalate to Atlas when any of the following are true:
- The issue is config, infra, file structure, cron, auth, or agent runtime
- The task is system maintenance rather than project feature work

Escalate to Christopher before build when:
- The team lacks external facts needed to make a good decision
- Market, competitive, or reference research changes the likely implementation path

---

## 6. Brief Template (Required)

Every delegated task should use this structure.

```markdown
## TASK BRIEF
**Task ID:** [ID]
**Owner:** [agent]
**Requested by:** Brett via Claw
**Mode:** direct execution | research → execute | multi-agent phase | review
**Objective:** One-sentence goal

**Context:**
- Relevant project background
- Why this matters now
- Dependencies or blockers

**Deliverables:**
1. [artifact]
2. [artifact]
3. [location/path if applicable]

**Success Criteria:**
- [measurable outcome]
- [quality requirement]
- [proof / validation requirement]

**References:**
- [doc/path]
- [doc/path]

**STANDARDS GATE:**
Before writing code, config, scripts, or final docs:
1. Read `STANDARDS.md` if the task touches implementation
2. Follow the canonical logging / lifecycle rules currently in force
3. If visual work: provide proof before claiming done
4. If config work: check config first before building workarounds
5. If routing/process work: reconcile contradictions explicitly, do not preserve ambiguity

**Return Format:**
- Summary of work completed
- Files created/updated
- Risks / open questions
- Required logging per `/home/clawd/.openclaw/workspace/AGENTS.md (Logging Gate section)`
```

---

## 7. Acceptance Gate

A task is not done when a specialist says it is done.
A task is done when:
1. The assigned execution is complete
2. Required logging/lifecycle conditions have been met
3. Bernard has reviewed it if the task is part of a coordinated initiative
4. Claw has synthesized or delivered it if user-facing
5. The bulletin board status has been updated to the correct state

---

## 8. Superseded Guidance

The following guidance is now **subordinate** to this document whenever wording conflicts:
- `SOUL.md` routing paragraphs
- `AGENTS.md` generic task routing notes
- `PIPELINE.md` high-level pipeline list

Those documents may still summarize the system, but this file is the canonical routing contract.

---

## 8.5 Bernard Review Reference

For Bernard's formal review procedure, see:
- `BERNARD_REVIEW_PROTOCOL.md` — review framework, phase checklists, revision limits, escalation path, and work log examples

## 9. Operating Notes

The Pipeline Consolidation Initiative (Phases A-E) is complete. This routing contract is now the steady-state authority for all task delegation. No special-case routing rules are in effect.
