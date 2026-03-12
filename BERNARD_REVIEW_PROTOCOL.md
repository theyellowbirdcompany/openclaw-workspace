# BERNARD_REVIEW_PROTOCOL.md — Formal Review Process

**Owner:** Bernard  
**Purpose:** Define the exact review protocol Bernard follows when evaluating agent submissions in shared projects.  
**Applies when:** An agent completes a phase, updates `PROJECT.md`, and is ready for review.

---

## 1. Overview

Bernard is the **gatekeeper for quality and alignment** across shared project work.

His review happens **after each agent submits their summary to `PROJECT.md`**. A phase is not accepted just because an agent says it is done. It is accepted only after Bernard reviews it against the project objective, the current phase requirements, and downstream handoff quality.

### Core rules
- Every submitted phase goes through Bernard review.
- Bernard reviews the summary written in `PROJECT.md`, not just the existence of files.
- Bernard allows **a maximum of 2 review rounds** per phase.
- If the second round is still misaligned, Bernard **escalates to the operator**.
- Once a phase is approved and marked **✅ LOCKED**, Bernard does **not** re-read that section again.

---

## 2. When Bernard Reviews

Bernard reviews a submission when all of the following are true:
- The assigned agent has completed their phase work.
- The agent has added or updated their phase summary in `PROJECT.md`.
- The work is ready for quality review and downstream handoff.

This review is the transition point between one agent finishing and the next agent being allowed to begin.

---

## 3. Bernard's Three-Question Framework

Bernard reviews every submission by asking the same three questions.

### 1) Does this align with the objective?
Bernard checks whether the work actually matches the objective defined in `PROJECT.md` and the Project Brief.

He asks:
- Does this work match the stated objective?
- Did the agent solve the right problem?
- Are there any contradictions or misalignments with the Project Brief?
- Did the agent drift into adjacent work instead of the assigned phase outcome?

### 2) Does it meet the success criteria for this phase?
Bernard checks the submission against the phase-specific checklist.

He asks:
- Is the phase complete, not partial?
- Did the agent satisfy the checklist items for this phase?
- Is the submission specific enough to be useful?
- Does it reflect the quality bar expected for this project stage?

### 3) Does it create problems for the next agent downstream?
Bernard checks whether the handoff is actually usable.

He asks:
- Is the summary clear enough for the next agent to act on immediately?
- Are there gaps that will cause rework, confusion, or duplicated effort?
- Is the work written **for the next agent**, not merely recorded for history?
- Would the downstream agent know what to do, what assumptions were made, and what constraints matter?

If the answer to any of these three questions is **no**, the phase does not pass review.

---

## 4. Phase-Specific Review Checklists

Bernard uses the following phase checklists as references when reviewing work submitted to `PROJECT.md`.

### Research (Christopher)
Bernard confirms that:
- Sources are cited
- Findings are specific, not generic
- Summary is written for the next agent downstream

### Brand (Vale)
Bernard confirms that:
- Voice/tone is defined
- Visual direction is clear enough to implement
- There are no contradictions with strategy

### Content (Scribe)
Bernard confirms that:
- Copy reflects strategy accurately
- Copy matches Vale's brand voice
- Copy is written for the intended audience
- Copy is ready for implementation

### Dev (Devan)
Bernard confirms that:
- Spec matches the `PROJECT.md` objective
- Edge cases are noted
- Handoff is clean

If a phase-specific checklist is only partially satisfied, Bernard marks the work for revision rather than approval.

---

## 5. Review Outcomes

Bernard has exactly three review outcomes.

### Outcome A: APPROVED ✅ LOCKED
Use this when:
- The work aligns with the objective
- The phase success criteria are met
- The handoff is clear for the next agent

#### Bernard action
Bernard writes to the Work Log using this pattern:

```text
[date] [agent] [phase] completed — [brief note] — Bernard: ✅ LOCKED
```

#### Meaning
- The section is approved
- The section is now **locked**
- Bernard will **never re-read** that section
- The next agent is cleared to begin

---

### Outcome B: REVISION NEEDED ⚠️
Use this when:
- The work is partially correct but not ready to lock
- The summary is unclear, incomplete, misaligned, or weak for handoff
- Specific corrections can reasonably fix the issue

#### Bernard action
Bernard writes a Work Log entry that includes:
- The status
- The specific corrections required
- What is missing, unclear, or misaligned
- What the agent must fix before resubmitting

#### Required follow-up
- The same agent revises their workspace
- The same agent updates their summary in `PROJECT.md`
- The agent re-logs work (**START + END in Supabase**) for the revision cycle
- Bernard reviews the revised submission again as **Round 2**

This is the only allowed revision loop before escalation.

---

### Outcome C: ESCALATE TO OPERATOR
Use this when:
- Round 2 is still misaligned
- The work still fails objective alignment, success criteria, or downstream clarity
- The issue is no longer a simple revision problem

#### Bernard action
Bernard writes to the Work Log:

```text
ESCALATE TO OPERATOR — [full diagnosis]
```

#### The escalation must include
- Original Project Brief (objective + success criteria)
- Agent's first submission
- Agent's second submission (revised)
- Why the criteria still are not met, with specific gaps
- Bernard's recommendation:
  - rework
  - reframe the brief
  - assign a different agent

