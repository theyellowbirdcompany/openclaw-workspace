#!/bin/bash
# agent:bootstrap hook
# Injects last 3 completed designs as visual reference when design sessions start

set -euo pipefail

# Check if this is a design-related session (Devan or design keyword in task)
AGENT_ID="${AGENT_ID:-}"
TASK="${TASK:-}"

# Only run for Devan's sessions or design-related tasks
if [[ "$AGENT_ID" != "builder" ]] && [[ ! "$TASK" =~ design|interface|frontend|layout ]]; then
  exit 0
fi

WORKSPACE="/home/clawd/.openclaw/workspace"
MEMORY_FILE="/home/clawd/.openclaw/workspace/Devan/MEMORY.md"
INJECT_FILE="/tmp/openclaw-design-history-inject.md"

# Extract last 3 design post-mortems from Devan's MEMORY.md
if [[ -f "$MEMORY_FILE" ]]; then
  cat > "$INJECT_FILE" <<'EOF'
# Visual Reference: Recent Design Projects

The following are the 3 most recent design projects you completed. Use these as visual reference and pattern recognition for the current task.

EOF

  # Extract design post-mortems (sections starting with "## Design Post-Mortem")
  awk '
    /^## Design Post-Mortem/ { 
      in_section=1; 
      count++; 
      if (count > 3) exit;
    }
    in_section && /^## [^D]/ { in_section=0 }
    in_section { print }
  ' "$MEMORY_FILE" >> "$INJECT_FILE"

  # Append summary guidance
  cat >> "$INJECT_FILE" <<'EOF'

---

**How to use this reference:**
- Font pairings that worked (reuse when appropriate)
- Layout patterns that succeeded (repeat similar spatial logic)
- Motion timings that felt right (maintain consistency)
- Patterns to avoid (learn from past failures)

Do NOT copy designs directly. Use these as pattern recognition and taste calibration.
EOF

  # Inject into agent context
  # This assumes OpenClaw reads from stdin for bootstrap context injection
  cat "$INJECT_FILE"
  
  # Cleanup
  rm -f "$INJECT_FILE"
else
  # No memory file yet, skip injection
  exit 0
fi
