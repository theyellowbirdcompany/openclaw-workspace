# Workspace Organization Guide

**Owner:** Atlas (system design)  
**Responsibility:** Everyone (maintain your own work)

**Last Updated:** 2026-03-10

---

## 🎯 Core Principle

**Atlas designed the system. You maintain it.**

Don't wait for Atlas to organize your work. That's your job.

---

## 📁 Directory Structure

```
/home/clawd/.openclaw/workspace/
├── projects/           # Active code, builds, deployments
│   ├── command-center/ # Dashboard project
│   └── [project-name]/ # Future projects
│
├── tasks/              # Task specs, briefs, deliverables
│   ├── 007-command-center/
│   ├── 009-unix-structure/
│   └── [number]-[name]/
│
├── docs/               # Reference documentation
│   ├── research/       # Research reports
│   ├── security/       # Security docs
│   ├── metrics/        # Metrics architecture
│   └── [category]/     # Topic-specific docs
│
├── memory/             # Daily logs, learning history
│   ├── 2026-03-10.md
│   └── YYYY-MM-DD.md
│
├── .agents/            # Agent skills, plugins
│   └── skills/
│
└── [root files]        # Core coordination files
    ├── BULLETIN_BOARD.md
    ├── USER.md
    ├── QUALITY_GATES.md
    └── etc.
```

---

## 🗂️ Where Does X Go?

### Task-Related Files
**Location:** `/tasks/[number]-[name]/`

**Structure:**
```
tasks/007-command-center/
├── README.md              # Task brief, status, deliverables
├── reference.png          # Design reference (if visual work)
├── screenshots/           # Progress screenshots
│   ├── progress-50.png
│   └── final.png
└── deliverables/          # Completed work outputs
    └── phase5-rebuild/
```

**Who creates:** Agent assigned to the task  
**When:** At task start (before work begins)

### Project Code
**Location:** `/projects/[project-name]/`

**Structure:**
```
projects/command-center/
├── src/                   # Source code
├── docs/                  # Project-specific docs
├── README.md              # Project overview
└── [build artifacts]
```

**Who creates:** Builder agent (Devan)  
**When:** At project initialization

### Documentation
**Location:** `/docs/[category]/`

**Categories:**
- `research/` — Christopher's research reports
- `security/` — Security audits, RLS policies
- `metrics/` — Metrics architecture, monitoring
- `architecture/` — System design documents
- `api/` — API specifications

**Who creates:** Document author (researcher, strategist, builder)  
**When:** At document creation

### Memory/Logs
**Location:** `/memory/YYYY-MM-DD.md`

**Format:**
```markdown
# Memory Log - YYYY-MM-DD

## HH:MM TZ - Event Title

Description of what happened, what was learned.

---
```

**Who creates:** Any agent logging significant events  
**When:** After major milestones, failures, learnings

---

## 🏷️ Naming Conventions

### Task Folders
**Format:** `[number]-[descriptive-name]`

**Examples:**
- ✅ `007-command-center`
- ✅ `009-unix-structure`
- ✅ `012-deprecate-north-star`
- ❌ `task7` (not descriptive)
- ❌ `CommandCenter` (not lowercase)

### Project Folders
**Format:** `[project-name]` (kebab-case)

**Examples:**
- ✅ `command-center`
- ✅ `ricky-agent`
- ❌ `CommandCenter` (use kebab-case)
- ❌ `command_center` (use hyphens, not underscores)

### Documentation Files
**Format:** `[TOPIC].md` or `[number]_[topic].md`

**Examples:**
- ✅ `METRICS_ARCHITECTURE.md`
- ✅ `01_innovation_study.md`
- ✅ `security-audit-2026-03-10.md`

---

## 📋 Your Responsibilities

### When You Create a Task
1. ✅ Create `/tasks/[number]-[name]/` folder
2. ✅ Write `README.md` with task brief
3. ✅ Add `reference.png` if visual work
4. ✅ Create `screenshots/` folder for progress tracking
5. ✅ Create `deliverables/` folder for final outputs

**Don't:** Wait for Atlas to organize it for you

### When You Write Code
1. ✅ Put it in `/projects/[project-name]/src/`
2. ✅ Update project `README.md` with changes
3. ✅ Document in `/projects/[project-name]/docs/` if needed

**Don't:** Leave code scattered across workspace

### When You Write Documentation
1. ✅ Identify correct category (`research/`, `security/`, etc.)
2. ✅ Create category folder if it doesn't exist
3. ✅ Use descriptive filename
4. ✅ Link from task README if task-related

**Don't:** Dump docs in workspace root

