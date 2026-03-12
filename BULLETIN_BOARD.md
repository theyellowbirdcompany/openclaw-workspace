# BULLETIN_BOARD.md — Live Job Queue

**Owner:** Bernard  
**Read by:** Claw (read-only), Bernard  
**Updated:** Bernard updates after every routing decision and approval

---

## Rules

1. **Single Source of Truth** — All active jobs tracked here
2. **Bernard Writes Only** — Specialist agents skip this file
3. **State Transitions** — Jobs move through states in order
4. **Status Stamps** — Bernard stamps each transition with date + verdict
5. **No Cross-Reads** — Agents don't read BULLETIN_BOARD to understand tasks; briefs are self-contained
6. **Accountability** — Every job has an owner and a deadline (implied: "when Brett asks for it")

---

## Job States

- **OPEN** — Task submitted to Brett, awaiting Bernard interpretation
- **ASSIGNED** — Bernard routed specialist with clear brief, awaiting work
- **IN PROGRESS** — Specialist executing (agent may update own summary in PROJECT.md)
- **REVIEW** — Specialist notified Bernard phase is done, awaiting Bernard approval
- **APPROVED** — ✅ LOCKED, Bernard stamped it, ready for next phase or delivery
- **ARCHIVED** — Complete, moved to Completed Projects section

---

## Current Jobs

(None — ready for next project)

---

## Completed Projects (Archive)

### Victoria Flooring Outlet — Deal of the Week Landing Page ✅
- **State:** ARCHIVED
- **Completion Date:** 2026-03-12 16:00 PDT
- **Final Deliverables:**
  - Live landing page: https://vfo-deal-landing-20260312-153920.vercel.app
  - GitHub repo: https://github.com/theyellowbirdcompany/vfo-deal-landing-20260312-153920
  - Blog post + landing page copy (verification-safe)
  - PROJECT.md tracking complete with full Work Log
- **Pipeline Executed:** Atlas ✅ → Christopher ✅ (w/ 1 revision) → Vale ✅ → Scribe ✅ (w/ 2 revisions) → Devan ✅
- **Quality Notes:** 
  - Strong gate enforcement by Bernard on proof standards
  - Scribe required revision cycles on unverified claims (learning point for next project)
  - Devan deployment workflow clarified (new repo + Vercel per project)
  - All deliverables production-grade and live
- **Final Verdict:** ✅ LOCKED — Project complete, all phases approved, live in production
