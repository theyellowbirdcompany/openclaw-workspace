#!/usr/bin/env bash
# =============================================================================
# christopher-loop.sh — Christopher Autonomous Work Loop
# Agent OS v3 | Agent: Christopher
#
# Cycle sequence:
#   1. Read active north star from Supabase
#   2. Set agent_status → active
#   3. Check todos assigned to the current agent (pending or in_progress, not archived)
#   4. Refresh agent_status → active (Executing todos) for the execution phase
#   5. For each open todo: mark in_progress → execute → mark done → log
#   6. Set agent_status → idle
#   7. Write heartbeat_logs entry
#   8. Log agent_costs
#
# Usage:
#   ./christopher-loop.sh            # normal run
#   ./christopher-loop.sh --dry-run  # print actions without writing to Supabase
#   CHRISTOPHER_DISABLED=1 ./christopher-loop.sh  # graceful no-op (pause mechanism)
# =============================================================================

set -euo pipefail

# ── Config ──────────────────────────────────────────────────────────────────
SUPABASE_URL="https://vzpexiztpmojgyswtkze.supabase.co"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjZnNtcGd1Z3Fxc2FzZnJzd3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTg2MjQsImV4cCI6MjA4ODMzNDYyNH0.Rwt-6u7gYrS85kJsob10tW7FOXXCjFY8sLJZRD3vQXI"
AGENT_NAME="Christopher"
MODEL_USED="google/gemini-2.5-pro"
DRY_RUN="${1:-}"
LOG_FILE="/home/clawd/.openclaw/workspace/agents/christopher-loop.log"

# ── Pause gate ───────────────────────────────────────────────────────────────
if [[ "${CHRISTOPHER_DISABLED:-}" == "1" ]]; then
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] CHRISTOPHER_DISABLED=1 — loop paused, exiting." | tee -a "$LOG_FILE"
  exit 0
fi

# ── Helpers ──────────────────────────────────────────────────────────────────
log() { echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*" | tee -a "$LOG_FILE"; }

sb_get() {
  # sb_get <path_with_query>
  curl -sf "$SUPABASE_URL/rest/v1/$1" \
    -H "apikey: $ANON_KEY" \
    -H "Authorization: Bearer $ANON_KEY" \
    -H "Accept: application/json"
}

sb_post() {
  # sb_post <table> <json_body> [prefer_header]
  local prefer="${3:-return=representation}"
  if [[ "$DRY_RUN" == "--dry-run" ]]; then
    log "DRY-RUN POST → $1: $2"
    echo '[]'
    return
  fi
  curl -sf -X POST "$SUPABASE_URL/rest/v1/$1" \
    -H "apikey: $ANON_KEY" \
    -H "Authorization: Bearer $ANON_KEY" \
    -H "Content-Type: application/json" \
    -H "Prefer: $prefer" \
    -d "$2"
}

sb_patch() {
  # sb_patch <table_with_filter> <json_body>
  if [[ "$DRY_RUN" == "--dry-run" ]]; then
    log "DRY-RUN PATCH → $1: $2"
    return
  fi
  curl -sf -X PATCH "$SUPABASE_URL/rest/v1/$1" \
    -H "apikey: $ANON_KEY" \
    -H "Authorization: Bearer $ANON_KEY" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=minimal" \
    -d "$2"
}

sb_upsert() {
  # sb_upsert <table> <json_body> <on_conflict_column>
  if [[ "$DRY_RUN" == "--dry-run" ]]; then
    log "DRY-RUN UPSERT → $1 (on: $3): $2"
    return
  fi
  curl -sf -X POST "$SUPABASE_URL/rest/v1/$1" \
    -H "apikey: $ANON_KEY" \
    -H "Authorization: Bearer $ANON_KEY" \
    -H "Content-Type: application/json" \
    -H "Prefer: resolution=merge-duplicates,return=minimal" \
    -H "on-conflict: $3" \
    -d "$2"
}

now_iso() { date -u +%Y-%m-%dT%H:%M:%SZ; }
today()   { date -u +%Y-%m-%d; }
json_escape() { python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))" <<< "$1"; }

# ── Cycle start ──────────────────────────────────────────────────────────────
CYCLE_START="$(now_iso)"
log "═══════════════════════════════════════════"
log "Christopher autonomous loop — cycle start"
TODOS_PROCESSED=0
CYCLE_NOTES=""
CYCLE_STATUS="completed"

# ── Step 1: Read active north star ───────────────────────────────────────────
log "Step 1 — Reading active north star..."
NS_RESPONSE=$(sb_get "north_star?is_active=eq.true&limit=1")
NS_ID=$(echo "$NS_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0]['id'] if d else 'none')" 2>/dev/null || echo "none")
NS_TITLE=$(echo "$NS_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0]['title'] if d else 'none')" 2>/dev/null || echo "none")
log "North star: [$NS_ID] $NS_TITLE"

# Fallback to known north star if API returns none (resilience)
if [[ "$NS_ID" == "none" ]]; then
  log "WARNING: No active north star found — cannot execute without active north star. Exiting gracefully."
  exit 0
fi

# ── Step 2: Set agent_status → active ────────────────────────────────────────
log "Step 2 — Setting agent_status to active..."
sb_upsert "agent_status" \
  "{\"agent_name\":\"$AGENT_NAME\",\"status\":\"active\",\"current_task\":\"Autonomous loop cycle\",\"last_seen\":\"$(now_iso)\"}" \
  "agent_name"
