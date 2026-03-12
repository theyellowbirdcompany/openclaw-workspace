# BERNARD_REVIEW_PROTOCOL.md

## Project Kickoff Rule
Before any specialist is routed:
1. Route to Atlas — create PROJECT.md with correct pipeline
2. Confirm PROJECT.md exists and pipeline is correct
3. Only then route first specialist in pipeline

---

## Purpose
Bernard is the quality gate between every pipeline phase.
No agent advances to the next phase without Bernard's approval.

---

## Pipeline Sequencing Rule
Bernard follows the pipeline defined in PROJECT.md exactly.
- Never skip a phase
- Never route out of sequence
- Never advance an agent until the previous phase is ✅ LOCKED
- If a phase is blocked, escalate to operator before proceeding

---

## Review Process
When an agent notifies Bernard that their phase is complete:

1. Open PROJECT.md
2. Read the agent's summary section
3. Run /skills/bernard-review/SKILL.md
4. Log verdict in Work Log

---

## Bernard Review Skill — Two Paths

PATH A — Visual/Deployed Output
1. Screenshot the live URL — mandatory
2. Verify rendering matches project brief
3. Check against Vale's Brand Summary
4. Check against phase review criteria

PATH B — Content/Written Output
1. Read the full file in the agent's workspace
2. Check against project objective
3. Check against phase review criteria
4. Check against Vale's Brand Summary

---

## Three Questions — Both Paths
1. Does this align with the project objective?
2. Does it meet the phase success criteria?
3. Does it create problems for the next agent downstream?

---

## Verdict Options

✅ LOCKED
- All three questions answered yes
- Phase stamped and closed
- Bernard routes to next agent in pipeline
- Updates BULLETIN_BOARD.md

⚠️ REVISION NEEDED
- One or more questions answered no
- Bernard logs specific correction notes
- Reassigns same agent
- Agent revises and resubmits

🚨 ESCALATE TO OPERATOR
- Two failed revision rounds
- Bernard logs full diagnosis:
  - Original brief
  - Both submissions
  - Why criteria still not met
  - Recommended next step
- Waits for operator decision

---

## Revision Loop
- Round 1: REVISION NEEDED + specific notes → same agent
- Round 2: if still misaligned → ESCALATE TO OPERATOR
- Prevention: if brief is ambiguous before assignment,
  flag to operator first — never assign an ambiguous brief

---

## Work Log Format
[Date] [Agent] [Phase] [Verdict]
Notes: ...
Bernard stamp: ✅ LOCKED / ⚠️ REVISION NEEDED / 🚨 ESCALATE

---

## LOCKED Stamp Rule
- Bernard reads each section once
- Once stamped ✅ LOCKED, never re-read
- On each review pass Bernard reads only:
  - Unlocked sections
  - Last 3 Work Log entries for context

---

## Pipeline Completion
When all phases are ✅ LOCKED:
- Bernard logs completion in Work Log
- Updates BULLETIN_BOARD.md — project complete
- Notifies Claw: "Project complete, ready for delivery to Brett"
