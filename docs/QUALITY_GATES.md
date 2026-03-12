# Quality Gates - Production Standards

**Created:** 2026-03-10 after Task #007.5 quality failure

**Problem:** Devan delivered rushed, incomplete UI. Bernard accepted it without validation. Brett caught it only after deployment.

**Solution:** Mandatory quality gates for all deliverables.

---

## 🚨 Definition of "DONE"

**You are NOT done until:**

### For Visual/UI Work
1. ✅ **Screenshot taken** of final result
2. ✅ **Screenshot compared** to reference image/example (side-by-side)
3. ✅ **Visual match verified** (>80% similarity to target)
4. ✅ **Build passes** (`npm run build` succeeds)
5. ✅ **Pushed to git** with descriptive commit
6. ✅ **Deployed and verified** on live URL
7. ✅ **Screenshot sent to Bernard** for approval
8. ✅ **Bernard approves** before marking DONE

### For Code/Technical Work
1. ✅ **Build passes** (no errors)
2. ✅ **Tests pass** (if applicable)
3. ✅ **Linter passes** (or pre-existing errors only)
4. ✅ **Functionality tested** (manual verification)
5. ✅ **Pushed to git** with descriptive commit
6. ✅ **Documentation updated** (if needed)
7. ✅ **Bernard approves** (for critical work)

### For Research/Strategy Work
1. ✅ **Deliverable document** exists at specified path
2. ✅ **All required sections** present (per task brief)
3. ✅ **Actionable recommendations** included
4. ✅ **Sources cited** (if research)
5. ✅ **Reviewed by requester** (Bernard, Brett, etc.)

---

## 📸 Screenshot Requirements

### When Screenshots Are Mandatory
- **All UI/design work**
- **All visual changes** to existing interfaces
- **All dashboard/data visualization** work
- **Any work with a reference image**

### How to Take Screenshots

Using browser tool:
```javascript
browser(action="screenshot", 
        url="https://openclaw-dashboard.vercel.app/command-center",
        fullPage=true)
```

Save to task folder:
```bash
/home/clawd/.openclaw/workspace/tasks/[task-number]/screenshots/
```

### Screenshot Naming Convention
- `progress-25.png` — 25% checkpoint
- `progress-50.png` — 50% checkpoint
- `progress-75.png` — 75% checkpoint
- `final.png` — Final deliverable
- `comparison.png` — Side-by-side with reference (if applicable)

---

## 🔄 Progress Checkpoints

**All tasks >2 hours MUST have progress check-ins:**

### 25% Checkpoint
- **What:** Approach decided, structure in place
- **Show:** Plan, wireframe, or skeleton code
- **Approval:** Get feedback before building more

### 50% Checkpoint
- **What:** Core functionality working (rough)
- **Show:** Screenshot or demo of current state
- **Approval:** Verify direction before polishing

### 75% Checkpoint
- **What:** Near-final with most features
- **Show:** Screenshot comparison to reference
- **Approval:** Final feedback before completion

### 100% Completion
- **What:** Production-ready, polished
- **Show:** Final screenshot + proof of deployment
- **Approval:** Bernard must approve before "DONE"

---

## 🎯 Reference Validation

**If task has reference image/example:**

1. **Download reference** to task folder: `tasks/[number]/reference.png`
2. **Take screenshot at each checkpoint**
3. **Create comparison image** (side-by-side)
4. **Ask yourself:** "Would Brett approve this?"
5. **If visual match <80%** → iterate, don't mark done

### Comparison Checklist
- [ ] Layout structure matches reference
- [ ] Component count matches (e.g., 7 agent desks, not 1)
- [ ] Color scheme matches brand guidelines
- [ ] Typography matches (fonts, sizes, hierarchy)
- [ ] Spacing/padding feels similar
- [ ] Interactive elements work as expected
- [ ] Mobile responsive (if applicable)

---

## 👨‍💼 Bernard's Quality Control Role

**Bernard MUST:**

### For Every Visual Deliverable
1. **Request screenshot** from agent before accepting
2. **Take own screenshot** of deployed site
3. **Compare to reference image**
4. **Verify acceptance criteria** from task brief
5. **REJECT if quality insufficient**
6. **Send back with specific feedback** for iteration

