# Claude Code Tool — Zero-Cost Local Reasoning

**Use this skill when you need high-quality reasoning at zero incremental cost.**

---

## When to Use Claude Code

Use Claude Code (local) instead of API calls for:

- **Complex design decisions** (layout, typography, color theory)
- **Code generation** (React components, CSS)
- **Analysis tasks** (reviewing code, parsing data)
- **Multi-step reasoning** (planning, synthesis)
- **Iterative refinement** (exploring options)

**Do NOT use for:**
- Simple routing/orchestration (use your own model)
- Quick lookups (use your own model)
- Non-reasoning tasks (file operations, shell commands)

---

## How to Invoke

### Method 1: Direct Execution (Recommended)

```bash
/home/clawd/.local/bin/claude -p "Your prompt here"
```

Example:
```bash
/home/clawd/.local/bin/claude -p "Design a color palette for a fintech dashboard. Use brand colors Navy (#0F172A) and Gold (#FBBF24). Generate 8 semantic tokens (primary, secondary, success, warning, error, info, surface, text)."
```

### Method 2: Via Wrapper (For Complex Tasks)

```javascript
const wrapper = require('/home/clawd/.openclaw/workspace/claude-code-wrapper.js');
const result = wrapper.execute("Your prompt", {
  model: 'claude-sonnet-4-5', // optional
  addDir: '/path/to/context' // optional
});
```

---

## Response Format

Claude Code returns markdown-wrapped JSON by default. Parse it:

```javascript
// Raw response from claude -p
const output = `\`\`\`json
{
  "result": "..."
}
\`\`\``;

// Extract JSON
const match = output.match(/```json\n([\s\S]*?)\n```/);
const parsed = JSON.parse(match[1]);
```

Or use the wrapper which handles this automatically.

---

## Cost Model

### Your API Model (Gemini 2.5 Flash)
- Orchestration: ~100-300 tokens per task
- Cost: ~$0.0001 per task

### Claude Code (Local)
- Heavy reasoning: 0 incremental tokens (billed to Brett's monthly plan)
- Cost: $0 incremental

**Total savings: 99%+ vs. using API for reasoning**

---

## Example Workflows

### Design Task (Typography)

```bash
# You (Devan on Gemini):
# "User wants a type scale for a dashboard"

# Your orchestration (cheap):
# 1. Read SOUL.md (100 tokens)
# 2. Route to Claude Code (100 tokens)

# Invoke Claude Code (free):
/home/clawd/.local/bin/claude -p "Create an 8-step type scale using Space Mono (headings) and IBM Plex Sans (body). Base size: 16px. Ratio: 1.25 (major third). Output as CSS custom properties."

# Parse response (100 tokens)
# Return to user (100 tokens)

# Total cost: ~$0.0003 (vs $0.15 with API)
```

### Code Generation

```bash
# Invoke Claude Code for component:
/home/clawd/.local/bin/claude -p "Generate a React component: Dashboard card with title, metric value, trend indicator (up/down arrow), and sparkline placeholder. Use Tailwind CSS. Navy background, gold accents. TypeScript."

# Get full component code at zero incremental cost
```

### Multi-Option Exploration (Parallel)

```bash
# You want to explore 3 layout options:

# Option 1 (Claude Code):
claude -p "Layout option 1: Sidebar navigation, main content, right panel for metrics"

# Option 2 (Claude Code):
claude -p "Layout option 2: Top navbar, grid of cards, floating action button"

# Option 3 (Claude Code):
claude -p "Layout option 3: Command palette (⌘K), full-screen workspace, collapsible panels"

# All three explorations: $0 incremental cost
# Your synthesis (Gemini): ~200 tokens = $0.00001
```

---

## Integration with Design Entity

### Layer 3: Parallel Work

Claude Code enables true parallel exploration at zero cost:

```
Philosophy → Claude Code (local)
Layout 1 → Claude Code (local)  
Layout 2 → Claude Code (local)  ← All parallel
Layout 3 → Claude Code (local)  
Typography → Claude Code (local)
Motion → Claude Code (local)
Synthesis → Your model (cheap routing)
```

**Total incremental cost: ~$0.001 for orchestration**

---

## Rate Limits

Claude Code is billed to Brett's monthly plan. Limits:

- **Usage cap:** Check with `claude --usage`
- **Concurrent requests:** Typically 3-5
- **Daily limit:** Varies by plan tier

For design work (5-10 projects/day), you'll never hit limits.

---

## Best Practices

### DO:
- Use Claude Code for all creative/reasoning tasks
- Route simple decisions through your own model
- Batch multiple Claude Code calls when possible
- Cache responses when appropriate

### DON'T:
- Use Claude Code for trivial tasks (file operations, etc.)
- Call Claude Code in tight loops (batch instead)
- Duplicate work already done (check MEMORY.md first)

---

## Verification

Check if Claude Code is available:

```bash
which claude && claude --version
```

Expected output:
```
/home/clawd/.local/bin/claude
2.1.71 (Claude Code)
```

If not available, alert the user.

---

## Example: Full Design Task

```bash
# Task: "Design a login page"

# Step 1: Your orchestration (Gemini, 200 tokens)
# - Read SOUL.md for design convictions
# - Check MEMORY.md for similar work
# - Determine scope

# Step 2: Claude Code (local, free)
claude -p "Design a login page following these convictions:
- Space Mono headings, IBM Plex body
- Navy (#0F172A) + Gold (#FBBF24) palette
- Max 8px border-radius
- Left-align all body text
- One deliberate grid break

Output HTML structure, CSS classes, and interaction states."

# Step 3: Your synthesis (Gemini, 300 tokens)
# - Parse response
# - Apply to project structure
# - Log to MEMORY.md

# Total cost: ~$0.0004 (vs $0.15+ with API)
```

---

## When This Skill Applies

**Trigger conditions:**
- User requests design work
- Complex code generation needed
- Multi-option exploration required
- High token cost anticipated (>1,000 tokens)

**Do NOT trigger for:**
- Simple questions
- File operations
- Shell commands
- Quick lookups

---

## Summary

Claude Code is your **high-intelligence, zero-cost reasoning engine**.

Use it liberally for:
- Design decisions
- Code generation  
- Complex analysis
- Multi-step workflows

Route through your cheap model (Gemini) for:
- Orchestration
- Parsing
- Logging
- Simple decisions

**Result: 99%+ cost savings on design work** 🔥
