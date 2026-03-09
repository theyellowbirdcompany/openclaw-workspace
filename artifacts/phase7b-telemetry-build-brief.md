# Phase 7b — Telemetry Page Build Brief
**For:** Devan (Builder)
**From:** Bernard (Strategist)
**Date:** 2026-03-07
**North Star ID:** `1d07e8fa`

---

## Overview

Build a `/telemetry` route in the existing OpenClaw Dashboard (React + Vite + Tailwind). Three sections on one page. Match Command Center style exactly — same sidebar, same dark theme (slate-900 base), same typography conventions.

**Repo:** https://github.com/FrozenCorn2113/OpenClaw_Dashboard.git

---

## Schema (Verified via Live Supabase OpenAPI)

### `heartbeat_logs`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `agent_name` | text | |
| `current_task` | text | |
| `north_star_alignment` | text | Values: Aligned / Partial / Blocked / Idle |
| `confidence_score` | integer | 0–100 |
| `notes` | text | |
| `north_star_id` | uuid FK → north_star.id | |
| `created_at` | timestamptz | |
| `archived_at` | timestamptz | NULL = active |

### `agent_logs`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `agent_name` | text | |
| `task_description` | text | |
| `model_used` | text | |
| `tokens_used` | integer | |
| `cost_usd` | numeric | |
| `status` | text | completed / failed / running / pending |
| `north_star_id` | uuid FK | |
| `created_at` | timestamptz | |
| `archived_at` | timestamptz | NULL = active |

### `agent_status`
| Column | Type | Notes |
|---|---|---|
| `agent_name` | text PK | |
| `last_seen` | timestamptz | |
| `current_task` | text | |
| `status` | text | active / idle |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

---

## File Changes Required

### 1. Add nav item to `src/components/Sidebar.jsx`

Add one entry to the `NAV_ITEMS` array:

```js
{ to: '/telemetry', label: 'Telemetry', icon: '📡' },
```

Also update the footer `<p>` text from `Phase 7a · Command Center` to `Phase 7b · Telemetry`.

### 2. Add route to `src/App.jsx`

```jsx
import Telemetry from './pages/Telemetry'
// ...
<Route path="/telemetry" element={<Telemetry />} />
```

### 3. Create `src/pages/Telemetry.jsx`

The page file. Import three section components and render them. Match CommandCenter.jsx layout:

```jsx
import AlignmentGrid from '../components/AlignmentGrid'
import HeartbeatTimeline from '../components/HeartbeatTimeline'
import MissionTimeline from '../components/MissionTimeline'

export default function Telemetry() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Telemetry</h1>
        <p className="text-slate-400 text-sm mt-1">Agent alignment, heartbeats, and mission history</p>
      </div>
      <AlignmentGrid />
      <HeartbeatTimeline />
      <MissionTimeline />
    </div>
  )
}
```

### 4. Create `src/components/AlignmentGrid.jsx`

**Section 1 — Agent Alignment Grid**

```jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AGENT_ROSTER = [
  { name: 'Claw',        role: 'Orchestrator',  emoji: '🎩' },
  { name: 'Bernard',     role: 'Strategist',    emoji: '🧠' },
  { name: 'Christopher', role: 'Researcher',    emoji: '🔍' },
  { name: 'Devan',       role: 'Builder',       emoji: '🔧' },
  { name: 'Vale',        role: 'Growth',        emoji: '📈' },
  { name: 'Scribe',      role: 'Communicator',  emoji: '✍️' },
  { name: 'Atlas',       role: 'Ops',           emoji: '⚙️' },
]

const ALIGNMENT_STYLES = {
  Aligned: { badge: 'text-emerald-400 bg-emerald-900/30', bar: 'bg-emerald-500' },
  Partial: { badge: 'text-amber-400 bg-amber-900/30',    bar: 'bg-amber-500'   },
  Blocked: { badge: 'text-rose-400 bg-rose-900/30',      bar: 'bg-rose-500'    },
  Idle:    { badge: 'text-slate-400 bg-slate-700/50',    bar: 'bg-slate-500'   },
}

function alignmentStyle(value) {
  return ALIGNMENT_STYLES[value] || ALIGNMENT_STYLES.Idle
}

function timeAgo(ts) {
  if (!ts) return 'never'
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function AlignmentGrid() {
  const [heartbeats, setHeartbeats] = useState({})   // keyed by agent_name → latest heartbeat row
  const [agentStatus, setAgentStatus] = useState({}) // keyed by agent_name → agent_status row
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      // Fetch latest heartbeat per agent
      // Strategy: fetch all active rows ordered newest first, deduplicate in JS
      const { data: hbData } = await supabase
        .from('heartbeat_logs')
        .select('agent_name, north_star_alignment, confidence_score, created_at, current_task')
        .is('archived_at', null)
        .order('created_at', { ascending: false })
        .limit(100) // enough to get at least one per agent

      if (hbData) {
        const map = {}
        hbData.forEach(row => {
          if (!map[row.agent_name]) map[row.agent_name] = row // first = newest
        })
        setHeartbeats(map)
      }

      // Fetch agent_status for current_task
      const { data: statusData } = await supabase
        .from('agent_status')
        .select('agent_name, current_task, last_seen, status')

      if (statusData) {
        const map = {}
        statusData.forEach(row => { map[row.agent_name] = row })
        setAgentStatus(map)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <section className="mb-8">
      <h2 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-4">Agent Alignment</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {AGENT_ROSTER.map(agent => {
          const hb = heartbeats[agent.name]
          const st = agentStatus[agent.name]
          const alignment = hb?.north_star_alignment || null
          const confidence = hb?.confidence_score ?? null
          const styles = alignmentStyle(alignment)

          return (
            <div
              key={agent.name}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col gap-2 hover:border-slate-500 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-2xl">{agent.emoji}</span>
                {alignment ? (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles.badge}`}>
                    {alignment}
                  </span>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium text-slate-500 bg-slate-700/50">
                    No heartbeat
                  </span>
                )}
              </div>

              {/* Name + Role */}
              <div>
                <div className="font-bold text-white">{agent.name}</div>
                <div className="text-xs text-slate-400">{agent.role}</div>
              </div>

              {loading ? (
                <div className="h-3 bg-slate-700 rounded w-3/4 animate-pulse" />
              ) : (
                <>
                  {/* Confidence bar */}
                  {confidence !== null ? (
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Confidence</span>
                        <span>{confidence}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${styles.bar}`}
                          style={{ width: `${confidence}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="h-1.5 bg-slate-700 rounded-full" />
                  )}

                  {/* Current task from agent_status */}
                  <div className="text-xs text-slate-300 truncate" title={st?.current_task || ''}>
                    {st?.current_task || <span className="text-slate-600">No active task</span>}
                  </div>

                  {/* Last heartbeat */}
                  <div className="text-xs text-slate-500">
                    Heartbeat: {timeAgo(hb?.created_at)}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

### 5. Create `src/components/HeartbeatTimeline.jsx`

**Section 2 — Heartbeat Timeline**

```jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const ALIGNMENT_BADGE = {
  Aligned: 'text-emerald-400 bg-emerald-900/30',
  Partial: 'text-amber-400 bg-amber-900/30',
  Blocked: 'text-rose-400 bg-rose-900/30',
  Idle:    'text-slate-400 bg-slate-700/50',
}

function badgeStyle(value) {
  return ALIGNMENT_BADGE[value] || ALIGNMENT_BADGE.Idle
}

function timeAgo(ts) {
  if (!ts) return ''
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function HeartbeatTimeline() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchHeartbeats() {
      const { data, error } = await supabase
        .from('heartbeat_logs')
        .select('id, agent_name, north_star_alignment, confidence_score, notes, created_at')
        .is('archived_at', null)
        .order('created_at', { ascending: false })
        .limit(20)

      if (!error && data) setRows(data)
      setLoading(false)
    }

    fetchHeartbeats()
  }, [])

  return (
    <section className="mb-8">
      <h2 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-4">Heartbeat Timeline</h2>
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-slate-700 rounded animate-pulse" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="p-6 text-slate-500 text-sm">No heartbeats recorded yet.</div>
        ) : (
          <ul className="divide-y divide-slate-700">
            {rows.map(row => (
              <li key={row.id} className="px-5 py-3 flex items-start gap-4 hover:bg-slate-700/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-white text-sm">{row.agent_name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeStyle(row.north_star_alignment)}`}>
                      {row.north_star_alignment || 'Unknown'}
                    </span>
                    {row.confidence_score != null && (
                      <span className="text-xs text-slate-500">{row.confidence_score}%</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 truncate" title={row.notes || ''}>
                    {row.notes || <span className="text-slate-600">No notes</span>}
                  </p>
                </div>
                <div className="text-xs text-slate-500 shrink-0">{timeAgo(row.created_at)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
```

### 6. Create `src/components/MissionTimeline.jsx`

**Section 3 — Mission Timeline**

```jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const STATUS_STYLES = {
  completed: 'text-emerald-400 bg-emerald-900/30',
  failed:    'text-rose-400 bg-rose-900/30',
  running:   'text-amber-400 bg-amber-900/30',
  pending:   'text-slate-400 bg-slate-700/50',
}

function statusStyle(status) {
  return STATUS_STYLES[status?.toLowerCase()] || STATUS_STYLES.pending
}

function timeAgo(ts) {
  if (!ts) return ''
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function MissionTimeline() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('agent_logs')
        .select('id, agent_name, task_description, model_used, status, tokens_used, created_at')
        .is('archived_at', null)
        .order('created_at', { ascending: false })
        .limit(20)

      if (!error && data) setRows(data)
      setLoading(false)
    }

    fetchLogs()
  }, [])

  return (
    <section className="mb-8">
      <h2 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-4">Mission Timeline</h2>
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-slate-700 rounded animate-pulse" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="p-6 text-slate-500 text-sm">No mission logs yet.</div>
        ) : (
          <ul className="divide-y divide-slate-700">
            {rows.map(row => (
              <li key={row.id} className="px-5 py-3 flex items-start gap-4 hover:bg-slate-700/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-semibold text-white text-sm">{row.agent_name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle(row.status)}`}>
                      {row.status || 'unknown'}
                    </span>
                    {row.model_used && (
                      <span className="text-xs text-slate-500 font-mono truncate max-w-[160px]" title={row.model_used}>
                        {row.model_used.split('/').pop()}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 truncate" title={row.task_description || ''}>
                    {row.task_description || <span className="text-slate-600">No description</span>}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-slate-500">{timeAgo(row.created_at)}</div>
                  {row.tokens_used != null && row.tokens_used > 0 && (
                    <div className="text-xs text-slate-600">{row.tokens_used.toLocaleString()} tok</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
```

---

## Summary of All Files to Touch

| File | Action |
|---|---|
| `src/components/Sidebar.jsx` | Add Telemetry nav item + update footer version text |
| `src/App.jsx` | Add `/telemetry` route + import |
| `src/pages/Telemetry.jsx` | CREATE — page layout |
| `src/components/AlignmentGrid.jsx` | CREATE — Section 1 |
| `src/components/HeartbeatTimeline.jsx` | CREATE — Section 2 |
| `src/components/MissionTimeline.jsx` | CREATE — Section 3 |

**No new packages needed.** All queries use the existing `supabase` client from `../lib/supabase`.

---

## Exact Supabase Queries

```js
// Section 1 — AlignmentGrid: latest heartbeat per agent (deduplicated in JS)
supabase
  .from('heartbeat_logs')
  .select('agent_name, north_star_alignment, confidence_score, created_at, current_task')
  .is('archived_at', null)
  .order('created_at', { ascending: false })
  .limit(100)

// Section 1 — agent_status for current_task
supabase
  .from('agent_status')
  .select('agent_name, current_task, last_seen, status')

// Section 2 — HeartbeatTimeline
supabase
  .from('heartbeat_logs')
  .select('id, agent_name, north_star_alignment, confidence_score, notes, created_at')
  .is('archived_at', null)
  .order('created_at', { ascending: false })
  .limit(20)

// Section 3 — MissionTimeline
supabase
  .from('agent_logs')
  .select('id, agent_name, task_description, model_used, status, tokens_used, created_at')
  .is('archived_at', null)
  .order('created_at', { ascending: false })
  .limit(20)
```

---

## Design Notes

- All colors: **slate-900 background**, **slate-800 cards**, **slate-700 borders** — identical to Command Center
- Alignment badge colors: **emerald** (Aligned), **amber** (Partial), **rose** (Blocked), **slate** (Idle)
- Status badge colors: **emerald** (completed), **rose** (failed), **amber** (running), **slate** (pending)
- `timeAgo()` helper is self-contained in each component (same implementation as AgentGrid.jsx / ActivityFeed.jsx)
- Empty states: all sections show a text message, no null/undefined crashes
- Model names: truncate to last segment after `/` to keep width manageable
- `tokens_used`: only render if non-null AND > 0
- Loading skeletons: animate-pulse divs, same pattern as ActivityFeed.jsx

---

## Completion Criteria

- [ ] `/telemetry` route renders without errors
- [ ] Sidebar shows Telemetry nav item, active state works
- [ ] Section 1: 7 agent cards render, empty state shown for agents with no heartbeat data
- [ ] Section 2: Table renders with alignment badges; empty state if no rows
- [ ] Section 3: Table renders with status badges and model names; empty state if no rows
- [ ] No console errors, no broken layout when all 3 tables are empty
- [ ] Build passes (`npm run build`)

---

*Brief produced by Bernard — Phase 7b · 2026-03-07*
