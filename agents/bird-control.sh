#!/bin/bash
# Bird Agent Control Script

BIRD_SCRIPT="/home/clawd/.openclaw/workspace/agents/bird.js"
PID_FILE="/tmp/bird-agent.pid"
LOG_FILE="/tmp/bird-agent.log"

case "$1" in
  start)
    if [ -f "$PID_FILE" ]; then
      PID=$(cat "$PID_FILE")
      if ps -p "$PID" > /dev/null 2>&1; then
        echo "Bird agent already running (PID: $PID)"
        exit 0
      fi
    fi
    
    echo "Starting Bird agent..."
    nohup node "$BIRD_SCRIPT" > "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
    echo "Bird agent started (PID: $(cat $PID_FILE))"
    echo "Log: $LOG_FILE"
    ;;
    
  stop)
    if [ ! -f "$PID_FILE" ]; then
      echo "Bird agent not running (no PID file)"
      exit 1
    fi
    
    PID=$(cat "$PID_FILE")
    if ps -p "$PID" > /dev/null 2>&1; then
      echo "Stopping Bird agent (PID: $PID)..."
      kill "$PID"
      rm "$PID_FILE"
      echo "Bird agent stopped"
    else
      echo "Bird agent not running (stale PID file)"
      rm "$PID_FILE"
    fi
    ;;
    
  status)
    if [ -f "$PID_FILE" ]; then
      PID=$(cat "$PID_FILE")
      if ps -p "$PID" > /dev/null 2>&1; then
        echo "Bird agent is running (PID: $PID)"
        echo "Log: tail -f $LOG_FILE"
        exit 0
      else
        echo "Bird agent not running (stale PID file)"
        exit 1
      fi
    else
      echo "Bird agent not running"
      exit 1
    fi
    ;;
    
  restart)
    $0 stop
    sleep 1
    $0 start
    ;;
    
  logs)
    tail -f "$LOG_FILE"
    ;;
    
  *)
    echo "Usage: $0 {start|stop|status|restart|logs}"
    exit 1
    ;;
esac
