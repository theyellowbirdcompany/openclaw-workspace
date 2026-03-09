---
name: design-system
description: Complete design workflow that chains four specialized skills in sequence — design philosophy → interface design → generative elements → production code. Produces visually distinctive, production-grade interfaces with bespoke animations and textures. Use for all frontend work when building with Agent OS brand standards.
---

# Design System Workflow

This skill orchestrates a four-stage design pipeline that transforms a concept into production-ready code. Each stage builds on the previous one, maintaining aesthetic coherence throughout.

## Overview

The design system workflow enforces discipline at every stage:

1. **Philosophy** (canvas-design) — Define the aesthetic movement, mood, and design rules
2. **Interface** (frontend-design) — Build the layout and typography from that philosophy
3. **Generative Elements** (algorithmic-art) — Create unique animated backgrounds, textures, and effects
4. **Production Code** (web-artifacts-builder) — Bundle everything into deployable React with TypeScript

This is not four separate tasks. It is one coherent design journey where each stage informs the next.

---

## Stage 1: Design Philosophy (canvas-design)

### Your Task

Before writing a single line of code, you will name and define the aesthetic movement that governs this interface.

**Steps:**

1. **Name the movement** — Give it a conceptual anchor (e.g., "Operational Minimalism", "Chromatic Silence", "Concrete Poetry"). This is not a description; it is a manifesto.

2. **Write the philosophy** — 2–3 paragraphs defining:
   - The visual tension (what two design traditions are in dialogue?)
   - The mood and atmosphere
   - The specific rules that flow from this philosophy
   - Example: "A tension between military discipline and organic flow. Clean, sparse layouts with moments of calculated motion. Dark backgrounds with strategic accent colors."

3. **Lock in the constraints**
   - Required color palette (reference BRAND.md if available)
   - Typography choices (display + body fonts)
   - Forbidden patterns (what will NOT appear)
   - Motion principles (timing, easing, when animations appear)
   - Spacing discipline (base unit, multiples)

4. **Output format:**
   ```
   # Design Movement: [NAME]
   
   [2-3 paragraph manifesto]
   
   ## Design Rules (Non-negotiable)
   - Color palette: [colors with hex codes]
   - Typography: [display font + body font]
   - Motion: [timing, easing, approved animations]
   - Spacing: [base unit, margins, padding rules]
   - Forbidden patterns: [what will NOT appear]
   - Aesthetic DNA: [cultural/design references creating tension]
   ```

5. **Do not proceed to Stage 2 until this manifesto is locked.**

### Quality Gate

The manifesto is good when:
- It has a clear conceptual anchor (a named movement)
- It explains the aesthetic tensions (not just "looks good")
- It is specific enough that a builder could enforce it consistently
- Every rule flows logically from the philosophy

---

## Stage 2: Interface Design (frontend-design)

### Your Task

Using the manifesto from Stage 1 as your north star, design the interface layout, typography hierarchy, and interaction states.

**Steps:**

1. **Reread the manifesto** — You are constrained by it. Every design decision must flow from the philosophy.

2. **Design the layout**
   - Asymmetrical or intentionally structured (no generic centered grids)
   - Define focal point(s)
   - Establish spatial hierarchy
   - Use the spacing rules from the manifesto

3. **Lock in typography**
   - Display font for headings (from manifesto)
   - Body font for content (from manifesto)
   - Size hierarchy: 24px, 18px, 16px, 14px, 12px (use only these)
   - Line height, letter spacing per the manifesto

