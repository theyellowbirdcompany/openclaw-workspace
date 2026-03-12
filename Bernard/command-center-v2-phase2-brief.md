# Command Center V2 — Phase 2 Brief for Devan

**Assigned to:** Devan (Technical Builder)  
**Phase:** PHASE 2 — Task Queue + Activity Feed  
**Date:** 2026-03-11 18:35 PDT  
**Status:** PENDING (blocked by Phase 1 approval)

---

## Objective

Add live task tracking and agent activity monitoring to the Command Center.

**Builds on:** Phase 1 (Agent Grid must be approved first)

---

## Data Source Decision

**DECISION:** Parse `BULLETIN_BOARD.md` for task data (no Supabase tasks table exists)

**Rationale:**
- Verified: No `tasks` table in Supabase
- BULLETIN_BOARD.md is the source of truth for task status
- File is structured markdown with clear state sections
- Can poll file for updates (or use file watcher)

**Alternative considered:** Creating a Supabase tasks table
- **Rejected:** Adds complexity, requires migration, BULLETIN_BOARD.md already works

---

## Technical Specifications

### 1. Component: `TaskQueue`
**Location:** `src/components/TaskQueue.jsx`

**Purpose:** Display current tasks grouped by status

**Data Source:** Parse `/home/clawd/.openclaw/workspace/BULLETIN_BOARD.md`

**Task States to Display:**
1. **🔴 OPEN** — Unassigned tasks
2. **🟡 ASSIGNED** — Assigned but not started
3. **🟠 IN PROGRESS** — Actively being worked on
4. **🔵 REVIEW** — Awaiting review

**Do NOT display:** APPROVED, REJECTED, ARCHIVED (those are done)

**Layout:**
- Horizontal sections (one per status)
- Each section: Header + task cards
- Responsive: Stack vertically on mobile, 2x2 grid on desktop

**Task Card Format:**
```
[Status Icon] Task ID: Task Title
├─ Assignee: Agent Name
├─ Updated: X mins ago
└─ [View Details] button (optional for MVP)
```

**Styling:**
- Background: `bg-slate-800`
- Border: `border border-slate-700`
- Padding: `p-4`
- Status color accent: `border-l-4 border-l-[status-color]`
  - OPEN: `border-l-red-500`
  - ASSIGNED: `border-l-yellow-500`
  - IN PROGRESS: `border-l-orange-500`
  - REVIEW: `border-l-blue-500`

**Empty State:**
```
"No tasks currently [STATUS]"
```
(like current BULLETIN_BOARD.md shows)

---

### 2. Component: `ActivityFeed`
**Location:** `src/components/ActivityFeed.jsx`

**Purpose:** Chronological log of agent actions

**Data Source:** Supabase `agent_logs` table (real-time subscription)

**Display:**
- Reverse chronological (newest first)
- Max 50 entries (limit for performance)
- Scrollable container (`overflow-y-auto max-h-[600px]`)

**Log Entry Format:**
```
[Agent Color Dot] Agent Name: Log message
├─ Timestamp (relative: "2 mins ago")
```

**Agent Color Coding:**
- Use agent color from `constants.js`
- Display as left border or colored dot

**Example Entries:**
```
🎩 Claw: Delegated task #014 to Devan
├─ 2 minutes ago

🔧 Devan: Started working on Command Center Phase 1
├─ 15 minutes ago

🧠 Bernard: Reviewed task #013, marked APPROVED
├─ 1 hour ago
```

**Styling:**
- Background: `bg-slate-800`
- Border: `border border-slate-700`
- Each entry: `border-b border-slate-700/50 py-3 px-4`
- Hover: `hover:bg-slate-700/30`

**Real-time Updates:**
- Use Supabase subscription to `agent_logs` table
- Auto-scroll to top when new entry arrives (optional)
- Smooth fade-in animation for new entries (CSS transitions, NOT framer-motion)

---

### 3. File Parser Utility
**Location:** `src/lib/parseBulletinBoard.js`

**Purpose:** Extract task data from BULLETIN_BOARD.md

**Input:** Raw markdown file content (read from file system or fetch)

**Output:** Structured task data

```javascript
export function parseBulletinBoard(markdownContent) {
  return {
    open: [
      { id: '014', title: 'Task title', assignee: null, updated: '2026-03-11' }
    ],
    assigned: [...],
    inProgress: [...],
    review: [...]
  };
}
```