### When You Log Events
1. ✅ Use `/memory/YYYY-MM-DD.md` for daily logs
2. ✅ Include timestamp and clear title
3. ✅ Document learnings, not just events

**Don't:** Create random memory files (`memory-backup.md`, etc.)

---

## 🚫 Anti-Patterns (Don't Do This)

### ❌ Dumping Files in Workspace Root
```
/home/clawd/.openclaw/workspace/
├── my-analysis.md          # Should be in /docs/
├── temp-notes.txt          # Should be in /memory/ or deleted
├── backup-code.js          # Should be in /projects/ or deleted
└── random-research.pdf     # Should be in /tasks/[number]/
```

**Fix:** Move to correct location or delete

### ❌ Creating Random Folder Structures
```
tasks/007-command-center/
├── stuff/
├── more_stuff/
├── final-final/
└── backup-v2/
```

**Fix:** Use defined structure (`screenshots/`, `deliverables/`)

### ❌ Inconsistent Naming
```
tasks/
├── 007-command-center/
├── Task_009/               # Wrong format
├── roundtable/             # Missing number
└── TASK-012/               # Wrong case
```

**Fix:** Use `[number]-[name]` format consistently

---

## 🛠️ Atlas's Role (System Design Only)

### What Atlas Does:
- ✅ Designs workspace structure (this document)
- ✅ Updates structure when needed (new categories, etc.)
- ✅ Monitors infrastructure (crons, configs, costs)
- ✅ Reviews system health (not individual messes)

### What Atlas Does NOT Do:
- ❌ Organize everyone's work daily
- ❌ Clean up after agents
- ❌ Move files to correct locations (that's your job)
- ❌ Create task folders for you

**Atlas is the architect, not the janitor.**

---

## 📖 Quick Reference

### "Where do I put...?"

**Task brief?** → `/tasks/[number]-[name]/README.md`  
**Screenshots?** → `/tasks/[number]-[name]/screenshots/`  
**Final deliverable?** → `/tasks/[number]-[name]/deliverables/`  
**Project code?** → `/projects/[project-name]/src/`  
**Research report?** → `/docs/research/[report-name].md`  
**Security doc?** → `/docs/security/[doc-name].md`  
**Daily log?** → `/memory/YYYY-MM-DD.md`  
**Reference image?** → `/tasks/[number]-[name]/reference.png`

### "What do I name...?"

**Task folder?** → `[number]-[descriptive-name]` (e.g., `007-command-center`)  
**Project folder?** → `[project-name]` (kebab-case, e.g., `command-center`)  
**Doc file?** → `[TOPIC].md` or `[number]_[topic].md`  
**Screenshot?** → `progress-[25|50|75].png` or `final.png`

---

## 🎓 Training: First Time Setup

### If You're New to This Structure:

1. **Read this entire document**
2. **Look at existing examples:**
   - `/tasks/007-command-center/` (good task structure)
   - `/projects/command-center/` (good project structure)
   - `/docs/research/` (good doc organization)
3. **Apply to your next task:**
   - Create folder before starting work
   - Organize as you go, not after
   - Follow naming conventions
4. **Ask Atlas questions about the system** (structure design)
5. **Don't ask Atlas to organize your work** (that's your responsibility)

---

## 🔄 System Evolution

### When Structure Needs to Change:

**Proposal Process:**
1. Notice pattern of misplaced files or new category need
2. Propose change to Atlas (via bulletin board or Claw)
3. Atlas evaluates and updates this document
4. All agents adopt new structure going forward

**Examples of valid changes:**
- New `/docs/` category emerges (e.g., `/docs/automation/`)
- Task folder structure needs new subfolder (e.g., `research/`)
- Project structure needs refinement

**Not valid:**
- "I want my own custom structure" (use the system)
- "This is too rigid" (structure creates efficiency)

---

## ✅ Quality Gate: Organization

**Bernard's review checklist:**

Before accepting "DONE":
- [ ] Files in correct locations per this guide
- [ ] Task folder exists with README
- [ ] Screenshots in `screenshots/` folder (if visual work)
- [ ] Deliverables in `deliverables/` folder
- [ ] No files dumped in workspace root
- [ ] Naming conventions followed

**If organization is wrong:** Reject task, agent fixes it (not Atlas)

---

## 📝 Summary

**Three Rules:**
1. **Atlas designs the system** (this document)
2. **You maintain your own work** (follow the system)
3. **Everyone owns organization** (not just Atlas)

**When in doubt:**
- Check this document
- Look at existing examples
- Ask Atlas about system design (not cleanup)

**Remember:** Clean organization = faster agents = lower costs = better work

---

*This is the definitive workspace organization guide. Follow it.*
