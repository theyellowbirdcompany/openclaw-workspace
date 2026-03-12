# Project Setup — Pipeline Templates & PROJECT.md Creation

**Name:** project-setup  
**Purpose:** Atlas creates standardized PROJECT.md files with pre-populated phases, agents, and review criteria based on Bernard's selected pipeline  
**Trigger:** Bernard selects a pipeline type and routes to Atlas with project brief

---

## Overview

Projects follow structured pipelines. Bernard chooses the pipeline type based on project scope, then routes to Atlas to create the PROJECT.md skeleton with correct phases, agent assignments, and review criteria.

Four standard pipelines are available. Non-standard projects require Bernard to propose a sequence before Atlas proceeds.

---

## Pipeline Templates

### PIPELINE 1: full-creative
**Scope:** Research + brand + content + code  
**Agents & Phases:**

| Phase | Agent | Responsibility |
|---|---|---|
| 1. Setup | Atlas | Project folder structure, brief documentation |
| 2. Research | Christopher | External research, market analysis, findings |
| 3. Brand | Vale | Brand positioning, visual direction, guidelines |
| 4. Content | Scribe | Copy, blog posts, messaging, content assets |
| 5. Build | Devan | Implementation, code, deployment |

**Review Gates:** Bernard stamps ✅ LOCKED after each phase (5 approval points)

**Use when:** Project needs market intelligence, brand strategy, content, and code (full product launch, campaign, redesign)

---

### PIPELINE 2: content-only
**Scope:** Research + brand + content  
**Agents & Phases:**

| Phase | Agent | Responsibility |
|---|---|---|
| 1. Setup | Atlas | Project folder structure, brief documentation |
| 2. Research | Christopher | External research, market analysis, findings |
| 3. Brand | Vale | Brand positioning, visual direction, guidelines |
| 4. Content | Scribe | Copy, blog posts, messaging, content assets |

**Review Gates:** Bernard stamps ✅ LOCKED after each phase (4 approval points)

**Use when:** Project is content-focused with no code component (blog series, marketing campaign, white paper, thought leadership)

---

### PIPELINE 3: research-only
**Scope:** Research  
**Agents & Phases:**

| Phase | Agent | Responsibility |
|---|---|---|
| 1. Setup | Atlas | Project folder structure, brief documentation |
| 2. Research | Christopher | External research, competitive analysis, findings |

**Review Gates:** Bernard stamps ✅ LOCKED after each phase (2 approval points)

**Use when:** Project is pure research/intelligence with no downstream execution (market opportunity, competitive landscape, trends analysis)

---

### PIPELINE 4: quick-build
**Scope:** Brand + code  
**Agents & Phases:**

| Phase | Agent | Responsibility |
|---|---|---|
| 1. Setup | Atlas | Project folder structure, brief documentation |
| 2. Brand | Vale | Visual direction, brand guidelines (abbreviated) |
| 3. Build | Devan | Implementation, code, deployment |

**Review Gates:** Bernard stamps ✅ LOCKED after each phase (3 approval points)

**Use when:** Project has existing brand or strategy, needs quick UI/code execution (new feature, bug fix, UI iteration)

---

## PROJECT.md Template Structure

Every pipeline generates a PROJECT.md with this structure:

```markdown
# PROJECT: {project-name}

## Project Brief
[Pre-populated by Bernard when selecting pipeline]
- Objective: {statement}
- Success Criteria: {list}
- Constraints: {list}
- Selected Pipeline: {pipeline-name}
- Assigned Agents: {list from pipeline}

---

## Phase Summaries
[One section per pipeline phase, pre-populated with agent name and placeholder]

### Phase 1: {Phase Name}
**Agent:** {Agent Name}

**Review Criteria:**
- [ ] Checklist item 1
- [ ] Checklist item 2
- [ ] Checklist item 3

**Summary:**
[To be written by agent, ~500 chars]

**Status:** ⏳ PENDING

---

### Phase 2: {Phase Name}
[Same structure...]

---

## Work Log
[Append-only record of Bernard's stamps]

[Ready for Phase 1]
```

---

## Atlas Workflow

When Bernard routes to Atlas with pipeline selection:

1. **Receive pipeline selection** from Bernard
   - Example: `full-creative` for Victoria Flooring Blog Campaign
   - Includes: Project name, brief, pipeline type

2. **Create project folder structure**
   ```
   projects/{project-name}/
   ├── PROJECT.md (new)
   ├── deliverables/ (empty, ready)
   └── [no code until Devan phase]
   ```

3. **Populate PROJECT.md skeleton**
   - Copy the correct pipeline template
   - Fill in project name and objective from brief
   - Pre-populate agent assignments from pipeline
   - Add phase-specific review criteria (see guidelines below)
   - Initialize Work Log section

