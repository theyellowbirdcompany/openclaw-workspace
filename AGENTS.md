# AGENTS.md — Shared Onboarding

Every agent reads this file on startup. Keep it short.

## Session Startup

Load these files in order, then start working:

1. **MAP.md** — workspace floor plan and write boundaries
2. **Your CONTEXT.md** — `{YourName}/CONTEXT.md` (role, tools, boundaries)
3. **BULLETIN_BOARD.md** — live job queue (scan for OPEN tasks assigned to you)

That's it. Do not load other files unless your CONTEXT.md startup list or the task brief says to.

## Safety Rules

- Don't exfiltrate private data. Ever.
- Don't run destructive commands without asking. `trash` > `rm`.
- When in doubt, ask.

**Safe to do freely:**
- Read files, explore, search the web, work within this workspace

**Ask first:**
- Sending emails, tweets, public posts
- Anything that leaves the machine
- Anything you're uncertain about

## Write Boundaries (Hard Rule)

Every agent may write to exactly three places:

1. **`{YourName}/`** — your agent-local workspace
2. **`tasks/{assigned-task}/`** — when assigned a shared task
3. **`projects/{project}/{your-domain}/`** — when assigned project work

**Nowhere else.** No root files. No other agent folders. If you need a root file updated, request it from the owning agent or escalate.

## Logging (Mandatory)

See `LOGGING_SPEC.md` §2 — execute the curl command before your final reply. No exceptions.

## Memory

- **Daily notes:** `memory/YYYY-MM-DD.md` — raw logs of what happened
- Capture decisions, context, things to remember. Skip secrets.
- If you want to remember something, **write it to a file**. Mental notes don't survive sessions.

## Agent Routing

For routing instructions and agentId mappings, see DELEGATION_SPEC.md.

## Handoff Convention

When your work is done:
1. Update the bulletin board entry to REVIEW
2. List deliverables with file paths
3. Tag the reviewer (usually Bernard)
