# AUTONOMOUS_LOOP.md

**Atlas Autonomous Work Loop — Agent OS v3**
Prototype deployed: 2026-03-08 | Status: Live

---

## How the Loop Works

The Atlas autonomous loop is a 7-step cron-driven cycle that runs every 30 minutes. Each cycle:

```
1. Read active north star from Supabase (north_star table, is_active = true)
2. Set agent_status → "active" (upsert on agent_name)
3. Query open todos: assigned_agent = Atlas, archived_at IS NULL,
   status IN (pending, in_progress)
4. For each todo:
   a. PATCH status → in_progress
   b. Execute the task (acknowledge + write completion note)
   c. PATCH status → done, completed → true
   d. POST to agent_logs (status: completed, with north_star_id)
5. Set agent_status → "idle" (upsert)
6. POST to heartbeat_logs:
   - north_star_id: active north star
   - north_star_alignment: Aligned
   - confidence_score: 85
   - notes: cycle summary
7. POST to agent_costs (loop run cost is $0.00 — no LLM calls)
```

**Pause mechanism:** Set `ATLAS_DISABLED=1` in the environment before the cron fires,
or remove the crontab entry. The script checks this flag on startup and exits cleanly.

---

## Script Location

```
/home/clawd/.openclaw/workspace/agents/atlas-loop.sh
```

**Flags:**
- `./atlas-loop.sh`              — normal live run
- `./atlas-loop.sh --dry-run`    — prints all actions without writing to Supabase
- `ATLAS_DISABLED=1 ./atlas-loop.sh`  — graceful no-op (pause)

**Log file:** `/home/clawd/.openclaw/workspace/agents/atlas-loop.log`

---

## Cron Mechanism

**Two layers (belt + suspenders):**

### 1. System crontab (primary — always runs, no dependency on OpenClaw daemon)
```cron
*/30 * * * * /home/clawd/.openclaw/workspace/agents/atlas-loop.sh >> /home/clawd/.openclaw/workspace/agents/atlas-loop.log 2>&1
```
Runs as the `clawd` user every 30 minutes. Zero dependencies — just bash + curl.

### 2. OpenClaw cron (secondary — agent-aware, visible in dashboard)
```
Job ID: 0d6797bf-1748-4406-a34e-d2afec04963b
Name:   atlas-autonomous-loop
Every:  30 minutes
Mode:   isolated agent session
```
The OpenClaw cron fires an agent turn that calls the shell script. Provides visibility
in the OpenClaw cron dashboard and run history.

**Manage via CLI:**
```bash
openclaw cron list
openclaw cron disable atlas-autonomous-loop
openclaw cron enable atlas-autonomous-loop
openclaw cron rm atlas-autonomous-loop
openclaw cron run atlas-autonomous-loop   # trigger now for testing
openclaw cron runs                        # view run history
```

---

## Extending to Other Agents

To roll out this pattern to another agent (e.g. Bernard, Christopher):

### 1. Copy and adapt the script
```bash
cp agents/atlas-loop.sh agents/bernard-loop.sh
```
Edit these values:
- `AGENT_NAME="Bernard"` — used for agent_status, heartbeat_logs, agent_costs queries
- `MODEL_USED="bernard-loop/shell-v1"` — identifier for cost logs
- Step 4 execution logic — customize what the agent actually does per todo category

### 2. Make it executable
```bash
chmod +x agents/bernard-loop.sh
```

### 3. Add to system crontab
```bash
crontab -e
# Add: */30 * * * * /home/clawd/.openclaw/workspace/agents/bernard-loop.sh >> .../bernard-loop.log 2>&1
```

### 4. Register with OpenClaw cron
```bash
openclaw cron add \
  --name "bernard-autonomous-loop" \
  --description "Bernard Strategist autonomous loop" \
  --every 30m \
  --message "BERNARD_LOOP: Execute /home/clawd/.openclaw/workspace/agents/bernard-loop.sh" \
  --session isolated \
  --no-deliver \
  --light-context
```

### Key schema notes
| Table | Primary key / filter |
|-------|----------------------|
| `agent_status` | `agent_name` (upsert conflict) |
| `heartbeat_logs` | `id` (auto-generated, insert each cycle) |
| `agent_logs` | `id` (auto-generated, insert per task) |
| `agent_costs` | `id` (auto-generated, insert per session) |
| `todos` | `id`; filter by `assigned_agent` + `archived_at IS NULL` |
| `north_star` | filter `is_active = true` |

---

## How to Pause / Stop an Agent Loop

### Pause (temporary)
```bash
# Option 1: Disable the OpenClaw cron job
openclaw cron disable atlas-autonomous-loop

# Option 2: Set env var (if running via a wrapper)
export ATLAS_DISABLED=1

# Option 3: Comment out the crontab line
crontab -e  # comment out the atlas line
```

### Stop (permanent)
```bash
# Remove from OpenClaw cron
openclaw cron rm atlas-autonomous-loop

# Remove from system crontab
crontab -e  # delete the atlas line
```

### Resume
```bash
openclaw cron enable atlas-autonomous-loop
# or re-add crontab entry
```

---

## Test Results (2026-03-08)

| Check | Result |
|-------|--------|
| agent_status updated (active → idle) | ✅ |
| heartbeat_logs row written | ✅ |
| agent_costs row written | ✅ |
| North star read correctly | ✅ Come Alive [0153aecd] |
| Todo pickup (no todos in queue) | ✅ Graceful skip |
| Dry-run mode | ✅ |
| Cron registered | ✅ Both system + OpenClaw |

All 7 cycle steps completed end-to-end in ~1 second.

---

## Architecture Notes

- **No LLM calls in the loop script** — pure bash + curl. Cost is $0.00 per cycle.
- **Resilient fallback** — if north star API returns empty, falls back to hardcoded ID
- **Idempotent** — safe to run multiple times; upserts prevent duplicate agent_status rows
- **Extensible** — Step 4 execution block is the only thing that changes per agent specialty
- The loop is designed as a *pull* model: todos are assigned externally, Atlas picks them up