4. **Validate and return to Bernard**
   - Log task completion to AGENTS.md (Logging Gate section)
   - Return PROJECT.md for Bernard's approval before Phase 1 begins

---

## Review Criteria Template

Each phase needs a checklist. Use these as starting points:

### Research Phase (Christopher)
- [ ] Sources are credible and current (dated within 6 months unless historical data)
- [ ] Key findings are backed by evidence
- [ ] Competitive landscape or market opportunity is clearly mapped
- [ ] Summary is ~500 characters and written for next agent

### Brand Phase (Vale)
- [ ] Brand voice and tone are consistent
- [ ] Visual direction (color, typography) is documented
- [ ] Messaging pillars are clear and differentiated
- [ ] Guidelines match brief scope and constraints

### Content Phase (Scribe)
- [ ] Word count matches brief (e.g., 800–1200 for blog post)
- [ ] Tone matches brand voice from Vale's summary
- [ ] All required elements present (e.g., CTA, testimonials, links)
- [ ] SEO best practices applied (if applicable)

### Build Phase (Devan)
- [ ] Code passes code-reviewer and security-best-practices
- [ ] Live URL deployed and renders correctly
- [ ] UI matches Vale's brand guidelines
- [ ] Content and code are integrated (if applicable)

---

## Non-Standard Projects

If a project doesn't fit any template, Bernard must:

1. **Propose a custom sequence** to the operator
   - Example: `Atlas → Christopher → Devan → Scribe` (research first, then build, then finalize copy)
   - Include rationale for the order

2. **Get operator approval** before Atlas proceeds
   - Operator confirms or suggests alternatives
   - Once approved, Atlas creates PROJECT.md with custom phases

3. **Document in Work Log**
   - Note that this is a custom sequence
   - Include Bernard's rationale

---

## Success Criteria

Atlas has successfully created a PROJECT.md when:
- ✅ Correct pipeline phases are in order
- ✅ Agents are correctly assigned per pipeline
- ✅ Review criteria are present and specific to each phase
- ✅ Project folder exists with PROJECT.md and deliverables/
- ✅ Work Log is initialized and ready for Bernard's stamps
- ✅ PROJECT.md is ready for Phase 1 assignment (no errors or placeholders)

---

## Example: full-creative Pipeline

```markdown
# PROJECT: Victoria Flooring Blog Campaign

## Project Brief
- **Objective:** Create a blog post explaining what makes the current "Deal of the Week" special, plus a landing page for the post
- **Success Criteria:**
  - Blog post: 800–1200 words, SEO-optimized, on-brand
  - Landing page: Simple, mobile-responsive, converts to product page
  - Both live and indexed within 2 weeks
- **Constraints:** Use existing brand guidelines, no new brand work
- **Selected Pipeline:** full-creative
- **Assigned Agents:** Christopher, Vale, Scribe, Devan

---

## Phase 1: Market Research
**Agent:** Christopher

**Review Criteria:**
- [ ] Deal details verified from live site
- [ ] Value proposition clearly identified
- [ ] Target customer profile documented
- [ ] Summary is ~500 chars and written for Vale

**Summary:**
[To be written by Christopher]

**Status:** ⏳ PENDING

---

## Phase 2: Brand Direction
**Agent:** Vale

**Review Criteria:**
- [ ] Messaging pillars align with deal value prop
- [ ] Tone matches existing Victoria Flooring brand
- [ ] Blog post and landing page visual direction documented
- [ ] Summary is ~500 chars and written for Scribe

**Summary:**
[To be written by Vale]

**Status:** ⏳ PENDING

---

## Phase 3: Content
**Agent:** Scribe

**Review Criteria:**
- [ ] Blog post: 800–1200 words
- [ ] Includes at least 3 value props from Christopher's research
- [ ] Landing page copy supports conversion
- [ ] Tone matches Vale's brand summary
- [ ] Summary is ~500 chars and written for Devan

**Summary:**
[To be written by Scribe]

**Status:** ⏳ PENDING

---

## Phase 4: Build
**Agent:** Devan

**Review Criteria:**
- [ ] Landing page renders correctly (desktop + mobile)
- [ ] Page matches Vale's visual direction
- [ ] Blog post and landing page are linked
- [ ] Live URL deployed to production
- [ ] Summary includes live URL

**Summary:**
[To be written by Devan]

**Status:** ⏳ PENDING

---

## Work Log
[Append-only, Bernard's stamps only]

[2026-03-12] Ready for Phase 1: Market Research → Christopher
```

---

## Integration

- **Triggered by:** Bernard's pipeline selection + brief
- **Executed by:** Atlas (project creation only, not execution)
- **Output:** Standardized PROJECT.md ready for Phase 1 assignment
- **Next:** Bernard stamps ✅ LOCKED on Phase 1 brief, routes to assigned agent
