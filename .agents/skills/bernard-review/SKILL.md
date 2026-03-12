# Bernard Review — Deliverable Verification Protocol

**Name:** bernard-review  
**Purpose:** Mandatory verification before Bernard stamps ✅ LOCKED or ⚠️ REVISION NEEDED  
**Trigger:** When Bernard receives an agent submission and must approve it before recording in PROJECT.md Work Log

---

## Overview

Bernard verifies every deliverable before stamping approval. This skill codifies his verification process based on deliverable type: **Visual/Deployed** or **Content**.

Both paths enforce three non-negotiable checks:
1. **Strategic Alignment** — matches project objective and audience
2. **Checklist Validation** — meets phase-specific review criteria
3. **Brand Compliance** — matches Vale's Brand Summary

---

## PATH A — Visual/Deployed Output

**Applies to:** Landing pages, deployed components, dashboards, live URLs, UI changes

### Step 1: Screenshot the Live URL
- **Mandatory, no exceptions.**
- Use the `screenshot` or `webapp-testing` skill
- Capture the actual rendered page (not a mockup or code)
- If URL is inaccessible, log `BLOCKED` and escalate

### Step 2: Verify Rendering
- Does the page load without errors?
- Does it render correctly across viewports (desktop minimum)?
- Are all elements visible and properly positioned?
- Are there any console errors or broken assets?

### Step 3: Check Against Brand Summary
- Read **Vale's Brand Summary** from PROJECT.md
- Does the visual design match the brand voice, color palette, typography?
- Is the layout consistent with project guidelines?
- Document any misalignments

### Step 4: Check Against Phase Review Criteria
- Read **Project Brief** section of PROJECT.md
- Review the **phase-specific review criteria** (checklist)
- Verify deliverable meets all criteria listed
- Flag any unmet items as ⚠️ REVISION NEEDED

### Step 5: Stamp Decision
- **If all checks pass:** Stamp ✅ LOCKED
  - Log to PROJECT.md Work Log: `✅ LOCKED [date] — [agent] [deliverable type] approved`
- **If any check fails:** Stamp ⚠️ REVISION NEEDED
  - Document specific issues
  - Return to agent with clear feedback
  - Do not advance to next phase

---

## PATH B — Content Output

**Applies to:** Blog posts, copy, strategy documents, research summaries, content briefs

### Step 1: Read the Full File
- **Do not rely on PROJECT.md summary alone.**
- Navigate to the agent's workspace folder
- Read the actual full-length deliverable
- Document the file path and word count

### Step 2: Check Against Project Objective
- Read **Project Brief** section of PROJECT.md
- Is the content addressing the stated objective?
- Does it serve the intended audience?
- Is the scope appropriate for the phase?
- Document alignment or misalignment

### Step 3: Check Against Phase Review Criteria
- Read the **phase-specific review criteria** (checklist) in Project Brief
- Verify content meets all listed criteria
- Examples:
  - "Blog post must be 800–1200 words" → check word count
  - "Must include 3 customer testimonials" → verify present
  - "Must link to main product page" → verify present
- Flag any unmet items as ⚠️ REVISION NEEDED

### Step 4: Check Against Brand Voice
- Read **Vale's Brand Summary** from PROJECT.md
- Does the writing match the brand voice and tone?
- Are messaging pillars reflected in the content?
- Is the language consistent with audience expectations?
- Document any tone mismatches

### Step 5: Stamp Decision
- **If all checks pass:** Stamp ✅ LOCKED
  - Log to PROJECT.md Work Log: `✅ LOCKED [date] — [agent] [deliverable type] approved`
- **If any check fails:** Stamp ⚠️ REVISION NEEDED
  - Document specific issues with line references if possible
  - Return to agent with clear feedback
  - Do not advance to next phase

---

## Three Checks (Both Paths)

### 1. Strategic Alignment ✓
- **Question:** Does this match the project objective?
- **Check:** Read Project Brief objective
- **Verify:** Deliverable directly addresses the stated need
- **Document:** "Strategic alignment: [PASS / NEEDS REVISION]"

### 2. Checklist Validation ✓
- **Question:** Does this meet the phase-specific review criteria?
- **Check:** Read Project Brief checklist for this phase
- **Verify:** Each item in checklist is satisfied
- **Document:** List any unchecked items
- **Flag:** Any failed items → ⚠️ REVISION NEEDED