4. **Color application**
   - Primary: Navy (#0F172A) or per manifesto
   - Accent: 1–2 colors maximum (from manifesto palette)
   - Neutrals for hierarchy
   - Never use generic color schemes

5. **Interaction states**
   - Hover: +10% brightness, subtle scale 1.02
   - Focus: Visible gold or accent color outline, 2px
   - Active: Change background or border color (never just text color)
   - Disabled: Opacity 0.5, cursor not-allowed

6. **Approved animations**
   - Fade (300ms) for entrance/exit
   - Slide (250ms) for reveals
   - Pulse (1.5s cycle) for status indicators
   - Scale (100ms) for button press
   - Stagger (50ms per item) for lists
   - NO bounce, NO continuous spin (unless loading), NO distraction

7. **Output format:** Working React or HTML/CSS code implementing these rules.

### Quality Gate

The interface is good when:
- It reflects the manifesto's aesthetic (not a generic design)
- Typography hierarchy is clear and intentional
- All interactive elements have visible focus states
- Motion serves function, not decoration
- Contrast ratio is 4.5:1 minimum (accessibility)

---

## Stage 3: Generative Elements (algorithmic-art)

### Your Task

Create bespoke animated backgrounds, textures, hero effects, or cursor interactions using p5.js with seeded randomness. These elements must match the aesthetic from the manifesto.

**Steps:**

1. **Identify the opportunity** — Where does motion/texture enhance the design?
   - Hero background animation?
   - Texture overlay for atmosphere?
   - Custom cursor effect?
   - Particle system for micro-interactions?

2. **Generate from the manifesto**
   - Use the color palette from Stage 1
   - Match the motion timing (200–400ms interactions, 800ms–1.2s entrances)
   - Respect the aesthetic tension (if the manifesto is "minimalist with calculated drama", the animation should show restraint with one striking moment)

3. **Use p5.js with seeded randomness**
   - Enable `randomSeed()` so every instance is unique but deterministic
   - Flow fields, particle systems, or noise-based generation
   - Avoid pure chaos — structure with intention

4. **Output format:** Standalone p5.js sketch or animated SVG that can be embedded in the interface from Stage 2.

### Quality Gate

The generative element is good when:
- It matches the color palette and motion style from the manifesto
- It adds atmosphere without cluttering information
- Every instance looks unique but cohesive
- It runs smoothly (60fps on low-end devices)

---

## Stage 4: Production Code (web-artifacts-builder)

### Your Task

Bundle everything from Stages 1–3 into a production React 18 + TypeScript + Tailwind + Framer Motion application.

**Steps:**

1. **Lock in the manifesto** — Reference it one final time. Every choice flows from it.

2. **Build from the interface design (Stage 2)**
   - Implement the layout with Tailwind CSS
   - Use CSS variables for the color palette
   - Typography via Framer Motion for entrance animations
   - All focus/hover states from Stage 2

3. **Integrate the generative element (Stage 3)**
   - Embed the p5.js sketch or SVG animation
   - Wire it to respond to scroll, hover, or time
   - Ensure it doesn't block interactivity

4. **Add micro-interactions**
   - Button presses
   - Form focus states
   - Navigation transitions
   - Lazy loading fade-ins
   - All timing per the manifesto

5. **Output format:** Self-contained React app, bundled to single HTML file, deployable to Vercel or any static host.

### Quality Gate

The production code is good when:
- It renders identically to the interface design from Stage 2
- All animations from Stage 3 work smoothly
- No visual bugs or accessibility issues
- Bundle size is reasonable (<500KB gzipped)
- Deploys without warnings or errors

---

## Orchestration Rules

### Run All Stages in Order

**Do not skip ahead.** Each stage depends on the previous one:

```
Stage 1 (Philosophy) 
  ↓ informs
Stage 2 (Interface)
  ↓ integrated by
Stage 3 (Generative)
  ↓ bundled into
Stage 4 (Production)
```

If you skip Stage 1, the interface will be generic.  
If you skip Stage 3, the site will lack personality.  
If you skip Stage 4, the code won't ship.

### Cross-Reference BRAND.md

If BRAND.md exists in the project root, use it as the anchor for Stage 1. The manifesto should respect (not violate) brand constraints.

### Prompt Patterns That Work

Use these when passing this skill to a builder:

**Force a conceptual anchor:**
> "Before writing any code, write a design manifesto. Name the aesthetic movement. Write 2 paragraphs defining it. Then build from those rules."

**Demand the unforgettable thing:**
> "What is the ONE element on this page someone will describe to a friend? Build everything around that."

**Reference real design DNA:**
> "Aesthetic DNA: Zach Lieberman's computational work + Massimo Vignelli's grid discipline + a 1970s Swiss travel poster. Not any of these literally — the tension between them."

**Lock in anti-patterns:**
> "Forbidden: Inter font, centered hero with subheading, card grids, purple-to-blue gradients. Break every one of these rules by doing something better."

---

## Example: How It Works End-to-End

### Input
"Build the Command Center floor plan interface. Dark ops aesthetic. Isometric view. Agents move and collaborate. Reference the Nano Banana floor plan design style."

### Stage 1 Output (Philosophy)
```
# Design Movement: Operational Minimalism

An isometric command center where military discipline meets organic agent movement. 
The space is intentionally sparse — clean navy backgrounds, minimal visual noise — but 
agents are alive, moving, collaborating. Motion is purposeful. Color is strategic: 
gold for north star, agent colors for identity, slate for hierarchy.

Aesthetic DNA: Swiss modernism (grid discipline) + military command center (ops aesthetic) 
+ Nano Banana floor plan (organic placement in an isometric space).

## Design Rules
- Color: Navy #0F172A, Gold #FBBF24, Agent colors (cyan, emerald, rose, violet, indigo, amber)
- Typography: Space Mono (headings), IBM Plex Sans (body)
- Motion: Agent desks pulse 1.5s on status change, collaboration lines animate 250ms
- Spacing: 8px base unit, generous negative space
- Forbidden: Centered layouts, rounded corners >8px, gradients, Inter font
```

### Stage 2 Output (Interface)
Isometric office floor plan with:
- Navy background
- Individual agent desks with Space Mono labels
- Compass rose in corner
- Zones clearly labeled
- Desk hover states highlight with gold border
- All text readable, 4.5:1 contrast minimum

### Stage 3 Output (Generative)
Custom p5.js background pattern:
- Subtle noise texture matching agent colors
- Particles that float and settle when agents collaborate
- Unique seed per session (deterministic randomness)
- Runs at 60fps, doesn't interfere with interaction

### Stage 4 Output (Production)
React + TypeScript + Tailwind bundle:
- Isometric layout renders correctly
- Animations smooth at 60fps
- Agent desks respond to live status updates
- Collaborating agents show animated connection lines
- Deployed to Vercel, <400KB gzipped

---

## When to Use This Skill

✅ **Use design-system for:**
- Any custom web interface that needs to feel designed (not templated)
- Branded sites where aesthetics matter
- Multi-page applications where consistency is critical
- Interactive dashboards or command centers
- Projects where "distinctive" is a requirement

❌ **Don't use design-system for:**
- Temporary prototypes or throwaway mockups
- Projects where a template is genuinely sufficient
- Simple informational sites without interaction
- Projects where time pressure overrides quality

---

## Final Word

This workflow exists to prevent generic, templated, "AI slop" frontends. It forces intentionality at every stage. A manifesto that is taken seriously produces interfaces that feel *designed*, not generated.

The philosophy gates the interface.  
The interface gates the code.  
The code ships the dream.

Go build something beautiful.
