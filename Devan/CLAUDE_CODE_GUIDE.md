# Claude Code Usage Guide for Devan

**Purpose:** Maximize use of free local Claude Code for creative work, minimize expensive API calls.

⚠️ **CRITICAL RULE:** If Claude Code is not working (access denied, command not found, crashes, etc.), **do NOT silently fall back to API**. Notify Brett immediately via Claw with the specific error message. Wait for resolution before proceeding with creative work.

---

## Quick Start

### Basic Invocation
```bash
claude "Your prompt here"
```

### With File Context
```bash
claude "Refine this component" < src/components/MyComponent.jsx
```

### Multi-turn Conversation
```bash
# Start session
claude --interactive

# Then have back-and-forth conversation
> Design a dashboard component
> Make it more asymmetric
> Add animations
> exit
```

---

## Common Workflows

### 1. Component Creation (FREE via Claude Code)

```bash
# Initial design
claude "Create a React component for agent status display.
Requirements:
- Navy background (#0F172A)
- Gold accent (#FBBF24)
- Space Mono for headings
- IBM Plex Sans for body
- Framer Motion for pulse animation
- Props: agentName, status, currentTask"

# Save output to file
claude "..." > src/components/AgentStatusCard.jsx

# Iterate
claude "Make the layout more asymmetric and add hover states" \
  < src/components/AgentStatusCard.jsx \
  > src/components/AgentStatusCard.jsx.new
```

### 2. Design System Work (FREE via Claude Code)

```bash
# Typography exploration
claude "Analyze BRAND.md and suggest type scale improvements" \
  < /home/clawd/.openclaw/workspace/BRAND.md

# Color palette refinement
claude "Generate CSS custom properties for Navy + Gold + agent colors system"

# Spacing system
claude "Create 8px-based spacing scale with 6 levels"
```

### 3. Creative Problem Solving (FREE via Claude Code)

```bash
# Layout exploration
claude "Design 3 layout variants for agent dashboard:
1. Isometric grid
2. Asymmetric cards
3. Spatial timeline
Output: Description + CSS grid setup for each"

# Interaction patterns
claude "Suggest 5 ways to visualize agent-to-agent communication with animations"

# Animation timing
claude "What easing curve best conveys 'growth momentum'? 
Explain physics and provide cubic-bezier values"
```

---

## When to Use API Instead

**Only use API calls for:**

### 1. Final Integration
After designing locally, integrate into codebase:
- Running tests
- Committing to git
- Deployment

### 2. Real-time Collaboration
When working with other agents:
- Responding to Bernard's requests
- Coordinating with Vale on brand
- Delivering to bulletin board

### 3. Live Data Work
When you need to:
- Query Supabase
- Check production status
- Interact with running services

---

## Cost Comparison

### Creative Task Example: "Design dashboard component"

**Via API (Current):**
- OpenRouter GPT-5.3 Codex: ~30k tokens = **$0.60**
- If fallback to Sonnet: ~30k tokens = **$0.45**
- **Cost: $0.45-0.60 per task**

**Via Claude Code (Recommended):**
- Local execution: **$0.00**
- **Cost: FREE**

**Savings per task: 100%**

### Monthly Impact

**If you do 20 creative tasks per day:**
- API cost: 20 tasks × $0.50 × 30 days = **$300/month**
- Claude Code cost: **$0/month**
- **Savings: $300/month ($3,600/year)**

---

## Workflow Template

**For every design/creative task:**

```bash
# 1. Start with Claude Code (FREE)
claude "Design [thing] with [requirements]"

# 2. Iterate locally (FREE)
claude "Refine [aspect]" < output.jsx
claude "Add [feature]"
claude "Make it [adjective]"

# 3. When satisfied, integrate via API (PAID)
# - Run tests
# - Push to git
# - Update bulletin board
# - Coordinate with team
```

---

## Tips for Effective Claude Code Usage

### 1. **Be Specific with Context**
```bash
# Good
claude "Design component following BRAND.md typography scale" \
  < /home/clawd/.openclaw/workspace/BRAND.md

# Bad
claude "Make it look nice"
```

### 2. **Use File Redirection**
```bash
# Read existing code
claude "Refine this" < MyComponent.jsx

# Save output
claude "Create component" > NewComponent.jsx

# Chain operations
claude "Add animations" < Component.jsx > Component-v2.jsx
```

### 3. **Multi-step Refinement**
```bash
# Step 1: Generate
claude "Create dashboard" > dashboard.jsx

# Step 2: Refine layout
claude "Make layout asymmetric" < dashboard.jsx > dashboard-v2.jsx

# Step 3: Add motion
claude "Add Framer Motion" < dashboard-v2.jsx > dashboard-final.jsx
```

### 4. **Leverage Brand Context**
Always reference BRAND.md for consistency:
```bash
claude "Following BRAND.md guidelines, create [component]" \
  < /home/clawd/.openclaw/workspace/BRAND.md
```

---

## Verification

**To check if you're using Claude Code effectively:**

1. **Count API calls per creative task**
   - Goal: 0-1 API calls for delivery/integration
   - Red flag: 5+ API calls for design work

2. **Cost per task**
   - Goal: <$0.10 (mostly integration/delivery)
   - Red flag: >$0.50 (means you used API for creative work)

3. **Local iterations**
   - Goal: 3-5 local iterations before API call
   - Red flag: Every iteration is an API call

---

## Remember

**Claude Code is FREE. API calls cost money.**

**Every design decision made locally = $0.50-1.00 saved.**

**Your creative work should be 90% local (Claude Code), 10% API (integration/delivery).**

---

*Last updated: 2026-03-10*
