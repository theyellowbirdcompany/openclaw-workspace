# MAP.md — Workspace Directory Structure

```
/home/clawd/.openclaw/workspace/
│
├── 📋 Root Docs (System & Coordination)
│   ├── AGENTS.md                    (startup sequence, logging gate, task rules)
│   ├── DELEGATION_SPEC.md           (routing authority)
│   ├── BULLETIN_BOARD.md            (live job queue)
│   ├── BRAND.md                     (brand guidelines)
│   ├── USER.md                      (Brett's profile & preferences)
│   ├── SOUL.md                      (workspace identity)
│   ├── TOOLS.md                     (local environment setup)
│   ├── IDENTITY.md                  (workspace identity config)
│   ├── STANDARDS.md                 (system standards)
│   └── HEARTBEAT.md                 (periodic task queue)
│
├── 📁 Agent Folders (Private Workspaces)
│   ├── Atlas/                       (ops & infrastructure)
│   │   ├── SOUL.md
│   │   ├── CONTEXT.md
│   │   └── [private work]
│   ├── Bernard/                     (strategy & review)
│   │   ├── SOUL.md
│   │   ├── CONTEXT.md
│   │   ├── BERNARD_REVIEW_PROTOCOL.md
│   │   └── [private work]
│   ├── Christopher/                 (research)
│   │   ├── SOUL.md
│   │   ├── CONTEXT.md
│   │   └── [private work]
│   ├── Claw/                        (orchestration)
│   │   ├── SOUL.md
│   │   ├── CONTEXT.md
│   │   ├── DEBUG_LOG.md
│   │   └── [private work]
│   ├── Devan/                       (builder)
│   │   ├── SOUL.md
│   │   ├── CONTEXT.md
│   │   └── [private work]
│   ├── Scribe/                      (communications)
│   │   ├── SOUL.md
│   │   ├── CONTEXT.md
│   │   └── [private work]
│   └── Vale/                        (growth & brand)
│       ├── SOUL.md
│       ├── CONTEXT.md
│       └── [private work]
│
├── 📂 projects/                     (Multi-agent & multi-session work)
│   └── {project-name}/
│       ├── PROJECT.md               (canonical source of truth)
│       └── deliverables/            (shipped artifacts)
│
├── 📚 docs/                         (Reference & Guides)
│   └── [deployment guides, references]
│
├── 💾 memory/                       (Continuity & Logs)
│   └── YYYY-MM-DD.md                (daily notes)
│
├── 🔧 bin/                          (Scripts & Tools)
│   └── [utility scripts]
│
├── 📋 templates/                    (Reusable Templates)
│   └── [template files]
│
└── 📦 archive/                      (Old Material)
    └── [deprecated/historical work]
```

---

**Quick Reference:**
- **Agent workspace:** `{AgentName}/` — private, never cross-read
- **Shared project work:** `projects/{project-name}/PROJECT.md` — canonical
- **Root files:** System & coordination docs only. No agent output.
- **Daily notes:** `memory/YYYY-MM-DD.md`