### 3. Brand Compliance ✓
- **Question:** Does this match the brand voice and direction?
- **Check:** Read Vale's Brand Summary from PROJECT.md
- **Verify:** Tone, messaging, visual style, audience fit
- **Document:** "Brand compliance: [PASS / NEEDS REVISION]"
- **Flag:** Any misalignment → ⚠️ REVISION NEEDED

---

## Hard Rules

**No Self-Report Approval**
- Bernard never stamps ✅ LOCKED based on an agent's self-report alone
- Bernard verifies independently using this protocol
- Agent says "done" ≠ Bernard says "approved"

**Visual Deliverables Require Screenshot**
- No live URL → cannot approve
- No screenshot → cannot approve
- Screenshot shows errors → cannot approve
- Screenshots are the proof of deployment

**Content Deliverables Require Full File Read**
- Never approve based on PROJECT.md summary alone
- Read the actual file in the agent's workspace
- Summary is for context, not for approval

**Access Failures Are Escalations**
- Cannot access live URL → log `BLOCKED [URL]`
- Cannot read file → log `BLOCKED [FILE PATH]`
- Escalate to Claw with reason and retry instructions

---

## Work Log Entry Format

### Approval (✅ LOCKED)
```
✅ LOCKED [2026-03-12 11:45] — Scribe blog post approved
   Strategic: ✓ addresses project objective
   Checklist: ✓ 800–1200 words, 3 testimonials, main product link
   Brand: ✓ voice matches tone guidelines
   Notes: Clear, on-brand, ready for landing page integration
```

### Rejection (⚠️ REVISION NEEDED)
```
⚠️ REVISION NEEDED [2026-03-12 11:45] — Devan landing page
   Strategic: ✓ matches objective
   Checklist: ✗ missing mobile responsiveness test (required in checklist)
   Brand: ✗ button color doesn't match brand palette (expected navy #1a2a4d, got #2b3f5d)
   Screenshot: [screenshot.png]
   Feedback: 
   1. Add mobile screenshot to prove responsiveness
   2. Update button color to match Vale's brand palette
   Return when ready.
```

---

## When to Escalate

Log `ESCALATE [reason]` and notify Claw if:
- URL is inaccessible after 2 retries
- File path doesn't exist or is corrupt
- Checklist criteria are ambiguous or conflicting
- Deliverable requires specialist input to validate (e.g., security review for code)
- Phase review criteria are missing from Project Brief

Escalation is not failure. It's blocking documentation for Claw to unblock.

---

## Integration with PROJECT.md

**Location:** Append all decisions to PROJECT.md Work Log
- Section: `## Work Log`
- Format: `[timestamp] | Agent Name | Deliverable Type | Status | Notes`
- Status: ✅ LOCKED or ⚠️ REVISION NEEDED or ESCALATE
- Never delete or modify previous entries (append-only)

Example:
```
## Work Log

[2026-03-12 11:30] | Christopher | Research Summary | ✅ LOCKED | Verified against brief, meets checklist
[2026-03-12 11:40] | Scribe | Blog Post v1 | ⚠️ REVISION NEEDED | Missing 2 customer testimonials
[2026-03-12 11:50] | Scribe | Blog Post v2 | ✅ LOCKED | Revised and approved
[2026-03-12 12:00] | Devan | Landing Page | ✓ Testing | In progress, visual verification scheduled
```

---

## Using This Skill

**When Bernard receives a deliverable:**

1. Identify deliverable type (Visual or Content)
2. Follow the appropriate PATH (A or B)
3. Execute the 5 steps for that path
4. Apply the three checks
5. Make a stamp decision (✅ or ⚠️ or ESCALATE)
6. Log to PROJECT.md Work Log
7. Return feedback to agent

**Tools Bernard uses:**
- `screenshot` or `webapp-testing` — for visual verification
- `read` — to access agent workspace files and PROJECT.md
- `write` — to update PROJECT.md Work Log (append-only)

---

## Success Criteria

Bernard's review is successful when:
- ✅ Every visual deliverable has a screenshot
- ✅ Every content deliverable was read in full, not just summarized
- ✅ All three checks (alignment, checklist, brand) are documented
- ✅ All stamps are backed by evidence
- ✅ Work Log is append-only and complete
- ✅ Agents know exactly what failed and why (if ⚠️)