**Implementation Notes:**
- Use regex or markdown parser
- Extract task ID, title, assignee, timestamp
- Handle empty sections (return empty arrays)
- Robust error handling (don't crash if format changes)

**Fallback:** If parsing fails, show "Unable to load tasks" message

---

### 4. Data Fetching Hook
**Location:** `src/hooks/useBulletinBoard.js`

**Purpose:** Provide parsed bulletin board data to components

```javascript
export function useBulletinBoard() {
  const [tasks, setTasks] = useState({ open: [], assigned: [], inProgress: [], review: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch BULLETIN_BOARD.md from workspace
    // Parse with parseBulletinBoard()
    // Update state
    
    // Optional: Set up polling interval (every 30 seconds)
    const interval = setInterval(() => {
      // Re-fetch and parse
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return { tasks, loading, error };
}
```

**Fetching Strategy:**
Since we're in a local web app, options:
1. **Backend endpoint:** Create simple API endpoint to read file (recommended)
2. **Vite dev server:** Use Vite's file serving (dev only)
3. **Copy file to public/:** Not ideal (outdated data)

**Recommended:** Create a simple backend endpoint (can be lightweight Node.js server or Vite plugin)

**Alternative (simpler for MVP):** 
- Copy BULLETIN_BOARD.md to `public/` during build
- Fetch from `/BULLETIN_BOARD.md` at runtime
- Document that it requires manual copy/rebuild to update

---

### 5. Activity Logs Hook
**Location:** `src/hooks/useActivityLogs.js`

**Purpose:** Subscribe to `agent_logs` table in Supabase

```javascript
export function useActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch latest 50 logs
    supabase
      .from('agent_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => setLogs(data));
    
    // Subscribe to new inserts
    const subscription = supabase
      .channel('agent_logs_channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'agent_logs'
      }, (payload) => {
        setLogs(prev => [payload.new, ...prev].slice(0, 50));
      })
      .subscribe();
    
    return () => subscription.unsubscribe();
  }, []);
  
  return { logs, loading };
}
```

**Schema Assumption:**
```sql
agent_logs (
  id SERIAL PRIMARY KEY,
  agent_name TEXT,
  message TEXT,
  log_level TEXT,  -- 'info', 'warn', 'error'
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
)
```

**Verification:** Check if `agent_logs` table exists in Supabase before implementing

---

## App Layout Update

Update `App.jsx` to include new components:

```jsx
function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-800 px-8 py-6">
        <h1 className="text-3xl font-bold">Agent Command Center</h1>
        <p className="text-slate-400 mt-1">Real-time agent monitoring</p>
      </header>
      
      <StatusSummaryBar />
      
      <main className="p-8 space-y-8">
        <AgentStatusGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Task Queue</h2>
            <TaskQueue />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Activity Feed</h2>
            <ActivityFeed />
          </section>
        </div>
      </main>
    </div>
  );
}
```

**Responsive Behavior:**
- Desktop (≥1024px): Side-by-side (2 columns)
- Mobile (<1024px): Stacked (1 column)

---

## Quality Requirements

### MUST Have:
✅ TaskQueue shows all 4 task states (OPEN, ASSIGNED, IN PROGRESS, REVIEW)  
✅ ActivityFeed shows chronological logs (newest first)  
✅ Real-time updates for activity feed (Supabase subscription)  
✅ Task queue updates (polling or manual refresh)  
✅ Empty states for sections with no data  
✅ Max 50 log entries displayed  
✅ Scrollable activity feed  
✅ Build passes with no errors  
✅ Screenshot shows both components with real data  

### MUST NOT Have:
❌ NO framer-motion (CSS transitions only)  
❌ NO custom CSS files (Tailwind utilities only)  
❌ NO hardcoded task data (parse from BULLETIN_BOARD.md)  
❌ NO slow/laggy UI (optimize re-renders)  

### Code Quality:
- Clean component architecture
- Proper error handling
- Loading states
- Responsive layout
- < 500 lines of new code (total for Phase 2)

---

## Testing Checklist

Before submitting for review:

1. **Build Test:**
   ```bash
   npm run build
   ```
   - ✅ Build completes with no errors
   - ✅ Bundle still < 200KB

2. **TaskQueue Test:**
   - ✅ Displays tasks from BULLETIN_BOARD.md
   - ✅ Groups by status correctly
   - ✅ Shows empty state when section has no tasks
   - ✅ Task cards show ID, title, assignee

3. **ActivityFeed Test:**
   - ✅ Shows latest 50 logs from Supabase
   - ✅ Real-time updates when new log inserted
   - ✅ Color-coded by agent
   - ✅ Relative timestamps ("X mins ago")
   - ✅ Scrollable container

4. **Integration Test:**
   - ✅ Both components render alongside agent grid
   - ✅ Responsive layout works (desktop/mobile)
   - ✅ No console errors

5. **Screenshot:**
   - ✅ Full-page screenshot showing agent grid + task queue + activity feed
   - ✅ Clearly shows real data in all sections

---

## Bernard's Review Criteria

I (Bernard) will verify:

1. **Screenshot evidence:**
   - Do I see the task queue with sections for OPEN/ASSIGNED/IN PROGRESS/REVIEW?
   - Do I see the activity feed with chronological logs?
   - Are both components integrated cleanly with Phase 1?
   - Does the layout look professional (GitHub/Vercel dashboard style)?

2. **Functionality:**
   - Does TaskQueue show real data from BULLETIN_BOARD.md?
   - Does ActivityFeed show real logs from Supabase?
   - Do real-time updates work for activity feed?
   - Do empty states display correctly?

3. **Code quality:**
   - Are components well-structured?
   - Is the bulletin board parser robust?
   - Are hooks implemented correctly?
   - No prohibited libraries?

4. **Build:**
   - Does build pass?
   - Is bundle < 200KB?

**If ANY of these fail:** REJECTED with specific feedback. Iterate and resubmit.

**If ALL pass:** APPROVED for Phase 3.

---

## Phase Gate

**STOP CONDITION:** Do NOT proceed to Phase 3 until Bernard explicitly approves.

**Communication:**
- Message Brett on Telegram with screenshot when ready for review
- Wait for Bernard's APPROVE or REJECT decision
- If rejected, fix issues and resubmit

---

## Data Source Implementation Note

**For MVP (simplest approach):**

1. Copy BULLETIN_BOARD.md to `public/` during development
2. Fetch from `/BULLETIN_BOARD.md` in the browser
3. Parse in browser with `parseBulletinBoard()`
4. Document that updates require manual copy/rebuild

**For production (better approach):**

Create a lightweight backend API:
- Vite plugin to serve file content
- Simple Express server endpoint
- Serverless function (if deploying to Vercel)

**Decision:** Use MVP approach for Phase 2 (simplest), document limitation. Can enhance in Phase 3 if needed.

---

**Ready to start:** NO (blocked by Phase 1 approval)

**Next step:** Wait for Phase 1 approval from Bernard, then BEGIN PHASE 2.
