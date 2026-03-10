# BRAND.md — Agent OS Visual Identity

**Owner:** Vale (Growth Strategist)
**Version:** 1.1
**Last Updated:** 2026-03-09
**Status:** APPROVED — Vale's refined baseline

---

## Brand North Star

**Agent OS is a professional command center, not a toy.**

We are ops-grade, visually fierce, and built for people who make decisions under pressure. Every pixel serves clarity. Motion is purposeful. Typography has backbone. Color is deliberate. We do not ask for attention — we command it through sheer intentionality.

This is what happens when a growth strategist and an orchestrator decide that most software looks like it was designed by committee, and refuse to build another one.

---

## Visual Movement: "Operational Minimalism"

A tension between restraint and intensity. Sparse layouts with moments of calculated drama. Dark surfaces with surgical use of color. Typography that earns its weight. Motion that serves function but feels alive.

**The synthesis:** Swiss grid discipline × military command aesthetics × the editorial confidence of a well-funded magazine. Not pastiche — tension between all three.

**When in doubt:** Does this element serve the mission? If it serves only decoration, remove it. If it serves decoration AND function, keep it but keep it lean.

---

## Color Palette

### Foundation
- **Navy** `#0F172A` — The ground. All command begins here.
- **Surface** `#1A2332` — Elevated layers. Cards, panels, and working surfaces float here.
- **Charcoal** `#1F2937` — Second-level elevation. Nested containers, sidebars.
- **Slate** `#64748B` — Neutral midground. Borders, disabled states, secondary text.
- **Muted** `#334155` — Between slate and charcoal. Subtle dividers, inactive UI.

**Elevation rule:** Navy → Surface → Charcoal is a z-axis, not just a palette. Lower layers are darker. Higher layers are lighter. Shadows reinforce this — they never contradict it.

### Primary Accent
- **Gold** `#FBBF24` — The north star color. Draws the eye to what matters. Claw's color. Use for primary CTA, active nav, and keyline moments.

### Agent Identity Colors
Each agent has one color. Use for status, identity badges, and active-state indicators only.

| Agent | Role | Color | Hex |
|-------|------|-------|-----|
| Claw | Orchestration | Gold | `#FBBF24` |
| Bernard | Strategy | Violet | `#8B5CF6` |
| Christopher | Research | Cyan | `#06B6D4` |
| Devan | Build | Emerald | `#10B981` |
| Vale | Growth | Fuchsia | `#D946EF` |
| Scribe | Communications | Amber | `#F59E0B` |
| Atlas | Operations | Indigo | `#6366F1` |

**Vale's note on Fuchsia:** Rose (#F43F5E) was too close to error red. Growth should read as energy and signal — not alarm. Fuchsia is distinct, vivid, and impossible to confuse. It's ours.

