# MAP.md — Workspace Floor Plan

## 1) Workspace layout
- **Repo root** = shared operating surface: core docs, system specs, bulletin board, indexes, and active project-wide files.
- **`BULLETIN_BOARD.md`** (root) = central job queue.
- **`tasks/`** = shared task folders for cross-system work.
- **Agent folders** (for example `Bernard/`) = agent-local workspace and outputs.
- **`projects/`** = project code/docs grouped by product.
- **`docs/`** = research and reference docs.
- **`memory/`** = dated continuity notes.
- **`archive/`** and `tasks/archive/` = old material; not the default read path.
- Treat root as the index layer; go deeper only when the task points there.

## 2) Critical document chain
Read in this order when orienting:
1. **`MAP.md`** — where things live
2. **`SOUL.md`** — role/persona boundary
3. **`USER.md`** — Brett’s preferences and standards
4. **`DELEGATION_SPEC.md`** — routing, ownership, escalation
5. **`LOGGING_SPEC.md`** — final logging requirement

`MAP.md` is the floor plan. `DELEGATION_SPEC.md` and `LOGGING_SPEC.md` are referenced here on purpose; do not duplicate their contents.

## 3) Agent workspace pattern
- The system has **6 specialist agent workspaces** plus **Claw** as orchestrator.
- Expected agent pattern: one top-level folder per agent, with local files, outputs, and often a `tasks/` subfolder.
- Example present now: `Bernard/` → agent-local deliverables and `Bernard/tasks/...`.
- **Agent workspaces:**
  - Claw — no workspace folder yet (gap, orchestrator only)
  - Bernard — `Bernard/`
  - Christopher — `Christopher/`
  - Devan — `Devan/`
  - Vale — `Vale/`
  - Scribe — `Scribe/`
  - Atlas — `Atlas/`
- Each agent workspace follows the pattern: local files, outputs, and an optional `tasks/` subfolder for agent-local work. Refer to that agent's `SOUL.md` for their specific structure.
- **Claw gap:** Claw is the interface/orchestrator and currently has **no dedicated workspace folder**. Note it; do not resolve it here.

## 4) Task folder pattern
Standard task shape:
- **`BRIEF.md`** — what the task is
- **`PHASES.md`** — sequence / status of phases
- **`phases/`** — per-phase working files and outputs

Task folders usually live under:
- **`tasks/<task-id>-<slug>/`** for shared work
- **`<Agent>/tasks/<task-id>-<slug>/`** for agent-local work

If a task has one folder, this is the structure to expect first.

## 5) Naming conventions
- Use clear, literal names.
- **Root docs:** uppercase snake/caps style when they are canonical docs (example: `SOUL.md`, `USER.md`, `DELEGATION_SPEC.md`).
- **Task folders:** `NNN-short-slug` (example: `012-deprecate-north-star`).
- **Agent-local task folders:** same task-id + slug pattern inside that agent’s `tasks/` folder.
- **Subfolders:** lowercase, simple, descriptive (`tasks/`, `phases/`, `docs/`, `projects/`, `memory/`).
- Prefer referenceable names over clever names.

## 6) Superseded docs
- **`LOGGING.md` → `LOGGING_SPEC.md`**
- **`ROUTER.md` → `DELEGATION_SPEC.md`**

Use the spec versions as current authority. Older files may remain for reference or transition, but they are not the default source.