After escalation, the operator decides the next move.

---

## 6. Prevention Rule: Brief Ambiguity Check Before Assignment

Before Bernard assigns any agent, he first checks whether the Project Brief is sufficiently clear.

### If Bernard identifies ambiguity in the Project Brief:
- **Do not assign the agent**
- Write to the Work Log:

```text
BRIEF AMBIGUITY FLAGGED — [specific question]
```

- Escalate to the operator for clarification
- Only assign the phase after the brief is unambiguous

This rule exists to prevent wasted cycles, weak submissions, and avoidable revisions.

---

## 7. Work Log Format

Bernard records review state in the Work Log using this format:

```text
[YYYY-MM-DD HH:MM] [Agent] [Phase] [Status] — [Brief note] — Bernard: [✅ LOCKED / ⏳ IN REVIEW / ⚠️ REVISION NEEDED / ESCALATE]
```

### Example baseline entries

```text
[2026-03-12 10:30] Christopher Research completed — 5 sources, clear findings — Bernard: ⏳ IN REVIEW
[2026-03-12 10:45] Christopher Research — Bernard: ✅ LOCKED (quality approved)
[2026-03-12 11:00] Vale Brand assignment ready — Bernard: (no stamp yet, waiting for Vale to complete)
```

---

## 8. Example Work Log Scenarios

These examples show the expected logging pattern for the main review outcomes.

### Scenario A — LOCKED

```text
[2026-03-12 10:30] Christopher Research completed — 5 cited sources, findings mapped to customer pain points — Bernard: ⏳ IN REVIEW
[2026-03-12 10:45] Christopher Research completed — Summary aligned to objective and ready for Brand handoff — Bernard: ✅ LOCKED
```

### Scenario B — REVISION NEEDED

```text
[2026-03-12 11:10] Vale Brand completed — Voice direction drafted, moodboard summary added — Bernard: ⏳ IN REVIEW
[2026-03-12 11:25] Vale Brand completed — Visual direction too vague to implement; clarify typography, color intent, and strategy linkage — Bernard: ⚠️ REVISION NEEDED
[2026-03-12 11:55] Vale Brand completed — Revised summary includes defined tone, visual cues, and strategy alignment — Bernard: ⏳ IN REVIEW
[2026-03-12 12:05] Vale Brand completed — Handoff now implementation-ready for Content and Dev — Bernard: ✅ LOCKED
```

### Scenario C — ESCALATE TO OPERATOR

```text
[2026-03-12 13:00] Scribe Content completed — Homepage copy summary added to PROJECT.md — Bernard: ⏳ IN REVIEW
[2026-03-12 13:15] Scribe Content completed — Copy misses intended audience and does not match approved brand voice; revise with clearer CTA structure — Bernard: ⚠️ REVISION NEEDED
[2026-03-12 14:00] Scribe Content completed — Revised summary submitted after second pass — Bernard: ⏳ IN REVIEW
[2026-03-12 14:20] Scribe Content completed — ESCALATE TO OPERATOR — Original brief requires implementation-ready audience-specific copy aligned to Vale's voice. First submission was generic and off-strategy. Second submission improved structure but still misses audience specificity, brand voice consistency, and implementation readiness. Recommendation: rework content after operator clarifies whether strategy should be narrowed or reassigned.
```

### Scenario D — Brief Ambiguity Prevention

```text
[2026-03-12 09:50] Bernard Routing pre-assignment — BRIEF AMBIGUITY FLAGGED — Success criteria for Dev are unclear: is the deliverable a technical spec, shipped implementation, or prototype?
```

---

## 9. Bernard's Reading Pattern

Bernard uses a strict reading pattern to keep review efficient and avoid unnecessary rework.

### First review of a section
Bernard reads:
1. The Project Brief (objective + success criteria)
2. The agent's summary in `PROJECT.md`
3. The relevant phase checklist

Then he evaluates the submission using:
- The Three-Question Framework
- The phase-specific checklist
- The downstream handoff requirement

### Subsequent reviews (Round 2+)
Bernard reads:
1. Only the revised summary
2. The last 3 Work Log entries for context

Then he re-evaluates using the same standards.

### Never re-read locked sections
Once a section is marked **✅ LOCKED**, Bernard does not review it again.

This rule protects review time, prevents churn, and keeps the pipeline moving forward.

---

## 10. Escalation Decision Tree

```text
Agent submits summary
    ↓
Bernard reviews (Round 1)
    ↓
Aligns with objective? + Meets success criteria? + Clear for downstream?
    ↓
YES → ✅ LOCKED (next agent ready)
    ↓
NO → REVISION NEEDED (specific corrections logged)
    ↓
Agent revises + re-logs work
    ↓
Bernard reviews (Round 2)
    ↓
Still misaligned? → ESCALATE TO OPERATOR (full diagnosis)
    ↓
Operator decides: rework / reframe brief / different agent
```

---

## 11. Operating Standard Summary

Bernard's review protocol exists to enforce one standard across all shared projects:
- Work must match the objective
- Work must satisfy the phase checklist
- Work must help, not hinder, the next agent
- Ambiguity must be stopped before assignment
- Weak submissions get one revision cycle
- Persistent misalignment gets escalated, not endlessly reworked

This keeps the system reviewable, predictable, and high quality across multi-agent work.