### Color Rules
- Agent colors accent, never fill
- One accent color per page context (the page's "mode")
- Gold is reserved for Gold-role elements + primary CTAs — never reuse it for decoration
- No gradients between agent colors (they compete; they don't blend)
- Status colors are separate from agent colors (see Status Indicators)

### Forbidden
- Purple-to-blue gradient (the AI cliché — we are not a chatbot)
- Pastels (we are not friendly SaaS)
- Neons (we are not a gaming peripheral brand)
- Rose (#F43F5E) as a non-error color — it reads as "danger"
- Desaturated greys — they flatten everything and say nothing

---

## Typography

### Type Scale

| Token | Size | Font | Use |
|-------|------|------|-----|
| `display-xl` | 48px | Space Mono Bold | Hero headlines only |
| `display-lg` | 32px | Space Mono Bold | Section headers, agent names |
| `display-md` | 24px | Space Mono Medium | Sub-headers, panel titles |
| `label` | 12px | Space Mono Regular | ALL-CAPS labels, status tags |
| `body-lg` | 16px | IBM Plex Sans Regular | Primary reading text |
| `body-md` | 14px | IBM Plex Sans Regular | Secondary text, descriptions |
| `body-sm` | 12px | IBM Plex Sans Regular | Captions, timestamps, metadata |
| `code` | 13px | IBM Plex Mono Regular | Terminal output, code, technical IDs |

**Absolute minimum:** 12px. Nothing smaller, ever.

### Display Font: Space Mono (Bold / Medium)
- Headings, command titles, agent names, ALL-CAPS labels
- Monospace gives it authority — it reads like a terminal with a personality
- Letter spacing: `0.05em` on ALL-CAPS labels; `0.02em` on display sizes; `0` on body
- Line height: 1.2 on display; 1.1 on labels

### Body Font: IBM Plex Sans (Regular / Medium / SemiBold)
- Body copy, descriptions, form labels, nav items
- Humanist warmth without being soft — matches the mission
- Line height: 1.6 for reading text; 1.4 for dense UI
- Never use Inter, Roboto, or system fonts — they signal "I didn't choose, I defaulted"

### Code Font: IBM Plex Mono (Regular)
- Terminal output, code blocks, technical labels, IDs
- Consistent with the IBM Plex family — it belongs
- Never use Fira Code, JetBrains Mono, or Courier — they introduce visual noise

### Font DNA
Space Mono + IBM Plex Sans = **structure × warmth**. One holds the frame; the other carries the meaning. The tension is the brand.

---

## Spacing & Grid

### Base Unit: 8px

All spacing is multiples of 8. No exceptions. Fractions (4px) exist only for optical micro-corrections inside components, never as layout spacing.

| Token | Value | Use |
|-------|-------|-----|
| `xs` | 4px | Internal micro-spacing only |
| `sm` | 8px | Tight element gaps |
| `md` | 16px | Standard padding |
| `lg` | 24px | Card padding, section gaps |
| `xl` | 32px | Major section breaks |
| `2xl` | 48px | Hero-level spacing |
| `3xl` | 64px | Maximum layout gaps |

### Grid
- **Background grid reference:** 24px spacing, 1px slate lines at 0.6% opacity. Military graph paper, not decoration.
- **Layout columns:** 12-column, 16px gutter
- **Content max-width:** 1440px; content area 1280px
- **Command Center hero:** 60% content / 40% negative space (always left-weighted)

### Rules
- Generous negative space is mandatory. Density is *controlled*, never accidental.
- Dense data areas must be bounded by breathing room — never run data wall-to-wall.
- Asymmetry is a feature. Perfect symmetry reads as a template.

---

## Motion & Micro-interactions

### Principles
1. **Motion earns its place.** If removing an animation doesn't confuse the user, remove it.
2. **Speed communicates confidence.** Slow animations feel uncertain. Fast feels decisive.
3. **Enter and exit are both intentional.** Things don't disappear — they depart.
4. **Growth animations expand.** Reveals, progressions, and data emergence move outward.

### Timing Reference

| Type | Duration | Use |
|------|----------|-----|
| Instant | < 100ms | Hover states, cursor feedback |
| Micro | 150ms | Button press, toggle, tap |
| Fast | 200–250ms | Slide reveals, fade in/out |
| Standard | 300–400ms | Modal entrance, panel open |
| Deliberate | 500–800ms | Status transitions, data loads |
| Entrance | 800–1200ms | Page-level reveals, hero moments |

### Easing Curves

- **Standard:** `cubic-bezier(0.4, 0, 0.2, 1)` — the workhorse
- **Decelerate:** `cubic-bezier(0, 0, 0.2, 1)` — things arriving (entrance)
- **Accelerate:** `cubic-bezier(0.4, 0, 1, 1)` — things departing (exit)
- **Growth (Vale signature):** `cubic-bezier(0.16, 1, 0.3, 1)` — expansive reveal, used for metric expansions, funnels, data growth visualizations. It overshoots slightly and settles. It feels like momentum.

### Approved Animations
- **Fade:** Page load, modal entrance, status changes (300ms, decelerate)
- **Slide:** Panel reveals, navigation (250ms, decelerate)
- **Scale:** Button press (100ms), card hover (150ms) — never more than `scale(1.03)`
- **Pulse:** Status indicators, active agents (1.5s cycle, sine ease)
- **Glow:** Agent desk active state (2s cycle, opacity 0.6→1.0→0.6)
- **Stagger:** List items, dashboard widget entrance (50ms delay per item, max 8 items staggered — after that, just show them)
- **Number roll:** Metrics and counters count up on entrance (600ms, growth easing)
- **Progress fill:** Bars and gauges animate from 0 on enter (500ms, growth easing)

### Forbidden
- Bounce easing — this is not an app store preview
- Continuous spinning — loading only, never decorative
- Parallax scrolling — we are ops, not a portfolio site
- Anything that plays while the user is trying to read
- Stagger on more than 8 items without a reason — it becomes noise
- Entrance animations on data that was already visible (don't re-animate on scroll)

---

## Component Language

### Buttons

**Primary**
- Background: Gold `#FBBF24` | Text: Navy `#0F172A`
- Font: Space Mono, ALL-CAPS, 12px, `0.05em` spacing
- Radius: 4px
- Hover: `brightness(1.1)` + `scale(1.02)` (150ms)
- Active: `scale(0.98)` (100ms)
- Focus: 2px Gold outline, 2px offset

**Secondary**
- Background: transparent | Border: 1px Slate | Text: Slate
- Hover: `rgba(100,116,139,0.15)` background fill
- Same shape rules as Primary

**Destructive**
- Background: transparent | Border: 1px `#F43F5E` | Text: `#F43F5E`
- Hover: `rgba(244,63,94,0.1)` fill
- No Gold. No confusion. Destruction is red.

**Ghost / Tertiary**
- No border, no background | Text: Slate
- Hover: text brightens to white
- Use only for low-stakes secondary actions

**Rule:** Never mix Gold with a destructive action. Gold is forward motion.

### Cards / Containers

- **Background:** Surface `#1A2332` (default) or Charcoal `#1F2937` (nested)
- **Border:** `1px solid rgba(100,116,139,0.2)` — present, not loud
- **Radius:** 8px
- **Shadow:** `0 4px 16px rgba(0,0,0,0.35)` — one shadow per element
- **Active / selected state:** Gold left border, 3px
- **Hover (interactive cards):** Surface brightens 5%, border becomes `rgba(251,191,36,0.3)`

### Inputs / Forms

- **Background:** `rgba(100,116,139,0.12)` — it's a surface, not a pit
- **Border:** none default; `1px solid #64748B` on focus
- **Focus ring:** `0 0 0 2px rgba(251,191,36,0.4)` — gold glow, not just outline
- **Text:** IBM Plex Sans 14px, white
- **Placeholder:** Slate, not bold, never italic
- **Error state:** Rose border `#F43F5E`, no background change — clean signal

### Status Indicators

Status colors are **separate** from agent identity colors. They carry universal meaning.

| State | Color | Behavior |
|-------|-------|----------|
| Idle | `#334155` Muted | Static dot, 6px |
| Active | Agent color | Bright dot, 8px, steady glow |
| Working | Agent color | Pulsing dot (1.5s cycle) |
| Success | `#10B981` Emerald | Steady glow, fades after 3s |
| Warning | `#F59E0B` Amber | Static dot |
| Error | `#F43F5E` Rose | Pulsing dot — gets attention |

**Rule:** Pulse = something is happening. Steady = something has happened. Static = nothing is happening. Don't reverse this.

### Data Tables

- **Header:** Charcoal bg, Space Mono 11px ALL-CAPS labels, Slate color
- **Rows:** Alternating `navy` / `rgba(26,35,50,0.5)` — subtle zebra
- **Row hover:** `rgba(251,191,36,0.06)` tint — gold traces the eye
- **Selected row:** Gold left border 3px, same as card active state
- **Density:** Comfortable (36px row height) default; Compact (28px) available for power users

---

## Layout Patterns

### Command Center / Hero
- **Weight:** 60% content left, 40% negative space right — always
- **Focal point:** Top-left gravity. The eye lands there and is guided down.
- **Background:** Navy base. Subtle 24px grid at 0.6% opacity. Optional: single soft radial gradient bloom (agent color, 6% opacity, positioned at focal point)
- **Typography entry:** Display-xl or display-lg heading, IBM Plex body 2–3 lines max, then action

### Dashboard Grids
- Left-aligned columns only — not centered
- 3-col desktop / 2-col tablet / 1-col mobile
- 24px gutters
- Dense data zones must have a 32px breathing margin before the next section
- Never float a lone widget in a half-empty row — fill or span

### Navigation

**Sidebar (primary nav)**
- Width: 280px
- Background: Charcoal `#1F2937`
- Active state: Gold left keyline (4px), text white
- Hover: `rgba(100,116,139,0.15)` fill, 200ms
- Agent identity: show agent color dot (8px) next to agent name

**Top bar (context bar)**
- Height: 64px
- Background: Navy
- Text: Slate for secondary, White for primary
- Breadcrumb: IBM Plex Sans 14px, Slate

### Floor Plan / Spatial Layouts
- Agent desks occupy defined zones — no floating
- Desk glow uses agent color at 40% opacity ambient, 80% active
- Spatial labels use Space Mono 11px ALL-CAPS
- Connection lines: 1px, Slate default, agent-color active, animated (2s stroke-dashoffset)

---

## Background & Texture

### Primary: Navy `#0F172A`
Solid. Everything else is layered on top.

### Permitted Textures (use sparingly, one at a time)
1. **Micro-grid:** 24px, 1px Slate lines, 0.6% opacity — technical, grounding
2. **Noise overlay:** 2% opacity, grayscale — film grain, adds analog warmth
3. **Radial bloom:** Single soft radial gradient, agent color at 6–8% opacity, placed at focal point only
4. **Geometric elements:** Abstract shapes (lines, circles) at 3–5% opacity in background layers

### Hard Rules
- Max one texture type per view
- Text must be readable at 4.5:1 contrast over any texture — if it can't, the texture goes
- No full-bleed photography (we are not SaaS marketing)
- No animated backgrounds (motion in the background = user loses focus on content)

---

## Data Visualization

### Principles
- Data is the product. Visualization serves the data, not the brand.
- Use agent colors purposefully — they encode who owns the data
- Remove all chartjunk: no gridlines unless the user needs to read precision values

### Chart Rules
- Line weight: 2px default, 3px for primary series
- Background: transparent or Surface card `#1A2332`
- Axes: Slate text, 12px IBM Plex Mono
- Gridlines: only when precision matters; Muted `#334155`, 0.5px
- Tooltips: Surface bg + Gold border, IBM Plex Sans 12px

### Color in Charts
- Use the agent palette, not a rainbow
- Maximum 5 series in one chart — more than that, rethink the chart
- For single-metric charts: Gold or the relevant agent color
- For comparisons: pick 2–3 agent colors with maximum contrast between them

### Heatmaps
- Scale: Navy (zero) → relevant agent color (maximum)
- Never: Red-green (colorblind inaccessible)
- Always include a legend with numeric scale

### Growth Charts (Vale's territory)
- Trend lines use growth easing on entrance animation
- Positive growth: Emerald or Fuchsia accent
- Negative: Rose — clear, not punishing
- Target lines: Gold dashed, labeled

---

## Dark Mode Only

We are dark-mode-native. This is non-negotiable.

Dark is our operational context — it reduces eye strain, increases focus in low-light environments, and makes our accent colors dramatically more vivid. Switching this to light mode would require rebuilding the entire palette.

**Exception:** Public-facing marketing pages may use a light mode variant, but only with:
1. A full secondary palette signed off by Vale
2. The same typography rules
3. Navy replaced with Off-White `#F8FAFC`, Gold retained, everything else re-mapped

No exceptions without this process.

---

## Forbidden Patterns

This list is a commitment. It reflects what makes most software look like it wasn't designed — it was just built.

### Typography
- ❌ Inter anywhere — it's the default because people didn't decide; we decided
- ❌ Roboto, system fonts, -apple-system — same reason
- ❌ Font sizes smaller than 12px — accessibility and legibility are non-negotiable
- ❌ Body text above 16px in dense UI — it crowds and dominates
- ❌ Mixing more than 2 font families on a page

### Layout
- ❌ Centered hero with centered subtext centered below it — this is every template ever built
- ❌ Centered layout for operational/dashboard content — operational information is left-weighted
- ❌ Uniform-spacing card grids — they announce "template"
- ❌ Floating lone widgets in half-empty rows — fill or span
- ❌ Modals wider than 640px — they're not pages

### Color
- ❌ Purple-to-blue gradient — the universal AI-product cliché
- ❌ Rose (#F43F5E) as anything except error/destructive state
- ❌ More than one agent color in the same component
- ❌ Gold used decoratively (it's a signal, not wallpaper)
- ❌ Any gradient between two agent colors
- ❌ White backgrounds (unless explicitly the light mode variant)

### Motion
- ❌ Bounce easing — this is not playful software
- ❌ Continuous decorative spinning
- ❌ Parallax scrolling
- ❌ Animations while the user is actively reading
- ❌ Staggered animations on more than 8 items without a clear reason
- ❌ Re-animating elements that were already on screen (scroll-trigger re-entrance)
- ❌ Skeleton screens on interactions faster than 300ms — it feels slower, not faster

### Shape
- ❌ Fully rounded corners (pill shapes) on anything other than badges/tags
- ❌ Radius above 8px on cards (we are not a wellness app)
- ❌ Shadows on shadows — one shadow per element

### Content
- ❌ Emoji as primary visual accent — status and identity only
- ❌ Rainbows in any data visualization
- ❌ Decorative dividers that don't create hierarchy
- ❌ "Powered by" badges or vendor branding anywhere visible

---

## Accessibility (Non-negotiable)

These are the floor, not the goal.

- **Contrast:** 4.5:1 minimum for all text; 3:1 for large text (24px+) and UI components
- **Color-only signals:** Never. Always pair color with icon, label, or pattern.
- **Reduced motion:** Respect `prefers-reduced-motion` — set all animations to instant or none
- **Focus states:** Always visible, always Gold or bright Slate — never hidden, never default browser-style
- **Text sizing:** 12px floor; 14–16px preferred for reading text
- **Touch targets:** 44px minimum on any clickable element
- **Keyboard navigation:** All interactive elements reachable and operable via keyboard

---

## Usage Rules for Development Teams

### Before You Code — Five Questions
1. What's the mission of this page? (Name it in one sentence.)
2. What's the one primary action? (Lock in your Gold moment.)
3. What information hierarchy exists? (Map it before building it.)
4. What motion earns its place? (Kill anything that doesn't answer this.)
5. What's the agent context? (Which agent color, if any, is active here?)

### Build Checklist
- [ ] Navy background foundation
- [ ] Space Mono in headings, IBM Plex Sans in body, IBM Plex Mono in code
- [ ] Gold for primary CTA and active-state keylines only
- [ ] One agent color per context, used for identity/status only
- [ ] 8px spacing grid — no arbitrary values
- [ ] Left-weighted layout, not centered
- [ ] All interactive elements have visible focus states
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Minimum 4.5:1 contrast on all text
- [ ] No Inter, Roboto, or system fonts
- [ ] One shadow per element
- [ ] Radius ≤ 8px on cards and containers

---

## Design Debt & Roadmap

**v1.1 (this version):** Foundational palette, typography scale, motion system, component language, forbidden patterns.

**v1.2 (next):**
- Pattern library: pre-approved component compositions (hero, dashboard, detail panel, data table, floor plan)
- Animated SVG icon set in agent colors
- Documented micro-interaction specs per component type
- Vale-signed light mode variant

**Future:**
- Custom display typeface (if and when something beats Space Mono in context)
- Motion style guide with working code examples
- Figma token library synced with dev tokens

All additions require Vale's sign-off before shipping.

---

## Final Word

This brand is a contract. When you build with Agent OS, you're saying: "This was designed intentionally. This was chosen, not defaulted."

The difference between a command center and a dashboard is that a command center knows what it's for. So does this brand.

Make it unmistakable.

**— Vale**

---

*v1.0 drafted 2026-03-09 | v1.1 refined and approved 2026-03-09 | v1.2 animation catalogue added 2026-03-09 (Devan)*

---

## Animation Catalogue (Engineering Reference)

All animations used in the Agent OS dashboard — names, timing, easing, and source components.

### Keyframes

| Name | Description | Source |
|------|-------------|--------|
| `statusPulse` | Opacity 0.7→1→0.7, infinite | CommandDeskCard |
| `reactorPulse` | scale(1)→scale(1.06), opacity 0.82→1, alternate | CommandDeskCard |
| `deskPulse` | Gold box-shadow expand/collapse, 1 cycle | CommandDeskCard |
| `collabDash` | SVG stroke-dashoffset scroll, 1.2s linear infinite | CollaborationLine |
| `collabStroke` | Stroke appear, 250ms linear | CommandCenterFloorPlan |
| `workingPulse` | Glow dot fade, 2s ease-in-out infinite | Sidebar |

```css
@keyframes statusPulse {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1; }
}

@keyframes reactorPulse {
  0%   { transform: scale(1);    opacity: 0.82; }
  100% { transform: scale(1.06); opacity: 1; }
}

@keyframes deskPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251,191,36,0),   0 10px 24px rgba(0,0,0,0.38); }
  50%       { box-shadow: 0 0 0 7px rgba(251,191,36,0.22), 0 10px 24px rgba(0,0,0,0.42); }
}

@keyframes collabDash {
  to { stroke-dashoffset: -16; }
}

@keyframes collabStroke {
  from { opacity: 0; stroke-dashoffset: 40; }
  to   { opacity: 1; stroke-dashoffset: 0;  }
}
```

### Framer Motion Variants (reusable)

```ts
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
}

export const slideUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: [0, 0, 0.2, 1] },
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.05 } },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.25, ease: [0, 0, 0.2, 1] },
}
```

### Easing Reference (CSS)

```css
--ease-standard:   cubic-bezier(0.4, 0, 0.2, 1);
--ease-decelerate: cubic-bezier(0, 0, 0.2, 1);
--ease-accelerate: cubic-bezier(0.4, 0, 1, 1);
--ease-growth:     cubic-bezier(0.16, 1, 0.3, 1);
```

### Duration Tokens (CSS custom properties)

```css
--duration-instant:  100ms;
--duration-micro:    150ms;
--duration-fast:     250ms;
--duration-standard: 300ms;
--duration-entrance: 800ms;
--duration-pulse:    1500ms;
--duration-reactor:  2400ms;
```

### Rules Summary

- Max scale on hover: `scale(1.03)` — never higher
- Reactor ring animation: `2.4s` alternate — intentionally slow, conveys steady power
- Collaboration lines: `1.2s` dash scroll — matches "data in motion" metaphor
- All entrance animations use `ease-decelerate` — things arrive with intention
- All exit animations use `ease-accelerate` — things leave cleanly

*Updated 2026-03-09 by Devan (Task #004)*