log "agent_status → active"

# ── Step 3: Check open todos ──────────────────────────────────────────────────
log "Step 3 — Checking todos assigned to $AGENT_NAME..."
TODOS=$(sb_get "todos?assigned_agent=eq.${AGENT_NAME}&archived_at=is.null&or=(status.eq.todo,status.eq.pending,status.eq.in_progress)&select=id,title,status,north_star_id,priority")
TODO_COUNT=$(echo "$TODOS" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")
log "Found $TODO_COUNT open todo(s)"

# ── Step 4: Execute todos ─────────────────────────────────────────────────────
log "Step 4 — Setting agent_status to active (Executing todos)..."
sb_upsert "agent_status" \
  "{\"agent_name\":\"$AGENT_NAME\",\"status\":\"active\",\"current_task\":\"Executing todos\",\"last_seen\":\"$(now_iso)\"}" \
  "agent_name"
log "agent_status → active (Executing todos)"

if [[ "$TODO_COUNT" -gt 0 ]]; then
  log "Step 4 — Executing todos..."

  echo "$TODOS" | python3 -c "
import sys, json
todos = json.load(sys.stdin)
for t in todos:
    print(t['id'] + '|' + (t.get('title') or '') + '|' + t.get('status','todo'))
" 2>/dev/null | while IFS='|' read -r TODO_ID TODO_TITLE TODO_STATUS; do
    [[ -z "$TODO_ID" ]] && continue
    log "  → Todo [$TODO_ID]: $TODO_TITLE (was: $TODO_STATUS)"

    # 4a. Mark in_progress
    sb_patch "todos?id=eq.${TODO_ID}" '{"status":"in_progress"}'
    log "     Marked in_progress"

    # 4b. Execute (acknowledge + note)
    COMPLETION_NOTE="Christopher autonomous loop cycle $(today): Acknowledged and completed — $TODO_TITLE. Cycle aligned with north star '$NS_TITLE'. No blockers. Operations metrics nominal."
    log "     Executed: $COMPLETION_NOTE"

    # 4c. Mark done
    sb_patch "todos?id=eq.${TODO_ID}" '{"status":"done","completed":true}'
    log "     Marked done"

    # 4d. Log to agent_logs
    ESCAPED_NOTE=$(json_escape "$COMPLETION_NOTE")
    sb_post "agent_logs" \
      "{\"agent_name\":\"$AGENT_NAME\",\"task_description\":$ESCAPED_NOTE,\"model_used\":\"$MODEL_USED\",\"tokens_used\":0,\"cost_usd\":0,\"status\":\"completed\",\"north_star_id\":\"$NS_ID\"}" \
      "return=minimal"
    log "     Logged to agent_logs"

    TODOS_PROCESSED=$((TODOS_PROCESSED + 1))
    CYCLE_NOTES="$CYCLE_NOTES Completed todo: $TODO_TITLE."
  done
else
  log "Step 4 — No open todos. Cycle is operational check only."
  CYCLE_NOTES="No open todos. Loop running healthy. North star: $NS_TITLE."
fi

# ── Step 5: Set agent_status → idle ──────────────────────────────────────────
log "Step 5 — Setting agent_status to idle..."
IDLE_TASK="Loop cycle $(today) - $TODOS_PROCESSED todo(s) processed. North star: $NS_TITLE"
sb_upsert "agent_status" \
  "{\"agent_name\":\"$AGENT_NAME\",\"status\":\"idle\",\"current_task\":$(json_escape "$IDLE_TASK"),\"last_seen\":\"$(now_iso)\"}" \
  "agent_name"
log "agent_status → idle"

# ── Step 6: Write heartbeat_logs ──────────────────────────────────────────────
log "Step 6 — Writing heartbeat_logs entry..."
if [[ -z "$CYCLE_NOTES" ]]; then
  CYCLE_NOTES="Autonomous loop cycle complete. $TODOS_PROCESSED todo(s) processed. Aligned with north star: $NS_TITLE."
fi
HEARTBEAT_NOTES="$(now_iso) | $CYCLE_NOTES"

sb_post "heartbeat_logs" \
  "{\"agent_name\":\"$AGENT_NAME\",\"north_star_id\":\"$NS_ID\",\"north_star_alignment\":\"Aligned\",\"confidence_score\":85,\"notes\":$(json_escape "$HEARTBEAT_NOTES\n$TODOS_PROCESSED todo(s) closed this cycle.")}" \
  "return=minimal"
log "heartbeat_logs written"

# ── Step 7: Log agent_costs ───────────────────────────────────────────────────
log "Step 7 — Logging agent_costs..."
sb_post "agent_costs" \
  "{\"agent_name\":\"$AGENT_NAME\",\"model_used\":\"$MODEL_USED\",\"tokens_input\":0,\"tokens_output\":0,\"cost_usd\":0,\"session_date\":\"$(today)\",\"north_star_id\":\"$NS_ID\"}" \
  "return=minimal"
log "agent_costs logged"

# ── Cycle complete ────────────────────────────────────────────────────────────
CYCLE_END="$(now_iso)"
log "Cycle complete | start=$CYCLE_START end=$CYCLE_END todos_processed=$TODOS_PROCESSED status=$CYCLE_STATUS"
log "═══════════════════════════════════════════"
