---
name: visual-diff-loop
description: Autonomous visual iteration loop — capture, diff, analyze, fix. Compares current design output against Figma reference using pixel-level diffing, identifies visual regressions, and automatically applies CSS/layout fixes. Self-healing design system that converges on pixel-perfect alignment.
---

# Visual Diff Loop — Self-Correcting Design

This skill orchestrates a closed-loop visual feedback system that iterates toward design perfection without human intervention.

## Overview

The loop runs continuously until visual drift falls below 0.5%:

```
1. Build & Serve App
   ↓
2. Screenshot Current State
   ↓
3. Fetch Figma Reference
   ↓
4. Pixelmatch Diff (0.5% threshold)
   ↓
   ├─ Drift < 0.5% → CONVERGED (stop)
   └─ Drift ≥ 0.5% → Analyze Diff
        ↓
5. Inspect Render Tree (CDP)
   - Read computed CSS
   - Measure font metrics
   - Detect z-index/layout conflicts
   ↓
6. Generate CSS Fixes
   - Identify root causes
   - Apply surgical changes
   ↓
7. Rebuild & Loop to Step 2
        ↓
        └─ If fixes fail 3x → Invoke Self-Skill-Writer
```

## Prerequisites

- **Figma API token** configured in auth-profiles.json
- **Playwright** (browser automation + CDP access)
- **Pixelmatch** (npm package for visual diffing)
- **Dev server** running locally (e.g., `npm run dev`)
- **figma MCP skill** (reads design tokens from Figma)
- **browser skill** (screenshots + CDP inspection)

## Configuration

```json5
{
  "visual_diff_loop": {
    "enabled": true,
    "figmaFileId": "...",  // e.g., "12345abc..."
    "figmaPageName": "Command Center",  // which page to use as reference
    "appUrl": "http://localhost:5173",  // dev server URL
    "screenshotSelector": "#app",  // element to screenshot
    "pixelmatchThreshold": 0.005,  // 0.5% tolerance
    "maxRetries": 3,  // max fix attempts before escalation
    "autoArchiveOnConverge": true,  // save converged screenshots
    "cdpInspectTargets": [  // CSS selectors to inspect
      "#command-center-floor-plan",
      ".agent-desk",
      ".coordination-lattice"
    ]
  }
}
```

## Workflow

### Phase 1: Initialization

```
openclaw exec npm run dev  // start dev server
wait for http://localhost:5173 to be ready
```

### Phase 2: Capture-Compare Loop

**Step 2a: Screenshot current state**
```
browser screenshot \
  --url http://localhost:5173 \
  --selector "#app" \
  --output current.png
```

**Step 2b: Fetch Figma reference**
```
figma read-file <file-id> \
  --page "Command Center" \
  --export-png \
  --output figma-reference.png
```

Reference can be:
- Exported design frame (most accurate)
- Screenshot of Figma canvas (less accurate)
- Hand-drawn spec (requires manual interpretation)

**Step 2c: Pixelmatch diff**
```javascript
const pixelmatch = require('pixelmatch');
const fs = require('fs');
const PNG = require('pngjs').PNG;

const img1 = PNG.sync.read(fs.readFileSync('current.png'));
const img2 = PNG.sync.read(fs.readFileSync('figma-reference.png'));

const diff = new PNG({ width: img1.width, height: img1.height });
const numDiffPixels = pixelmatch(
  img1.data,
  img2.data,
  diff.data,
  img1.width,
  img1.height,
  { threshold: 0.1 }
);

const totalPixels = img1.width * img1.height;
const driftPercent = (numDiffPixels / totalPixels) * 100;

console.log(`Drift: ${driftPercent}%`);
console.log(`Diff pixels: ${numDiffPixels} of ${totalPixels}`);
```

Output: `diff.png` showing differing pixels in red.

### Phase 3: Visual Analysis

If drift ≥ 0.5%, analyze the diff image:

**What to look for in diff.png:**
- Red clusters = layout shift, spacing mismatch
- Red at text edges = font/size mismatch
- Red in backgrounds = color drift
- Red on borders = stroke width or z-index issues
- Scattered red = anti-aliasing noise (ignore if <0.1%)

**Use CDP to pinpoint causes:**

```javascript
const computed = await page.evaluate(() => {
  const el = document.querySelector('#command-center-floor-plan');
  return {
    computed: window.getComputedStyle(el),
    boundingBox: el.getBoundingClientRect(),
    layout: el.offsetWidth + 'x' + el.offsetHeight
  };
});
```

