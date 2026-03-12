# Command Center V2 — Execution Plan

**Strategist:** Bernard  
**Date:** 2026-03-11  
**Status:** PRE-FLIGHT (Atlas)

---

## Overview

Clean Command Center dashboard from scratch. Real-time agent monitoring. Reference style: GitHub Actions / Vercel dashboard.

**Key Constraint:** NO 3D, NO isometric office recreation, NO bloat.

---

## Reference Analysis

**Image:** `/home/clawd/.openclaw/workspace/projects/command-center/command-center-reference.jpg`

**Takeaways (inspiration only):**
- Color-coded agent zones (each agent has distinct color)
- Central "collaborative hub" concept
- Workflow board on right (GOALS / WORKFLOW)
- Individual workstations with status indicators
- Clean layout with clear visual hierarchy

**DO NOT:**
- Recreate isometric illustration in code
- Use as background image
- Build 3D/spatial representation

**DO:**
- Clean card grid with real data
- Color-code agents per constants.js
- Status indicators (green/gray/red dots)
- Workflow/task queue visualization

---

## Phase Breakdown

### PRE-FLIGHT (Atlas) — CURRENT PHASE

**Objective:** Clean scaffold + infrastructure setup

**Tasks:**
1. Create GitHub repo: `openclaw-command-center` under `theyellowbirdcompany`
2. Scaffold Vite + React + Tailwind at `/home/clawd/.openclaw/workspace/projects/command-center-v2/`
3. Copy files from old project:
   - `src/hooks/useOfficeData.js`
   - `src/lib/supabase.js`
   - `src/lib/constants.js`
4. Set up `.env` with Supabase credentials
5. Install `@supabase/supabase-js`
6. Verify Supabase: 7 agents in `agent_status` table
7. Link to Vercel (auto-deploy on main)
8. Verify `npm run build` passes

**Quality Gates:**
- ✅ Build passes locally
- ✅ Supabase returns 7 agents
- ✅ Vercel linked
- ✅ Clean scaffold (minimal dependencies)

**Deliverables:**
- GitHub repo URL
- Vercel deployment URL
- Screenshot: build output + Supabase query
- Report to Bernard

---

### PHASE 1 (Devan) — Agent Grid

**Objective:** 7-card agent status grid with real data

**Requirements:**
- Single page: `AgentStatusGrid` component
- 7 cards (CSS grid: 3-col desktop / 2-col tablet / 1-col mobile)
- Each card shows:
  - Agent name
  - Role
  - Status dot (green=active, gray=idle, red=error)
  - Current task
  - Last seen timestamp
- `StatusSummaryBar` at top:
  - X active / Y idle / Z errors
  - Tasks in progress count
- Dark navy background
- Tailwind only (no custom CSS)
- Wire up `useOfficeData` for real Supabase data

**Quality Gates:**
- ✅ `npm run build` passes
- ✅ Screenshot shows 7 cards with real data
- ✅ Bernard independent verification
- ✅ Matches GitHub Actions dashboard style

**STOP:** Bernard must APPROVE before Phase 2  
**Communication:** Send screenshot to Brett on Telegram

---

### PHASE 2 (Devan) — Task Queue + Activity Feed

**Objective:** Live task tracking + chronological activity log

**Components:**

1. **TaskQueue:**
   - Live view of current tasks
   - Status filters: OPEN, ASSIGNED, IN PROGRESS, REVIEW
   - Data source: **TBD by Bernard** (Supabase table vs BULLETIN_BOARD.md parse)

2. **ActivityFeed:**
   - Chronological `agent_logs` entries
   - Color-coded by agent (use constants.js colors)
   - Timestamps
   - Max 50 entries, scrollable
   - Realtime via Supabase subscription

**Quality Gates:**
- ✅ Build passes
- ✅ Screenshot shows grid + queue + feed with real data
- ✅ Realtime updates work
- ✅ Bernard independent verification

**STOP:** Bernard must APPROVE before Phase 3  
**Communication:** Send screenshot to Brett on Telegram

---

### PHASE 3 (Devan) — Polish + Deploy

**Objective:** Production-ready deployment

**Tasks:**
- Responsive polish (mobile/tablet/desktop)
- Bundle size verification (< 200KB target)
- Push to main (triggers Vercel deploy)
- Screenshot live deployed URL
- Verify realtime updates on live site

**Quality Gates:**
- ✅ Live URL works
- ✅ Bundle < 200KB
- ✅ Responsive on all screen sizes
- ✅ Realtime updates verified on live
- ✅ Bernard final approval

**Communication:** Send live URL + screenshot to Brett on Telegram

---

## Constraints (Non-Negotiable)

- ❌ NO Three.js, p5.js, 3D libraries
- ❌ NO isometric or office floor plan
- ❌ NO framer-motion (CSS transitions OK)
- ❌ NO react-router-dom (single page MVP)
- ❌ NO North Star concept
- ✅ Total new code < 500 lines
- ✅ Devan MUST use Claude Code (free)
- ✅ Tailwind utility classes (not inline styles or custom CSS)

---

## Quality Enforcement Protocol

1. **Screenshot proof at every gate**
2. **Bernard takes independent screenshot** to verify
3. **Bernard APPROVE or REJECT** with specific feedback
4. **If rejected:** Devan iterates, does NOT skip to next phase
5. **Speed flag:** < 15 min phase completion triggers extra scrutiny
6. **Reference comparison:** GitHub Actions / Vercel dashboard style
7. **Telegram updates:** Proactive at every gate

---

## Bernard's Decisions Needed

### Phase 2 Data Source Decision

**Option A: Supabase Table**
- Pro: Centralized, structured, queryable
- Pro: Already set up for agent_status/agent_logs
- Con: Requires table creation/migration
- Con: Duplicate source of truth with BULLETIN_BOARD.md

**Option B: Parse BULLETIN_BOARD.md**
- Pro: Single source of truth
- Pro: No database changes needed
- Con: Parsing complexity
- Con: Less structured query capability
- Con: File must be accessible to frontend

**Recommendation:** Will decide after Pre-flight completion, once we see current Supabase schema and assess BULLETIN_BOARD.md structure.

---

## Communication Plan

### Internal (Bernard ↔ Specialists)
- Atlas reports to Bernard when Pre-flight complete
- Devan reports to Bernard at each phase gate
- Bernard reviews and APPROVES/REJECTS

### External (Bernard → Brett via Telegram)
- Pre-flight complete: scaffold + Supabase verification
- Phase 1 complete: 7-card grid screenshot
- Phase 2 complete: grid + queue + feed screenshot
- Phase 3 complete: live URL + final screenshot

**Tone:** Proactive, concise, visual proof attached

---

## Current Status

**Phase:** PRE-FLIGHT  
**Assigned to:** Atlas  
**Started:** 2026-03-11 17:52 PDT  
**Next action:** Await Atlas completion report

---

## Notes

- Reference image analyzed: isometric office concept (DO NOT recreate)
- Old project files identified and ready to copy
- 7 agents confirmed in constants.js: Claw, Bernard, Christopher, Devan, Vale, Scribe, Atlas
- Supabase URL verified: https://vzpexiztpmojgyswtkze.supabase.co

---

**Bernard's Role:**
1. ✅ Plan execution sequence
2. ⏳ Delegate Pre-flight to Atlas
3. ⏳ Enforce quality gates at each phase
4. ⏳ Take independent screenshots
5. ⏳ Decide Phase 2 data source
6. ⏳ Ensure Telegram updates
7. ⏳ Final review before live deploy
