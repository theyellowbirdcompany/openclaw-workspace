# PIPELINE.md — Agent OS v3

Agent OS uses capability-based routing.

Core Pipeline Types:

1. Direct Execution
Claw → Single Capability Agent → Claw

2. Research → Execute
Claw → Researcher → Target Capability Agent → (Optional Strategist) → Claw

3. Cross-Domain Build
Claw → Sequential Capability Agents → Strategist → Claw

4. Systems Optimization
Claw → Ops → (Optional Strategist) → Claw

Only Strategist may delegate across multiple agents.
All agents must finalize lifecycle before returning.

---

## ⚠️ STANDARDS GATE — Every Agent Brief Must Include

When dispatching any task to an agent, the brief MUST contain:

```
STANDARDS GATE:
Before writing any code, config, or scripts:
1. Read STANDARDS.md in the workspace root
2. Frontend work: use constants from src/lib/constants.js — never define AGENT_META or AGENT_ROSTER locally
3. Supabase queries: use .maybeSingle() not .single()
4. Config changes: use openclaw config CLI, never direct file edits
5. Loop scripts: ensure usage comments reference the correct script name
6. No hardcoded UUIDs or fallback values — exit gracefully if data is missing
7. Run npm run build before pushing — zero errors required
8. Run openclaw config validate after any config changes
```

Claw must not accept agent output if the LIFECYCLE_CONFIRMATION block is missing
AND must not accept agent output if the work clearly violates any item above.
