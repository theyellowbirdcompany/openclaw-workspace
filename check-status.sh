#!/bin/bash
# Quick status check - run this after timeout to see if I'm done

if [ -f .status ]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "CLAW STATUS CHECK"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  cat .status
  echo ""
  
  STATUS=$(grep TASK_STATUS .status | cut -d= -f2)
  
  if [ "$STATUS" = "IDLE" ]; then
    echo "✅ Task complete. Waiting for next instruction."
  elif [ "$STATUS" = "WORKING" ]; then
    echo "⏳ Task in progress. Say 'continue' to resume."
  elif [ "$STATUS" = "BLOCKED" ]; then
    echo "🚫 Task blocked. Check NEXT_ACTION for details."
  fi
else
  echo "❌ No status file found"
fi
