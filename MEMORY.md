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
2026-03-06
Agent responsible: Claw
Summary of changes: Added user setup context, conversation history notes, and agent OS status.

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

# 13. Config Change Lessons

## Never edit openclaw.json directly while the service is running
- Direct file edits (sed, nano, VS Code) while OpenClaw is live cause config conflicts
- OpenClaw detects external changes and fails to reconcile them
- Always use the OpenClaw web UI or CLI for config changes
- If direct edits are necessary, restart the gateway after: `systemctl --user restart openclaw-gateway`

---

# 12. Agent OS v3 Status (as of 2026-03-06)

## IMPLEMENTATION COMPLETE ✅

### Agent Roster (Final Names)
- **Claw** (Orchestrator) — using claude-haiku-4-5
- **Bernard** (Strategist/Chief of Staff)
- **Christopher** (Research Intelligence)
- **Devan** (Technical Builder)
- **Vale** (Growth Strategist)
- **Scribe** (Communications Specialist)
- **Atlas** (Operations Manager)

### Concurrency & Delegation
- **Total concurrent**: 4 max
- **Claw to Bernard**: Sequential (1 per active task)
- **Bernard to specialists**: Max 2 concurrent subagents
- **Sequencing rule**: Research → Strategy → Execution (no parallel unless independent)

### Agent Behavior Definitions
- Full org doc: `docs/AGENT_ORGANIZATION.md`
- System prompts locked in for all agents
- Role boundaries documented
- Escalation protocol defined
- Output standards established

### Model Configuration (2026-03-06 Update)

**Primary Models:**
- **Claw** (Orchestrator): claude-haiku-4-5 | Fallback: claude-sonnet-4-6
- **Bernard** (Strategist): claude-sonnet-4-6 | Fallback: claude-opus-4-6
- **Christopher** (Researcher): gpt-5.2-chat-latest | Fallback: gpt-5.2-chat-latest
- **Devan** (Builder): claude-sonnet-4-6 (default) | Fallback: gpt-5.2-codex
- **Vale** (Growth): claude-sonnet-4-6 (default) | Fallback: gpt-5.2-chat-latest
- **Scribe** (Communicator): claude-haiku-4-5 | Fallback: gpt-4.1-mini
- **Atlas** (Ops): claude-haiku-4-5 | Fallback: o4-mini

**Rationale:**
- Sonnet for strategic work (Bernard, Devan): Highest quality for reasoning
- Chat for research (Christopher): OpenAI for web search capability
- Haiku for lightweight tasks (Claw, Scribe, Atlas): 60% token savings
- Codex as Devan fallback: Specialized for code execution if Sonnet unavailable

### Bernard's Intelligence
- Required to ask **before** delegating: "What is the actual goal? What information do we need first? What is the correct order?"
- Must break down complex requests into structured task plans
- Must review all outputs before returning to Claw
- Must synthesize specialist outputs into unified deliverables

### Legacy Archive
- Old agents archived to `_archive_legacy_2026_03_05/`