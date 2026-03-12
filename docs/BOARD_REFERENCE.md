# Board Reference — State Model & System Status

This is the reference doc for the bulletin board's 7-state lifecycle. The live board (BULLETIN_BOARD.md) uses these states but doesn't re-explain them.

---

## State Model (Canonical 7-State Vocabulary)

### 🔴 OPEN
Ready to start now. Brief is clear, no unresolved prerequisites.
Bernard or Claw creates OPEN work, then dispatches to a named owner → ASSIGNED.

### 🟡 ASSIGNED
A specific agent has been dispatched and is accountable to begin.
Agent begins execution → IN PROGRESS.

### 🟠 IN PROGRESS
The assigned agent is actively executing. Work artifacts are being created.
When deliverables are submitted → REVIEW.

### 🔵 REVIEW
Execution complete enough for evaluation. Deliverables submitted to reviewer.
Reviewer accepts → APPROVED, or returns with feedback → REJECTED.

### ✅ APPROVED
Reviewer accepted the deliverable. Success criteria met.
Task summarized and moved → ARCHIVED.

### ❌ REJECTED
Review found gaps. Work returned with concrete revision guidance.
Returns to ASSIGNED or IN PROGRESS depending on resubmission path.

### ⚪ ARCHIVED
Approved work is closed. Live board keeps only a concise summary and artifact pointers.

---

## Transition Guidance

| Transition | Initiated by | When |
|---|---|---|
| OPEN → ASSIGNED | Bernard / Claw | Brief sent to named owner |
| ASSIGNED → IN PROGRESS | Assigned agent | Agent acknowledges and starts |
| IN PROGRESS → REVIEW | Assigned agent | Deliverable submitted with evidence |
| REVIEW → APPROVED | Reviewer | Meets brief and standards |
| REVIEW → REJECTED | Reviewer | Fails quality or completeness |
| REJECTED → IN PROGRESS | Assigned agent | Resumes against rejection notes |
| APPROVED → ARCHIVED | Atlas / Bernard | Durable location confirmed |

---

## Template Example — Task Through All 7 States

1. **OPEN** — Ready. Scope, references, success criteria exist.
2. **ASSIGNED** — Bernard dispatches agent with brief.
3. **IN PROGRESS** — Agent creates deliverables.
4. **REVIEW** — Agent submits files and summary.
5. **APPROVED** — Reviewer confirms quality.
6. **REJECTED** — (alt path) Reviewer returns with revision notes.
7. **ARCHIVED** — Summary + artifact pointers on board; detail in project folder.

**Key distinction:** IN PROGRESS = still working. REVIEW = submitted, not yet accepted. APPROVED = explicitly accepted.

---

## System Status

**Cron Jobs:**
- Bernard monitor: Every 1 hour (Gemini Flash)
- Claw dispatcher: Every 1 hour (Gemini Flash)

**Config:** 3 concurrent agents, 6-hour timeouts

**Cost Optimization:**
- Cron model: Flash only (never Sonnet/GPT for crons)
- Devan: Claude Code enforced
- Quality gates: Screenshot proof for UI tasks

**Database / Logging:**
- Supabase project: `vzpexiztpmojgyswtkze` — operational
- RLS: Disabled on `agent_logs` table
- SQL tool: `bin/run-sql.sh`

**Production:**
- Live at: https://test-mu-beryl-17.vercel.app
- Deployed: 2026-03-10 20:22 PDT
