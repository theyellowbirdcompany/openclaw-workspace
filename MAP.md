# MAP.md — Workspace Floor Plan

## 1) Workspace Layout

- **Root** = shared operating surface: core docs (~12 files), system specs, bulletin board.
- **`BULLETIN_BOARD.md`** = live job queue.
- **`tasks/`** = shared task folders for cross-system work.
- **Agent folders** (`Bernard/`, `Claw/`, etc.) = agent-local workspace and outputs.
- **`projects/`** = project code/docs grouped by product.
- **`docs/`** = reference material (board reference, deployment guides, etc.).
- **`memory/`** = dated continuity notes.
- **`bin/`** = scripts and tools.
- **`templates/`** = reusable templates for tasks, projects, sessions.
- **`archive/`** = old material; not the default read path.
- Treat root as the index layer; go deeper only when the task points there.

## 2) Critical Document Chain

Read in this order when orienting:
1. **`MAP.md`** — where things live (this file)
2. **`{YourName}/CONTEXT.md`** — your role, boundaries, tools
3. **`BULLETIN_BOARD.md`** — current work queue
4. **`DELEGATION_SPEC.md`** — routing, ownership, escalation (when needed)
5. **`LOGGING_SPEC.md`** — logging contract (when needed)

## 3) Agent Workspace Pattern

The system has **7 agents**: Claw (orchestrator) + 6 specialists.

| Agent | Folder | Role |
|-------|--------|------|
| Claw | `Claw/` | Orchestrator, user interface, system admin |
| Bernard | `Bernard/` | Strategist, planning, quality review |
| Christopher | `Christopher/` | Research, external intelligence |
| Devan | `Devan/` | Builder, code, implementation |
| Vale | `Vale/` | Growth, brand, distribution |
| Scribe | `Scribe/` | Communications, writing, content |
| Atlas | `Atlas/` | Ops, infrastructure, file organization |

Each agent has a `CONTEXT.md` (role, tools, boundaries) and an optional `tasks/` subfolder.

## 4) Task Folder Pattern

Standard task shape:
- **`BRIEF.md`** — what the task is
- **`PHASES.md`** — sequence / status
- **`phases/`** — per-phase working files

Task folders live under:
- **`tasks/<task-id>-<slug>/`** for shared work
- **`<Agent>/tasks/<task-id>-<slug>/`** for agent-local work

## 5) Naming Conventions

- **Root docs:** UPPERCASE (`SOUL.md`, `DELEGATION_SPEC.md`)
- **Task folders:** `NNN-short-slug` (`012-deprecate-north-star`)
- **Subfolders:** lowercase, descriptive (`tasks/`, `docs/`, `memory/`)

## 6) Superseded Docs

- `LOGGING.md` → `LOGGING_SPEC.md`
- `ROUTER.md` → `DELEGATION_SPEC.md`
- `PIPELINE.md` → `docs/EXECUTION_PIPELINE.md` + `DELEGATION_SPEC.md`

## 7) Write Boundaries (Hard Rule)

Every agent writes to exactly three places:

1. **`{AgentName}/`** — agent-local workspace
2. **`tasks/{assigned-task}/`** — when working a shared task
3. **`projects/{project}/{domain}/`** — when assigned project work

**No root files. No other agent folders.** Root doc updates go through the owning agent or escalation.

## 8) Project Container Pattern

New projects follow `templates/PROJECT.md`:

```
projects/{project-name}/
  research/      ← Christopher
  src/           ← Devan
  content/       ← Scribe
  brand/         ← Vale
  ops/           ← Atlas
  deliverables/  ← final shipped artifacts
```

Each agent writes only to their domain subfolder within a project.
