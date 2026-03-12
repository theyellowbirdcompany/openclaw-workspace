# EXECUTION_PIPELINE.md — Canonical Execution State Machine

**Status:** Canonical execution lifecycle source of truth  
**Effective:** 2026-03-11  
**Owner:** Bernard + Atlas  
**Supersedes:** fragmented lifecycle guidance spread across `PIPELINE.md`, bulletin board conventions, and ad hoc review notes

---

## 1. Purpose

This document defines the single task lifecycle used for coordinated work in Agent OS.

**Canonical state model:**
`OPEN → ASSIGNED → IN PROGRESS → REVIEW → APPROVED / REJECTED → ARCHIVED`

This state machine consolidates:
- delegation flow
- execution flow
- review flow
- quality gates
- archive closure

---

## 2. State Definitions

### 1) OPEN
**Meaning:** Work is ready to start now.  
**Owner:** Bernard or Claw may create OPEN work; Bernard owns OPEN state for coordinated projects.  
**Entry criteria:**
- objective is defined
- owner is known
- references are attached
- success criteria are explicit
- no unresolved prerequisite blocks start

**Exit transition:** `OPEN → ASSIGNED`

---

### 2) ASSIGNED
**Meaning:** A specific agent has been tasked and is accountable to begin.  
**Owner:** Bernard for team tasks; Claw only for simple direct specialist routing.  
**Entry criteria:**
- named owner exists
- brief has been sent
- required standards gate included
- expected deliverables are clear

**Exit transitions:**
- `ASSIGNED → IN PROGRESS` when agent starts work
- `ASSIGNED → OPEN` if assignment is withdrawn before start
- `ASSIGNED → REJECTED` only if assignment itself was invalid and must be re-briefed

---

### 3) IN PROGRESS
**Meaning:** The assigned agent is actively executing.  
**Owner:** Executing agent owns the work; Bernard owns coordination visibility.  
**Entry criteria:**
- agent has accepted/started the task
- work artifacts are being created or analysis is underway

**Exit transitions:**
- `IN PROGRESS → REVIEW` when deliverable is submitted for evaluation
- `IN PROGRESS → BLOCKED` only in local working notes if needed, but **BLOCKED is not part of the canonical publication state machine**
- `IN PROGRESS → OPEN` only if work is intentionally reset and reassigned from scratch

---

### 4) REVIEW
**Meaning:** Execution is complete enough for evaluation but not yet accepted as done.  
**Owner:** Bernard for coordinated initiatives; designated reviewer for single-specialist tasks.  
**Entry criteria:**
- deliverable submitted
- validation evidence attached where required
- lifecycle/logging contract present if applicable
- file locations are explicit

**Exit transitions:**
- `REVIEW → APPROVED` if deliverable meets contract
- `REVIEW → REJECTED` if quality, completeness, lifecycle, or standards gate fails

---

### 5) APPROVED
**Meaning:** Deliverable passed review and is accepted as complete.  
**Owner:** Bernard or designated reviewer.  
**Entry criteria:**
- success criteria met
- contradictions resolved
- review comments closed or explicitly accepted
- operational contract satisfied

**Exit transition:** `APPROVED → ARCHIVED`

---

### 6) REJECTED
**Meaning:** Deliverable or submission did not pass review.  
**Owner:** Bernard or designated reviewer.  
**Entry criteria:**
- explicit rejection reason written
- deficiencies listed concretely
- required next action identified
- ownership for resubmission is clear

**Exit transitions:**
- `REJECTED → ASSIGNED` when brief is revised and returned to an owner
- `REJECTED → IN PROGRESS` when same owner resumes with actionable revision guidance

---

### 7) ARCHIVED
**Meaning:** Approved work has been closed and moved to its durable reference location.  
**Owner:** Atlas for system organization; Bernard ensures closure for coordinated efforts.  
**Entry criteria:**
- approved deliverable stored in the correct project/task folder
- live coordination surface contains only summary + pointer
- closure note exists if needed

**Exit transitions:** none

---

## 3. Transition Ownership

| Transition | Who initiates | Who confirms |
|---|---|---|
| OPEN → ASSIGNED | Bernard / Claw | Bernard for coordinated work |
| ASSIGNED → IN PROGRESS | Assigned agent | Bernard updates coordination view |
| IN PROGRESS → REVIEW | Assigned agent submits | Bernard / reviewer acknowledges |
| REVIEW → APPROVED | Reviewer | Bernard |
| REVIEW → REJECTED | Reviewer | Bernard |
| REJECTED → ASSIGNED | Bernard (re-brief) | Assigned agent |
| REJECTED → IN PROGRESS | Assigned agent resumes against explicit rejection notes | Bernard monitors |
| APPROVED → ARCHIVED | Atlas / Bernard | Bernard confirms closure |

---

## 4. Rejection / Resubmission Flow

Rejection must be explicit and actionable.

### Rejection notice must contain
- what failed
- why it failed
- what evidence is missing
- whether the work needs revision, replacement, or re-scope
- who owns the next step
- expected resubmission path

### Canonical flow
1. Agent submits deliverable → `REVIEW`
2. Reviewer evaluates against brief, standards gate, and lifecycle/logging gate
3. If unacceptable → `REJECTED`
4. Reviewer issues written rejection note
5. Bernard either:
   - reassigns to same owner → `IN PROGRESS`, or
   - rewrites brief / changes owner → `ASSIGNED`
6. Revised submission returns to `REVIEW`
7. Only approved work can proceed to `ARCHIVED`

**No silent rejection. No vague “fix a few things.”**

---

## 5. Quality Gates by State

### Before OPEN
- scope is clear
- owner is identifiable
- due/priority known if time-sensitive

### Before ASSIGNED
- brief exists
- references included
- success criteria measurable
- standards gate attached

### Before REVIEW
- deliverable file exists
- summary of what changed exists
- required proofs attached (screenshots, validation, examples, etc.)
- lifecycle/logging block included where required

### Before APPROVED
- contract met
- contradictions reconciled
- reviewer signoff explicit

### Before ARCHIVED
- durable file location assigned
- board updated to concise summary
- historical detail moved out of live coordination surface

---

## 6. Bulletin Board Mapping

For publication on `BULLETIN_BOARD.md`, use the canonical state names where possible.

| Canonical state | Board meaning |
|---|---|
| OPEN | Ready to start now |
| ASSIGNED | Named owner, not yet started |
| IN PROGRESS | Active execution |
| REVIEW | Awaiting reviewer decision |
| APPROVED | Accepted, pending archival |
| REJECTED | Returned for revision |
| ARCHIVED | Closed and moved to reference location |

Legacy support notes such as `BLOCKED` or `QUEUED` may still appear as coordination annotations during migration, but they are not the canonical completion-state model.

---

## 7. Canonical Rule

A task is not complete when execution ends.  
A task is complete only after `APPROVED`, and operationally closed only after `ARCHIVED`.

That is the execution contract.
