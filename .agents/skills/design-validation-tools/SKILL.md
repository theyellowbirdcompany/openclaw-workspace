# Design Validation Tools — Native-Speed Design Checks

**Use these tools for fast, typed design validation.**

---

## Available Tools

### 1. Visual Diff (Screenshot Comparison)

```bash
node /home/clawd/.openclaw/workspace/visual-diff-loop.js \
  --url "http://localhost:5173/command-center" \
  --width 1440 \
  --height 900 \
  --baseline "/path/to/baseline.png"
```

**Returns:**
- Drift percentage
- Diff image path
- Converged status

### 2. CSS Audit (Banned Properties Check)

```bash
node /home/clawd/.openclaw/workspace/cdp-inspector.js \
  --url "http://localhost:5173/command-center" \
  --selectors "h1,h2,p,button" \
  --output "results.json"
```

**Returns:**
- List of violations
- Severity levels
- Specific selectors

### 3. Multi-Viewport Test

```bash
node /home/clawd/.openclaw/workspace/multi-viewport-test.js \
  --url "http://localhost:5173/command-center" \
  --output "./screenshots"
```

**Returns:**
- Screenshots at 4 breakpoints
- Path to each image

---

## Quick Validation Workflow

For any design task:

```bash
# 1. Visual regression
node visual-diff-loop.js --url <url>

# 2. CSS audit
node cdp-inspector.js --url <url>

# 3. Multi-viewport check
node multi-viewport-test.js --url <url>
```

All tools return JSON that you can parse and report.

---

## Cost

- **Execution:** 0 tokens (local Node.js)
- **Response parsing:** ~50 tokens
- **Total:** ~50 tokens per check (vs 500+ for shell exec)

---

## When to Use

- After building any component
- Before marking task complete
- When user requests validation
- As part of design pipeline

This skill provides the same functionality as a plugin, without config complexity.
