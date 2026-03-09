#!/bin/bash
# Self-Skill-Writer Heartbeat — Run periodically to auto-generate skills
# 
# Add to Devan's HEARTBEAT.md or cron for automatic pattern detection

set -e

SCRIPT="/home/clawd/.openclaw/workspace/self-skill-writer.js"
DEVAN_MEMORY="/home/clawd/.openclaw/workspaces/Devan/MEMORY.md"
LOG_FILE="/home/clawd/.openclaw/workspace/logs/self-skill-writer.log"

# Create log directory
mkdir -p "$(dirname "$LOG_FILE")"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Running self-skill-writer detection..." | tee -a "$LOG_FILE"

# Run detection
DETECTIONS=$(node "$SCRIPT" --detect 2>&1 || true)
echo "$DETECTIONS" >> "$LOG_FILE"

# Check if violations were found
if echo "$DETECTIONS" | grep -q "Found.*pattern"; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Violations detected. Generating skills..." >> "$LOG_FILE"
  
  # Run generation
  GENERATION=$(node "$SCRIPT" --generate 2>&1 || true)
  echo "$GENERATION" >> "$LOG_FILE"
  
  # Check if skills were created
  if echo "$GENERATION" | grep -q "Created.*skill"; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🤖 Self-skill-writer: New rules generated" >> "$LOG_FILE"
    
    # Log to Devan's MEMORY
    if [ -f "$DEVAN_MEMORY" ]; then
      {
        echo ""
        echo "## Self-Skill-Writer Execution — $(date '+%Y-%m-%d %H:%M:%S')"
        echo ""
        echo "Auto-generated new skills from detected patterns."
        echo ""
        echo "$GENERATION"
      } >> "$DEVAN_MEMORY"
    fi
  else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ All patterns already have skills" >> "$LOG_FILE"
  fi
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ No violations above threshold" >> "$LOG_FILE"
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Done." >> "$LOG_FILE"
