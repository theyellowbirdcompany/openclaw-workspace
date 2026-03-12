# OpenClaw Expertise — Claw's Learning Log

**Purpose:** Systematic study of OpenClaw documentation to become an expert troubleshooter and architect.

**Started:** 2026-03-10, 2:10 PM PDT

---

## Priority Learning Areas

### 1. Automation (CRITICAL — affects our current setup)
- [x] Cron vs Heartbeat ✅ (studied today)
- [ ] Cron Jobs (full reference)
- [ ] Heartbeat (configuration deep dive)
- [ ] Hooks
- [ ] Automation Troubleshooting

### 2. Agents (CRITICAL — multi-agent architecture)
- [ ] Multi-Agent Routing
- [ ] Agent Runtime
- [ ] Agent Loop
- [ ] Agent Workspace
- [ ] Sub-Agents tool

### 3. Gateway & Ops (CRITICAL — system administration)
- [ ] Configuration Reference (complete field-by-field)
- [ ] Gateway Protocol
- [ ] Troubleshooting
- [ ] Heartbeat configuration
- [ ] Session Management
- [ ] Compaction

### 4. Tools (CRITICAL — daily usage)
- [ ] Exec Tool
- [ ] Browser tool
- [ ] Skills
- [ ] Sessions tools (spawn/send/list)
- [ ] Tool Policy vs Sandbox

### 5. Channels
- [x] Telegram (operational)
- [ ] Discord (configured but not active)
- [ ] Channel Routing
- [ ] Group Messages

### 6. Models
- [ ] Model Providers
- [ ] Model Failover
- [ ] Model Configuration

---

## Key Learnings (Today)

### Cron vs Heartbeat Architecture

**Discovered:** We were using ISOLATED CRON JOBS when we should have been using HEARTBEATS.

**Root mistake:**
- Bernard's "cron job" ran in `cron:<jobId>` session (isolated, no context)
- Should have been heartbeat in main session with full context
- Cost difference: $2-5/day (cron) vs $0.01-0.05/day (heartbeat)

**Correct pattern:**
- ONE heartbeat (Bernard) checks BULLETIN_BOARD.md every 20 min
- Spawns agents on-demand when work exists
- Uses `HEARTBEAT_OK` when quiet (suppressed, no cost)
- Batches all monitoring into one turn

**Applied fix:**
- Removed isolated cron jobs (Bernard + Claw dispatcher)
- Configured Bernard's heartbeat properly
- Updated HEARTBEAT.md for master dispatch pattern

---

## Next Study Sessions

1. **Configuration Reference** — understand all openclaw.json fields
2. **Multi-Agent Routing** — how agent bindings/workspaces work
3. **Session Management** — session lifecycle, pruning, compaction
4. **Exec Tool** — background processes, PTY mode, approvals
5. **Skills System** — how skills integrate, when to create new ones

---

## Documentation URLs to Study

**Automation:**
- https://docs.openclaw.ai/automation/cron-jobs.md
- https://docs.openclaw.ai/automation/cron-vs-heartbeat.md ✅
- https://docs.openclaw.ai/gateway/heartbeat.md
- https://docs.openclaw.ai/automation/hooks.md

**Multi-Agent:**
- https://docs.openclaw.ai/concepts/multi-agent.md
- https://docs.openclaw.ai/tools/subagents.md
- https://docs.openclaw.ai/tools/agent-send.md
- https://docs.openclaw.ai/concepts/agent-workspace.md

**Configuration:**
- https://docs.openclaw.ai/gateway/configuration-reference.md
- https://docs.openclaw.ai/gateway/configuration.md
- https://docs.openclaw.ai/gateway/configuration-examples.md

---

*Updated after each major learning session*
