 # OpenClaw Memory Core
This file stores long-term knowledge learned by the system.

Agents may append insights here when they detect durable patterns, repeated decisions, or confirmed project knowledge.

Rules:
- Never delete existing knowledge.
- Prefer updating summaries rather than duplicating information.
- Promote stable insights from daily logs (`memory/YYYY-MM-DD.md`) into this file.

---

# 1. System Identity
OpenClaw is an autonomous agent workspace that coordinates multiple specialized agents to execute software, research, and operational tasks.

Primary goals:
- Maintain persistent memory across sessions
- Coordinate agents through structured prompts
- Execute projects reliably without losing context

---

# 2. Active Projects
Agents should keep this section updated with **current initiatives**.

## Example
### WindowPilot
Status: Active development  
Goal: AI-powered window quoting system for exterior cleaning companies.

Key components:
- Photo-based pane detection
- Instant quote generation
- Embeddable website widget

---

# 3. Learned Patterns
Store recurring operational insights.

Example format:

### Prompt Engineering
Observation: Agents perform best when prompts include ROLE / TASK / FORMAT sections.

### Debugging
Observation: Most runtime issues originate from missing environment variables.

---

# 4. Known System Constraints
Record limitations discovered during operation.

Example:

- Linux environments may require manual service restarts.
- Node processes may fail silently if ports are already occupied.

---

# 5. Agent Capabilities Map
Agents should update this when learning new strengths.

Example:

Scout:
- strong web research
- competitor analysis
- market scanning

Bernard:
- codebase auditing
- architecture review

---

# 6. Stable Decisions
Record important project decisions so they are never forgotten.

Example:

Decision:
Use Supabase as primary database for all OpenClaw SaaS builds.

Reason:
Integrated auth + realtime + easy migrations.

---

# 7. Emerging Ideas
Ideas that appear repeatedly but are not yet finalized.

Example:

Idea:
Automated "project GPS" file that tracks development progress.

---

# 8. Promotion Queue
Agents can stage insights here before moving them to permanent sections.

Format:

- Insight
- Source
- Confidence
- Suggested destination section

---

# 9. Maintenance Protocol
Agents should periodically:

1. Scan daily memory logs
2. Promote repeated insights
3. Consolidate duplicate information
4. Update project statuses
5. Keep summaries concise

---

# 10. Last Consolidation
2026-03-09
Agent responsible: Claw
Summary of changes: Phase 2 complete. Full design entity architecture live — 8 layers operational.

### Major Accomplishments
1. Design convictions moved into Devan's SOUL.md (permanent character)
2. MEMORY.md with Command Center post-mortem (first design wisdom logged)
3. design-pipeline.lobster.yaml (deterministic workflows)
4. Claude Code integration (zero-cost orchestration)
5. HEARTBEAT.md watchdog (autonomous monitoring every 4 hours)
6. Hooks layer (agent:bootstrap + tool_result_persist)
7. CSS linter (real-time banned-property detection)
8. visual-diff-loop (autonomous convergence to 0.5% drift)

### The Complete Stack
- Opinions: SOUL.md design convictions
- Learning: MEMORY.md post-mortems
- Parallel Work: Lobster + Claude Code (zero tokens)
- Monitoring: HEARTBEAT.md + Pixelmatch
- Real-Time Correction: Hooks + CSS linter
- Self-Evolution: Ready for self-skill-writer integration

### Cost Model
- Orchestration: Claude Code (local, zero tokens)
- Creative Decisions: API models (only when quality matters)
- Visual QA: Pixelmatch + CDP (local, zero cost)

### Next Phase
All systems operational. Ready for production testing on real design project.

---

# 11. User & Setup Context

## Brett's Setup
- Brett communicates with Claw via Telegram from his personal Mac
- Claw runs on a **separate physical Linux machine** called `clawd-MacBookPro` (IP: 192.168.1.129)
- Files in `/home/clawd/.openclaw/workspace/` are on Claw's machine, NOT Brett's Mac
- Brett accesses Claw's machine via SSH or the OpenClaw browser UI
- To edit Claw's files, Brett must SSH in or ask Claw to write them directly

## Preferences
- Brett wants Claw to remember conversations across sessions
- Memory should be logged after meaningful discussions — not just template placeholders
- Brett prefers concise, direct communication — no filler
- Auto-compaction should trigger at 50% context window (prevents large context loss)
- Compaction mode: "default" with cache-ttl 1h

---

# 14. Phase 5 — Supabase Schema (2026-03-07)

## Status: LIVE ✅

**Project URL:** https://jcfsmpgugqqsasfrswyw.supabase.co
**Anon key:** stored in LOGGING.md (agent-accessible)
**Service role key:** Brett only, never stored in agent files

## Final Schema
- north_star
- agent_logs (+ run_id, archived_at)
- heartbeat_logs (+ archived_at)
- agent_costs (+ run_id)
- todos (+ run_id, archived_at)
- agent_status
- north_star_history

## Credential Policy
- Anon key → agents use this for all reads/writes (RLS enforced)
- Service role key → Brett only, DDL via Supabase SQL Editor

## Dashboard Build
Gated until schema was stable. Schema is now stable. Dashboard build is unblocked.

---

# 13. Config Change Lessons

## Never edit openclaw.json directly while the service is running
- Direct file edits (sed, nano, VS Code) while OpenClaw is live cause config conflicts
- OpenClaw detects external changes and fails to reconcile them
- Always use the OpenClaw web UI or CLI for config changes
- If direct edits are necessary, restart the gateway after: `systemctl --user restart openclaw-gateway`

---

# 12. Agent OS v3 Status (Compacted 2026-03-07)

## IMPLEMENTATION COMPLETE ✅

### Agent Roster
- **Claw** — Orchestrator
- **Bernard** — Strategist / Chief of Staff
- **Christopher** — Research Intelligence
- **Devan** — Technical Builder
- **Vale** — Growth Strategist
- **Scribe** — Communications Specialist
- **Atlas** — Operations Manager

### Workflow
Brett → Claw → Bernard → specialists → Bernard → Claw → Brett

### Model Assignments
- Models are assigned per-task and change frequently — do not hardcode model names here
- Check `openclaw.json` agents list for current assignments

### Team Standards
- Logging is the contract
- `north_star_id` is required on all entries
- Bernard reviews and signs off before specialist work returns upward
- Dashboard build begins in Phase 6

### Current Phase
- **Phase 5**: Complete
- **Phase 6**: Dashboard build next

### Legacy Archive
- Old agents archived to `_archive_legacy_2026_03_05/`