# TASK BRIEF TEMPLATE

**Task ID:** [TASK-ID]  
**Task Title:** [Clear task title]  
**Owner / Assigned Agent(s):** [Agent name(s)]  
**Requested by:** Brett via Claw  
**Mode:** [direct execution | research → execute | multi-agent phase | review]  
**Board State:** 🟡 ASSIGNED  
**ETA:** [Time estimate or due date]

## Objective
[One-sentence goal.]

## Context
- [Relevant project background]
- [Why this matters now]
- [Dependencies, assumptions, or blockers]

## Deliverables
1. [Artifact / output #1]
2. [Artifact / output #2]
3. [Artifact / output #3]
4. [File path / destination if applicable]

## Acceptance Criteria
- [Measurable outcome]
- [Quality bar]
- [Validation or proof required]
- [What Bernard/reviewer must be able to confirm]

## References
- `EXECUTION_PIPELINE.md`
- `DELEGATION_SPEC.md`
- [Additional doc/path]
- [Additional doc/path]

## Standards Gate
Before writing code, config, scripts, or final docs:
1. Read `STANDARDS.md` if the task touches implementation.
2. Follow the canonical lifecycle in `EXECUTION_PIPELINE.md`.
3. Follow the routing and return contract in `DELEGATION_SPEC.md`.
4. Complete required logging per `/home/clawd/.openclaw/workspace/AGENTS.md (Logging Gate section)` before final submission.
5. If visual work: provide proof before claiming done.
6. If config work: check config first before building workarounds.
7. If process/routing work: reconcile contradictions explicitly.

## Return Format
- Summary of work completed
- Files created/updated
- Risks / open questions
- Validation evidence
- Logging confirmation (curl executed + status)

## Notes for Reviewer
- Intended review owner: [Bernard / designated reviewer]
- Expected next state after submission: 🔵 REVIEW
