# PROJECT_FOLDER_STRUCTURE.md

Standard template for all future projects in `/tasks/[PROJECT_ID]-[project-name]/`.

This structure is based on the strongest patterns from `tasks/007-command-center/`, aligned with `WORKSPACE_ORGANIZATION.md`, and upgraded to include feedback loops and learning capture by default.

---

## Purpose

Use this template when creating a new project folder so every project is:
- easy to scan
- easy to hand off
- easy to review
- easy to archive
- consistent across agents
- organized per Atlas's workspace rules
- designed to capture feedback and learning, not just outputs

This template is the default for all new project/task folders inside `/tasks/`.

---

## Standard Project Folder Layout

```text
tasks/[PROJECT_ID]-[project-name]/
├── README.md
├── BRIEF.md
├── PHASES.md
├── ARCHIVE_INDEX.md
├── LAUNCH_PLAN.md
├── FEEDBACK_LOG.md
├── POST_LAUNCH_LEARNING.md
├── docs/
│   ├── research/
│   ├── planning/
│   ├── architecture/
│   └── decisions/
├── phases/
│   ├── PHASE_1_[NAME].md
│   ├── PHASE_2_[NAME].md
│   └── PHASE_N_[NAME].md
├── assets/
│   ├── references/
│   ├── screenshots/
│   ├── diagrams/
│   └── configs/
├── feedback/
│   ├── stakeholder/
│   ├── users/
│   └── internal/
├── code/
│   ├── src/
│   ├── scripts/
│   └── README.md
├── archive/
│   ├── completed-phases/
│   ├── rejected-work/
│   ├── historical-notes/
│   └── learning/
├── deliverables/
│   ├── phase-1/
│   ├── phase-2/
│   └── final/
└── supabase/
    └── migrations/
        └── 001_[description].sql
```

---

## New Default Feedback-Loop Files

### `LAUNCH_PLAN.md`
Required when the project produces something that ships, goes live, gets shared, or is handed to stakeholders.

Must include:
- launch/distribution plan
- owner
- audience/stakeholders
- launch date or window
- launch checklist
- success metrics to observe after launch

### `FEEDBACK_LOG.md`
Canonical running log for feedback gathered during and after launch.

Must include:
- feedback source
- date
- summary of feedback
- sentiment / severity
- action taken or owner assigned

### `POST_LAUNCH_LEARNING.md`
Required after launch or completion when real-world feedback or outcomes exist.

Must include:
- metrics observed
- user/stakeholder feedback summary
- unexpected outcomes
- what worked
- what did not work
- follow-up actions

---

## Standard Folders

### `/docs/`
Documentation, research, planning, architecture, and written supporting material.

**Recommended subfolders:**
- `research/` — external research, audits, discovery
- `planning/` — project plans, roadmaps, sequencing
- `architecture/` — system design, technical decisions
- `decisions/` — ADR-style notes, tradeoff logs

### `/phases/`
The canonical home for individual phase files.

Each major project phase gets its own file here.

### `/assets/`
Design files, images, screenshots, diagrams, references, and configuration artifacts.

**Recommended subfolders:**
- `references/` — inspiration, briefs, source images
- `screenshots/` — progress proofs, QA evidence, launch evidence
- `diagrams/` — flows, architecture visuals
- `configs/` — exported config examples, environment samples

### `/feedback/`
Structured home for raw and grouped feedback.

**Recommended subfolders:**
- `stakeholder/` — leadership/client/internal stakeholder notes
- `users/` — user reactions, support notes, interviews, comments
- `internal/` — team observations, round table inputs, internal QA findings

### `/code/`
Project-specific source code, scripts, prototypes, or implementation snippets when work belongs with the task folder.

### `/archive/`
Completed phases, historical artifacts, superseded drafts, rejected work, and learning artifacts that should remain available but not clutter active work.

### `/deliverables/`
Final outputs organized by phase or milestone.

### `/supabase/`
Database migrations and project-specific database artifacts when relevant.

---

## Standard Files

### `README.md`
Primary project overview.

Should include:
- project name and ID
- current status
- lead / owner
- summary of goal
- phase list with statuses
- active blockers
- important links
- where to find final deliverables
- where to find launch, feedback, and learning artifacts

### `BRIEF.md`
The original project brief.

Should include:
- project objective
- scope
- constraints
- assumptions
- success criteria
- assigned agents
- references

### `PHASES.md`
Master tracker of all phases and current status.

### `ARCHIVE_INDEX.md`
Index of completed and archived work.

Should include:
- completed phases with dates
- links to archived deliverables
- summaries of what shipped
- links to learning artifacts
- notes on missing or deferred artifacts

