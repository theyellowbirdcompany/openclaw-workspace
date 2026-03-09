# STANDARDS.md — Code & Operations SOP

This is the single source of truth for how we build, test, and deploy in Agent OS v3.

All agents must follow these standards before submitting work. No exceptions.

---

## Frontend (React/JavaScript)

### Constants & Configuration
- **Single source of truth:** All repeated values (agent names, colors, emojis, roles) live in `src/lib/constants.js`
- **No local definitions:** Never define `AGENT_META`, `AGENT_ROSTER`, or config in component files
- **Import pattern:** Use absolute path from file depth:
  - From `src/pages/` or `src/hooks/`: `import { AGENT_ROSTER } from '../lib/constants'`
  - From `src/components/`: `import { AGENT_ROSTER } from '../lib/constants'`
  - From `src/components/queue/` or `src/components/office/`: `import { AGENT_ROSTER } from '../../lib/constants'`

### Supabase Queries
- **Always use `.maybeSingle()`** instead of `.single()` — prevents crashes on empty results
- **Introspect schema first:** Before writing queries, fetch live schema from OpenAPI endpoint
- **Select only needed columns** — avoid `select('*')`, specify exact fields
- **No duplicate fetches:** If data is already in a hook, use that hook don't re-fetch

### React Patterns
- **Event listener cleanup:** All `addEventListener()` must have matching `removeEventListener()` in cleanup
- **useEffect dependencies:** Array must be complete — no missing dependencies
- **Lazy load pages:** All route components use `React.lazy()` for code splitting

### Code Quality
- **No console.log** in production code (only `console.error` for actual errors)
- **No hardcoded UUIDs, URLs, or config** — use environment variables or constants
- **No commented-out code** — delete or commit it properly

---

## Backend & Shell Scripts

### Agent Loop Scripts
- **Script naming:** Follow pattern `{agent-name}-loop.sh` (lowercase, hyphens)
- **Correct usage comments:** Script must reference itself, not copy-pasted from other agents
  - ✅ `./claw-loop.sh --dry-run`
  - ❌ `./atlas-loop.sh --dry-run` (copy-paste error)
- **No hardcoded fallback UUIDs:** If north star not found, exit gracefully
  ```bash
  if [[ "$NS_ID" == "none" ]]; then
    log "WARNING: No active north star found — cannot execute without active north star. Exiting gracefully."
    exit 0
  fi
  ```
- **MODEL_USED must match config:** Check `openclaw.json` agents list before hardcoding model names

### Configuration Files
- **Edit via CLI, never direct file edit:** Use `openclaw config set` not `sed` or `nano`
- **Restart gateway after config changes:** `openclaw gateway restart`
- **Validate before pushing:** Run `openclaw config validate` and paste output in PR

### Logging & Rotation
- **Log files cap at 200KB:** Archive old logs to `logs-archive/` before pushing
- **Timestamp all entries:** Use ISO 8601 format `$(date -u +%Y-%m-%dT%H:%M:%SZ)`
- **No secrets in logs:** Never log API keys, tokens, or sensitive IDs

---

## Data & Schema

### Supabase
- **Schema is the source of truth:** Always introspect live schema before writing
  - Endpoint: `GET https://jcfsmpgugqqsasfrswyw.supabase.co/rest/v1/` with anon key
  - **Never assume column names** based on documentation or memory
- **RLS enforcement:** All agent writes use anon key, never service role key except Devan for DDL
- **north_star_id is required:** On every log entry when north star is active

### Discord Config
- **Remove ghost channels:** If channel is in config but doesn't exist in Discord, delete it
- **Add routing bindings:** Every agent channel must have a matching binding to its agent ID
- **Verify count matches:** Should have exactly 7 agent channels + routing rules

---

## Git & Deployment

### Commits
- **Clear messages:** Include impact + file count
  - ✅ `Phase 13b: Eliminate duplicate constants + Discord routing (10 files)`
  - ❌ `Fix stuff`
- **Squash before merge:** One commit per feature/fix
- **Only Claw and Devan push:** Others hand off to one of these two

### Code Review Checklist
Before pushing, verify:
- [ ] No duplicate constant definitions (search for `const AGENT_META`, `const AGENT_ROSTER`)
- [ ] All imports use correct relative paths for file depth
- [ ] No `.single()` on queries (use `.maybeSingle()`)
- [ ] Console.log removed (except console.error)
- [ ] No hardcoded UUIDs or fallback values
- [ ] Build passes: `npm run build` with no errors or warnings
- [ ] Git history is clean: `git log --oneline | head -5`

---

## Agent Dispatch Standards

When a task is assigned to an agent, the brief must include:

```
TASK: [Clear description]
DELIVERABLE: [What you're delivering]
STANDARDS: Review STANDARDS.md before starting
  - Dashboard work? Use constants from src/lib/constants.js
  - Backend work? Check LOGGING.md for schema + lifecycle rules
  - Config changes? Use openclaw config CLI, not direct edits
SIGN-OFF: This work passes code review checklist above
```

---

## Enforcement

- **Pre-push hook** (`.git/hooks/pre-push`) checks for:
  - Duplicate `AGENT_META` definitions
  - Duplicate `AGENT_ROSTER` definitions
  - `.single()` calls in dashboard code
  - Hardcoded UUIDs
  - Build failures
- **CI/CD gate:** Vercel deployment blocks on build errors
- **Config validation:** openclaw rejects invalid config files at gateway startup

---

## When in Doubt

1. Read this file
2. Check the relevant section in LOGGING.md
3. Look at recent commits (git log) for patterns
4. Ask Claw before deviating — document the exception here

---

**Last Updated:** 2026-03-09 | **Version:** 1.0
