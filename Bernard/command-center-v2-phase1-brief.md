# Command Center V2 — Phase 1 Brief for Devan

**Assigned to:** Devan (Technical Builder)  
**Phase:** PHASE 1 — Agent Grid  
**Date:** 2026-03-11 18:35 PDT  
**Status:** READY TO START (pending GitHub/Vercel from Atlas)

---

## Objective

Build a clean, production-grade Agent Status Grid showing all 7 agents in real-time.

**Reference style:** GitHub Actions dashboard / Vercel deployment status  
**NOT:** Isometric offices, 3D, space stations, or illustration backgrounds

---

## Technical Specifications

### 1. Component: `AgentStatusGrid`
**Location:** `src/components/AgentStatusGrid.jsx`

**Layout:**
- CSS Grid responsive layout:
  - Desktop (≥1024px): 3 columns
  - Tablet (768px-1023px): 2 columns  
  - Mobile (<768px): 1 column
- Gap between cards: 1rem (Tailwind `gap-4`)
- Background: Dark navy (`bg-slate-900`)

**Agent Card Requirements:**
Each card MUST display:
1. **Agent Name** (from constants.js) — Large, bold
2. **Role/Title** (from constants.js) — Smaller, muted
3. **Status Indicator** — Colored dot:
   - 🟢 Green (`bg-green-500`): status = 'active'
   - ⚪ Gray (`bg-gray-400`): status = 'idle'  
   - 🔴 Red (`bg-red-500`): status = 'error'
4. **Current Task** (from Supabase `current_task` field)
   - If null/empty: "No active task"
   - Truncate long tasks with ellipsis
5. **Last Seen** (from Supabase `last_seen` timestamp)
   - Format: "X mins ago" or "Just now"
   - Use relative time formatting

**Card Styling:**
- Background: `bg-slate-800`
- Border: `border border-slate-700`
- Rounded corners: `rounded-lg`
- Padding: `p-6`
- Hover effect: `hover:border-slate-600 transition-colors`

**Agent Color Coding:**
- Each agent has a brand color (defined in constants.js)
- Use color as left border accent: `border-l-4 border-l-[agent-color]`
- Or as emoji/icon background color

**Data Source:**
- Use `useOfficeData` hook (already exists in `src/hooks/useOfficeData.js`)
- This hook provides real-time Supabase data via subscription
- Map agent metadata from `constants.js` to Supabase data

---

### 2. Component: `StatusSummaryBar`
**Location:** `src/components/StatusSummaryBar.jsx`

**Position:** Top of page, above agent grid

**Display Stats:**
1. **Total Agents:** Count (should always be 7)
2. **Active:** Count of agents with status = 'active' (green dot count)
3. **Idle:** Count of agents with status = 'idle' (gray dot count)
4. **Errors:** Count of agents with status = 'error' (red dot count)
5. **Tasks in Progress:** Count of agents with non-null `current_task`

**Layout:**
- Horizontal flex layout: `flex justify-between items-center`
- Background: `bg-slate-800`
- Border: `border-b border-slate-700`
- Padding: `px-8 py-4`

**Stat Item Format:**
```
[Icon] Label: Number
```
Example:
```
👥 Total: 7    ✅ Active: 2    ⏸️  Idle: 5    ❌ Errors: 0    📋 Tasks: 3
```

**Styling:**
- Each stat: `flex items-center gap-2`
- Label: `text-slate-400`
- Number: `text-white font-semibold`

---

## File Structure

Create these files:
```
src/
├── components/
│   ├── AgentStatusGrid.jsx      # Main grid component
│   ├── AgentCard.jsx            # Individual agent card
│   └── StatusSummaryBar.jsx     # Top stats bar
├── hooks/
│   └── useOfficeData.js         # ✅ Already exists
├── lib/
│   ├── constants.js             # ✅ Already exists (agent roster)
│   └── supabase.js              # ✅ Already exists (Supabase client)
├── App.jsx                      # Update to render StatusSummaryBar + Grid
└── index.css                    # ✅ Already has Tailwind directives
```

---

## App.jsx Structure

Replace default Vite template with:

```jsx
import { AgentStatusGrid } from './components/AgentStatusGrid';
import { StatusSummaryBar } from './components/StatusSummaryBar';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-800 px-8 py-6">
        <h1 className="text-3xl font-bold">Agent Command Center</h1>
        <p className="text-slate-400 mt-1">Real-time agent monitoring</p>
      </header>
      
      <StatusSummaryBar />
      
      <main className="p-8">
        <AgentStatusGrid />
      </main>
    </div>
  );
}

export default App;
```

---

## Data Hook Usage

The `useOfficeData` hook provides:

```javascript
const {
  agents,        // Array of agent objects from Supabase
  loading,       // Boolean: true while fetching initial data
  error          // Error object if fetch fails
} = useOfficeData();
```