### Rejection Criteria
- ❌ Visual doesn't match reference (>20% deviation)
- ❌ Missing required features/components
- ❌ Build fails or has errors
- ❌ No screenshot provided
- ❌ Not tested on live deployment
- ❌ Rushed work (too fast = suspicious quality)

### Approval Process
```markdown
## Bernard's Review: Task #007.5

✅ Screenshot provided: [link]
✅ Reference comparison: 85% match
✅ All 7 agent desks visible
✅ Metrics strip working
✅ Build passes
✅ Deployed and tested

**Status:** APPROVED
```

**If rejected:**
```markdown
## Bernard's Review: Task #007.5

❌ Screenshot shows only 1 desk (should be 7)
❌ Reference comparison: 30% match
❌ Missing metrics strip
❌ Rushed (1,780 lines in 16 min)

**Status:** REJECTED - Iterate and resubmit

**Specific fixes needed:**
1. Show all 7 agent desks in isometric layout
2. Add metrics strip at top
3. Match reference image hex pod structure
4. Use Claude Code for quality iteration
```

---

## ⚡ Speed vs. Quality

**Red flags for rushed work:**

- ⚠️ >50 lines of code per minute
- ⚠️ "DONE" in <30 min for multi-hour task
- ⚠️ No progress check-ins during work
- ⚠️ First commit = final commit (no iteration)
- ⚠️ No screenshot until "DONE"

**When you see these:**
1. Request visual proof immediately
2. Compare to reference/requirements
3. High chance of quality failure
4. Reject and require proper iteration

---

## 🛠️ Tools for Quality

### Visual Diff (Already Available)
```bash
/home/clawd/.openclaw/workspace/visual-diff-loop.js
```

### Screenshot + Compare Workflow
1. Take screenshot of deployed work
2. Compare to reference image (visual diff tool)
3. Calculate similarity percentage
4. If <80% → iterate
5. If ≥80% → request Bernard review

### Build Verification
```bash
cd /home/clawd/.openclaw/workspace/projects/command-center
npm run build  # Must pass
npm run lint   # Check for new errors
```

---

## 📋 Task Brief Template (Updated)

Every task should include:

```markdown
### Task #XXX - [Name]
**Agent:** @AgentName
**Due:** [Date/Time]
**Reference:** [Image/example URL or path]

**Acceptance Criteria:**
- [ ] [Specific requirement 1]
- [ ] [Specific requirement 2]
- [ ] Screenshot matches reference (>80% similarity)
- [ ] All components visible and functional
- [ ] Build passes
- [ ] Bernard approves

**Progress Checkpoints:**
- [ ] 25% - Approach approved
- [ ] 50% - Core working (screenshot required)
- [ ] 75% - Near-final (screenshot vs reference)
- [ ] 100% - Final approval (screenshot + Bernard review)

**Quality Gate:**
- Screenshot proof mandatory
- Bernard must approve before DONE
```

---

## 🎓 Learning from Failures

**Task #007.5 Post-Mortem (2026-03-10):**

**What went wrong:**
- Devan delivered 1,780 lines in 16 min (rushed)
- Only 1 agent desk instead of 7
- No visual comparison to reference
- Bernard accepted without validation
- Brett caught it after deployment

**What we learned:**
- Speed ≠ quality
- "DONE" needs objective proof
- Bernard must enforce quality gates
- Screenshots mandatory for visual work
- Reference comparison prevents drift

**What we changed:**
- Added screenshot requirements
- Added Bernard quality control mandate
- Added progress checkpoints
- Created this QUALITY_GATES.md document

---

## 🚀 Implementation

**This document is effective immediately.**

All agents must:
1. Read QUALITY_GATES.md before starting work
2. Follow checkpoint requirements
3. Provide screenshot proof for visual work
4. Get Bernard approval before "DONE"

Bernard must:
1. Enforce quality gates
2. Request proof before accepting
3. Reject insufficient work
4. Send specific feedback for iteration

**No exceptions. Quality over speed. Always.**

---

*Quality is not negotiable. This is how we build production-grade work.*