### `LAUNCH_PLAN.md`
Plan for how the work reaches its intended audience or environment.

### `FEEDBACK_LOG.md`
Running record of stakeholder/user/internal feedback.

### `POST_LAUNCH_LEARNING.md`
Post-launch synthesis of results and learnings.

---

## Required New Template Fields for All New Projects

Every new project brief or README should explicitly include:
- **Launch / Distribution Plan**
- **Feedback Collection Method**
- **Post-Launch Learning Capture**

### Standard Definitions

#### Launch / Distribution Plan
How the output will be deployed, shared, announced, or delivered.

#### Feedback Collection Method
How user/stakeholder/internal feedback will be gathered, stored, and reviewed.
Examples:
- direct stakeholder review
- support tickets
- screenshots/comments
- analytics + manual notes
- post-launch retrospective

#### Post-Launch Learning Capture
How results and learnings will be synthesized after release.
Examples:
- learning memo after 7 days
- stakeholder debrief
- analytics review after launch window
- round table summary

---

## Feedback Collection Templates

## `FEEDBACK_LOG.md` Template

```markdown
# Feedback Log

| Date | Source | Audience Type | Feedback Summary | Severity | Owner | Action / Next Step |
|------|--------|---------------|------------------|----------|-------|--------------------|
| YYYY-MM-DD | [name/channel] | User | [summary] | High | Vale | [action] |
```

## `LAUNCH_PLAN.md` Template

```markdown
# Launch Plan

**Project:** [name]
**Owner:** [name]
**Launch Window:** [date]

## Audience
- [who this is for]

## Distribution / Delivery Plan
- [step 1]
- [step 2]
- [step 3]

## Success Metrics
- [metric 1]
- [metric 2]
- [metric 3]

## Launch Checklist
- [ ] final review approved
- [ ] assets ready
- [ ] delivery path confirmed
- [ ] feedback capture ready
```

## `POST_LAUNCH_LEARNING.md` Template

```markdown
# Post-Launch Learning

## Metrics Observed
- [metric]

## Feedback Summary
- [what users/stakeholders said]

## Unexpected Outcomes
- [surprise 1]

## What Worked
- [item 1]

## What Didn't Work
- [item 1]

## Follow-Up Actions
- [action + owner]
```

---

## Integration with Archive Process

Before a project is archived:
- `ARCHIVE_INDEX.md` must link to `LAUNCH_PLAN.md` if applicable
- `ARCHIVE_INDEX.md` must link to `FEEDBACK_LOG.md`
- `ARCHIVE_INDEX.md` must link to `POST_LAUNCH_LEARNING.md`
- any major lessons should be added to `ORGANIZATIONAL_KNOWLEDGE_INDEX.md`

A project is not fully closed until outputs and learnings are both preserved.

---

## Recommended New Project Bootstrap

When starting a new project:

1. Create folder in `/tasks/[PROJECT_ID]-[project-name]/`
2. Add these files immediately:
   - `README.md`
   - `BRIEF.md`
   - `PHASES.md`
   - `ARCHIVE_INDEX.md`
   - `LAUNCH_PLAN.md` (if launchable)
   - `FEEDBACK_LOG.md`
   - `POST_LAUNCH_LEARNING.md`
3. Create these folders:
   - `docs/`
   - `phases/`
   - `assets/`
   - `feedback/`
   - `archive/`
   - `deliverables/`
4. Add `code/` only if the task folder needs project-local code
5. Add `supabase/` only if the project includes database work
6. Register the project in `/TASKS_INDEX.md`

---

## Example: Copy-Paste Starter Structure

```text
tasks/013-example-project/
├── README.md
├── BRIEF.md
├── PHASES.md
├── ARCHIVE_INDEX.md
├── LAUNCH_PLAN.md
├── FEEDBACK_LOG.md
├── POST_LAUNCH_LEARNING.md
├── docs/
│   ├── research/
│   ├── planning/
│   └── decisions/
├── phases/
│   ├── PHASE_1_DISCOVERY.md
│   ├── PHASE_2_DESIGN.md
│   └── PHASE_3_IMPLEMENTATION.md
├── assets/
│   ├── references/
│   ├── screenshots/
│   └── diagrams/
├── feedback/
│   ├── stakeholder/
│   ├── users/
│   └── internal/
├── archive/
│   ├── completed-phases/
│   └── learning/
├── deliverables/
│   ├── phase-1/
│   ├── phase-2/
│   └── final/
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql
```

---

## Final Rule

If you create a new project, organize it correctly at the start.
Include the feedback loop at the start.
Do not wait until launch to figure out how learning will be captured.

That is the standard.