**Agent object structure** (from Supabase):
```javascript
{
  agent_name: "Claw",
  status: "active",              // 'active' | 'idle' | 'error'
  current_task: "Processing...", // string or null
  last_seen: "2026-03-11T18:30:00Z", // ISO timestamp
  created_at: "...",
  updated_at: "..."
}
```

**Constants.js provides:**
```javascript
export const AGENT_ROSTER = [
  {
    name: 'Claw',
    role: 'Orchestrator',
    emoji: '🎩',
    color: '#3b82f6',  // blue-500
  },
  // ... 6 more agents
];
```

**Map data:** Merge Supabase real-time data with static metadata from constants.

---

## Quality Requirements

### MUST Have:
✅ All 7 agents displayed (not 1, not 3, exactly 7)  
✅ Real-time updates (use `useOfficeData` hook, which has Supabase subscription)  
✅ Responsive grid (3-col desktop / 2-col tablet / 1-col mobile)  
✅ Status dots colored correctly (green/gray/red)  
✅ Build passes: `npm run build` with NO errors  
✅ Screenshot proof showing all 7 cards with real data  

### MUST NOT Have:
❌ NO Three.js, p5, or any 3D libraries  
❌ NO framer-motion (CSS transitions are fine)  
❌ NO isometric office floor plan  
❌ NO background images from reference image  
❌ NO inline styles (Tailwind utility classes only)  
❌ NO custom CSS files (use Tailwind)  

### Code Quality:
- Total new code < 500 lines
- Clean component structure
- Proper React hooks usage
- No console errors in browser
- Accessible (semantic HTML, proper ARIA labels)

---

## Testing Checklist

Before submitting for review:

1. **Build Test:**
   ```bash
   cd /home/clawd/.openclaw/workspace/projects/command-center-v2
   npm run build
   ```
   - ✅ Build completes with no errors
   - ✅ Bundle size < 200KB

2. **Visual Test (local dev server):**
   ```bash
   npm run dev
   ```
   - ✅ All 7 agent cards render
   - ✅ Status dots show correct colors
   - ✅ Current tasks display (or "No active task")
   - ✅ Last seen timestamps show relative time
   - ✅ Summary bar shows correct counts
   - ✅ Responsive layout works (test in browser DevTools)

3. **Data Test:**
   - ✅ Cards show real data from Supabase (not hardcoded)
   - ✅ Real-time updates work (change agent status in Supabase, verify card updates)

4. **Screenshot:**
   - ✅ Take full-page screenshot showing all 7 cards
   - ✅ Screenshot clearly shows: agent names, roles, status dots, tasks, summary bar

---

## Bernard's Review Criteria

I (Bernard) will verify:

1. **Screenshot evidence:**
   - Do I see exactly 7 agent cards?
   - Do status dots match Supabase data?
   - Is the layout clean and professional?
   - Does it look like GitHub Actions/Vercel dashboard (card grid style)?

2. **Build verification:**
   - Does `npm run build` pass?
   - Is bundle < 200KB?

3. **Code review:**
   - Is it < 500 lines of new code?
   - Are components clean and well-structured?
   - Does it use Tailwind utilities (not inline styles)?
   - No prohibited libraries (Three.js, framer-motion, etc.)?

4. **Functionality:**
   - Does `useOfficeData` hook work correctly?
   - Do cards show real Supabase data?
   - Does responsive layout work?

**If ANY of these fail:** REJECTED with specific feedback. Iterate and resubmit.

**If ALL pass:** APPROVED for Phase 2.

---

## Phase Gate

**STOP CONDITION:** Do NOT proceed to Phase 2 until Bernard explicitly approves.

**Approval format:**
> ✅ **PHASE 1 APPROVED**  
> Screenshot verified. Build passes. Code quality confirmed.  
> Proceed to Phase 2.

**Communication:**
- Message Brett on Telegram with screenshot when ready for review
- Wait for Bernard's APPROVE or REJECT decision
- If rejected, fix issues and resubmit

---

## Tools & Execution

**Use Claude Code (FREE):**
- This is creative frontend work
- Use Claude Code instead of expensive APIs
- Command: `claudecode` (or however Brett has it configured)

**Work in project directory:**
```bash
cd /home/clawd/.openclaw/workspace/projects/command-center-v2
```

**Verify Supabase connection:**
```bash
npm run dev
# Open browser to localhost
# Check browser console for Supabase connection logs
```

---

## Timeline Expectation

**Realistic timeline:** 30-45 minutes for quality work  
**Speed flag:** If done in < 15 minutes, Bernard will scrutinize extra hard

Quality > Speed. Take time to verify everything works.

---

## Questions?

If you encounter blockers:
1. Check if issue is in copied files (useOfficeData.js, constants.js, supabase.js)
2. Verify .env file has correct Supabase credentials
3. Test Supabase connection manually (see verification script in preflight report)
4. Ask Bernard for clarification (don't guess)

---

**Ready to start:** YES (pending GitHub/Vercel setup from Atlas)

**Next step:** Wait for Atlas to confirm GitHub + Vercel are live, then BEGIN PHASE 1.