### Phase 4: Automatic Fix Application

Generate CSS fixes based on diff analysis:

**Common patterns:**

| Diff Pattern | Likely Cause | Fix |
| --- | --- | --- |
| Red on left edge | Margin/padding mismatch | Adjust `margin-left` or `padding-left` |
| Red at bottom | Height overflow | Reduce height or increase container |
| Red text blur | Font size mismatch | Compare computed vs intended |
| Red background shift | Background image positioning | Fix `background-position` |
| Scattered red | Anti-aliasing noise | Ignore if <0.1% |

**Apply fix:**
```css
/* Example: if agent desk is 4px too wide */
.agent-desk {
  width: calc(100% - 4px);
}
```

Rebuild and loop back to Step 2.

### Phase 5: Escalation

If the same fix fails 3 times, invoke the **self-skill-writer**:

```
Invoke: self-skill-writer

Task: "I keep getting visual drift in the Command Center floor plan (diff.png attached). 
The problem is [describe pattern]. I've tried [list failed fixes]. 
Write a new skill called 'command-center-visual-fixer' that prevents this permanently."

The agent will:
1. Analyze the diff pattern
2. Root-cause it (layout engine, z-index, font metrics, etc.)
3. Write a new SKILL.md with explicit rules
4. Apply the skill to the build
5. Test and confirm convergence
```

## Output Artifacts

### During Loop
- `current.png` — screenshot of built design
- `figma-reference.png` — Figma export
- `diff.png` — pixelmatch visual diff (red = divergent pixels)
- `css-fixes.log` — all CSS changes applied
- `iteration-N.json` — metadata for each loop iteration

### On Convergence
- `CONVERGED.png` — final aligned screenshot
- `CONVERGENCE_REPORT.md` — summary of all fixes applied
- `visual-diff-loop.archive/` — all iteration artifacts

## Thresholds & Tuning

### Pixelmatch Threshold
- `0.1` = very strict (catches anti-aliasing as drift)
- `0.15` = standard (recommended)
- `0.25` = loose (ignores font rendering variance)

### Drift Tolerance
- `0.1%` = pixel-perfect (10 pixels out of 10,000)
- `0.5%` = production-quality (50 pixels out of 10,000) ← **default**
- `1.0%` = acceptable (100 pixels out of 10,000)

Adjust based on:
- Resolution (higher res = larger pixel counts = higher drift %)
- Anti-aliasing variance (varies by OS, browser, font)
- Animation frames (only capture static, post-animation)

### Max Retries
- `1` = fail fast, escalate early
- `3` = try multiple approaches (recommended)
- `5` = persistent, good for complex issues

## Known Limitations

1. **Anti-aliasing variance** — Font rendering differs slightly across OS/browser. Tolerance must account for this.
2. **Time-dependent content** — Timestamps, live data, animations must be frozen or mocked before screenshot.
3. **Viewport-dependent layouts** — Screenshots must be taken at consistent viewport size (e.g., 1920x1080).
4. **Color space** — Figma and browser may render colors slightly differently. Use Lab color space for comparison if strict.
5. **Responsive design** — Only compares one viewport size. For multi-viewport testing, run loop per breakpoint.

## Success Criteria

Convergence achieved when:
- Drift < 0.5% for 2 consecutive loops
- No CSS warnings in browser console
- All agent desks render at correct z-index
- Collaboration lattice animates smoothly (60fps)
- Typography matches BRAND.md type scale

## When to Use This Skill

✅ **Use visual-diff-loop for:**
- Polishing production designs after initial build
- Catching regressions after design changes
- Aligning implementation to Figma specs
- Automated QA for design system compliance
- Iterating toward pixel-perfect layouts

❌ **Don't use for:**
- Initial design exploration (use design-system skill first)
- Responsive testing across 10+ viewports (too slow, use visual regression tools)
- Animation timing (requires motion capture, not static diff)
- User flow testing (use functional tests instead)

## Integration with Design Pipeline

**Full workflow:**
```
1. design-system skill → philosophy + build
2. visual-diff-loop skill → iterate to convergence
3. Figma MCP → capture live UI back to Figma
4. self-skill-writer → codify lessons as permanent rules
```

## Example Command

```bash
openclaw exec visual-diff-loop \
  --figma-file 12345abc... \
  --figma-page "Command Center" \
  --app-url http://localhost:5173 \
  --threshold 0.005 \
  --max-retries 3 \
  --archive-on-converge
```

This will run until convergence, saving all iteration artifacts to `visual-diff-loop.archive/`.
