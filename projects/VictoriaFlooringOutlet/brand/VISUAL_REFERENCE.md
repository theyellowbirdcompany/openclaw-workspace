# Visual Reference Guide — Victoria Flooring Outlet

Quick-reference for designers and developers implementing the Victoria Flooring Outlet brand.

---

## Color Swatches

### Primary Palette

```
██████ #2B2B2B Charcoal       — Headers, primary text, navigation
██████ #1A1A1A Charcoal Dark  — Footer, strong emphasis
██████ #C8B49A Sand           — Accents, warm highlights
██████ #D4A017 Gold           — CTAs, trust badges, specials
```

### Supporting Palette

```
██████ #F0E9E0 Sand Light     — Section backgrounds
██████ #FAF7F4 Sand Pale      — Page backgrounds
██████ #E8B824 Gold Light     — Hover states
██████ #FFF8E7 Gold Pale      — Alert/promo backgrounds
██████ #8C8C8C Grey           — Supporting text
██████ #DCDCDC Grey Light     — Borders, dividers
██████ #FFFFFF White          — Cards, main backgrounds
```

---

## Typography Stack

### Headings: Montserrat
**Import:** `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap');`

**Weights:**
- 400: Base (rarely used for headings)
- 600: Subheads, section labels
- 700: Minor headers (H4, card titles)
- 800: Major headers (H2, H3)
- 900: Hero headlines (H1, major CTAs)

### Body: Open Sans
**Import:** `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;1,400&display=swap');`

**Weights:**
- 400: Body copy, navigation
- 600: Emphasis, labels, minor CTAs
- 400 italic: Quotes, captions, notes

### Size Scale
```
Hero (H1):     clamp(2rem, 5vw, 3.5rem)   [32px → 56px]
Section (H2):  clamp(1.6rem, 3.5vw, 2.5rem) [25.6px → 40px]
Subhead (H3):  clamp(1.2rem, 2.5vw, 1.6rem) [19.2px → 25.6px]
Minor (H4):    1.1rem (17.6px)
Body:          17px / 1.7 line-height
Small:         14px (captions, fine print)
```

---

## Component Patterns

### Primary CTA Button

**Visual:**
```
Background: #D4A017 (Gold)
Text: #2B2B2B (Charcoal)
Font: Montserrat 700, 16px
Padding: 16px 32px
Border Radius: 6px
Shadow: 0 4px 12px rgba(212,160,23,0.3)
Hover: #E8B824 (Gold Light)
```

**HTML:**
```html
<a href="#" class="btn btn--primary">Get Your Free Sample</a>
```

### Secondary CTA Button

**Visual:**
```
Background: transparent
Border: 2px solid #D4A017 (Gold)
Text: #D4A017 (Gold)
Font: Montserrat 700, 16px
Padding: 14px 30px (smaller to account for border)
Border Radius: 6px
Hover: Background #D4A017, Text #FFFFFF
```

**HTML:**
```html
<a href="#" class="btn btn--secondary">Learn More</a>
```

### Card Component

**Visual:**
```
Background: #FFFFFF
Border: 1px solid #DCDCDC (optional, or use shadow only)
Border Radius: 12px
Shadow: 0 4px 20px rgba(0,0,0,0.12)
Padding: 32px
```

**Structure:**
```html
<div class="card">
  <img src="..." alt="..." class="card__image">
  <h3 class="card__title">Product Name</h3>
  <p class="card__description">Brief benefit statement...</p>
  <a href="#" class="btn btn--primary">View Details</a>
</div>
```

### Trust Badge

**Visual:**
```
Background: #FFF8E7 (Gold Pale)
Border: 1px solid #D4A017 (Gold)
Text: #2B2B2B (Charcoal)
Font: Open Sans 600, 14px
Padding: 8px 16px
Border Radius: 6px
Icon: Optional (checkmark, location pin, etc.)
```

**HTML:**
```html
<span class="badge badge--trust">
  <span class="badge__icon">✓</span>
  No-Markup Pricing
</span>
```

---

## Layout Grids

### Desktop (1140px max-width)
```
[Container: 1140px centered]
  [12-column grid, 40px gaps]
    [Content spans 8-10 columns typically]
    [Sidebar spans 2-4 columns]
```

### Tablet (700px - 1000px)
```
[Container: 100% with 32px side padding]
  [6-column grid, 32px gaps]
    [Content spans full width or 4 columns]
    [Sidebar stacks below content]
```

### Mobile (<700px)
```
[Container: 100% with 24px side padding]
  [Single column]
    [All content stacks vertically]
    [Images scale to container width]
```

---

## Spacing System

### Section Padding
```
Desktop:  80px top/bottom
Tablet:   60px top/bottom
Mobile:   40px top/bottom
```

### Element Spacing
```
Large gap:    40px (between major sections)
Medium gap:   32px (between content blocks)
Small gap:    24px (between paragraphs/elements)
Tight gap:    16px (between related items)
Minimal gap:   8px (between label and input)
```

### Recommended Margins
```
H1 bottom:    32px
H2 bottom:    24px
H3 bottom:    16px
P bottom:     1.1rem (~18.7px)
```

---

## Image Guidelines

### Aspect Ratios

**Hero Images:**
- Desktop: 16:9 or 21:9 (wide panoramic)
- Mobile: 4:3 or 1:1 (taller crops)

**Product Images:**
- Square: 1:1 (product grids, thumbnails)
- Lifestyle: 4:3 or 3:2 (room shots)

**Card Images:**
- Horizontal: 16:9 (blog cards, feature cards)
- Vertical: 3:4 (product highlight cards)

### Dimensions

```
Hero (desktop):     1920x1080px minimum
Hero (mobile):      1080x1080px minimum
Card image:         800x450px (16:9)
Product thumbnail:  600x600px (1:1)
Blog featured:      1200x675px (16:9)
```

### Treatment
- **Brightness:** Bright but not blown out (aim for airy, not harsh)
- **Color Grading:** Warm undertones (slightly golden/sandy)
- **Saturation:** Natural (not oversaturated)
- **Sharpening:** Moderate (show grain texture but not oversharpened)

---

## Iconography

### Style Guidelines
- **Weight:** Medium (not too thin, not too bold)
- **Style:** Rounded corners (match brand radius)
- **Size:** 24px × 24px default, scale proportionally
- **Color:** Match text color or use Gold (#D4A017) for emphasis

### Recommended Icon Set
**Font Awesome 6 (Free)** or **Heroicons** (both have appropriate weight/style)

### Common Icons
```
✓  Checkmark     — Benefits, trust badges, confirmations
📍 Location      — "Victoria, BC" badge
🚚 Truck         — Free delivery
📏 Ruler         — Specifications
💬 Comment       — Testimonials
⭐ Star          — Ratings, featured items
🔒 Lock          — Secure checkout
📧 Email         — Contact
📞 Phone         — Call us
🏠 Home          — Residential focus
```

---

## Shadows & Depth

### Elevation Scale
```
Level 0 (flat):   No shadow
Level 1 (card):   0 2px 8px rgba(0,0,0,0.08)
Level 2 (hover):  0 4px 20px rgba(0,0,0,0.12)
Level 3 (modal):  0 8px 40px rgba(0,0,0,0.18)
Level 4 (popup):  0 16px 60px rgba(0,0,0,0.24)
```

### Usage
- **Level 1:** Default cards, panels, images
- **Level 2:** Hovered cards, featured elements, buttons
- **Level 3:** Modals, dropdowns, sticky navigation
- **Level 4:** Popups, tooltips, overlays

---

## Animation & Transitions

### Standard Transitions
```css
transition: all 0.2s ease;           /* General purpose */
transition: transform 0.3s ease-out; /* Movement */
transition: opacity 0.15s ease;      /* Fade in/out */
```

### Hover Effects
**Buttons:**
```css
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212,160,23,0.4);
}
```

**Cards:**
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.16);
}
```

**Links:**
```css
a:hover {
  color: #E8B824; /* Gold Light */
}
```

---

## Accessibility Quick Checks

### Color Contrast (WCAG AA)
```
✅ #2B2B2B on #FFFFFF → 13.6:1 (AAA)
✅ #D4A017 on #2B2B2B → 4.9:1 (AA)
✅ #8C8C8C on #FFFFFF → 4.6:1 (AA)
❌ #C8B49A on #FFFFFF → 2.4:1 (FAIL — use for accents only, not text)
✅ #2B2B2B on #FAF7F4 → 13.1:1 (AAA)
```

### Touch Targets
- Minimum: 44px × 44px (mobile buttons, links)
- Recommended: 48px × 48px for primary CTAs
- Spacing: 8px minimum between interactive elements

### Focus States
```css
:focus-visible {
  outline: 3px solid #D4A017;
  outline-offset: 2px;
}
```

---

## CSS Custom Properties (Quick Copy)

```css
:root {
  /* Colors */
  --charcoal:      #2B2B2B;
  --charcoal-dark: #1A1A1A;
  --sand:          #C8B49A;
  --sand-light:    #F0E9E0;
  --sand-pale:     #FAF7F4;
  --gold:          #D4A017;
  --gold-light:    #E8B824;
  --grey:          #8C8C8C;
  --grey-light:    #DCDCDC;
  --white:         #FFFFFF;

  /* Typography */
  --font-heading:  'Montserrat', sans-serif;
  --font-body:     'Open Sans', sans-serif;

  /* Shadows */
  --shadow-sm:     0 2px 8px rgba(0,0,0,0.08);
  --shadow-md:     0 4px 20px rgba(0,0,0,0.12);
  --shadow-lg:     0 8px 40px rgba(0,0,0,0.18);

  /* Radius */
  --radius-sm:     6px;
  --radius-md:     12px;
  --radius-lg:     20px;

  /* Layout */
  --max-width:     1140px;
  --section-pad:   80px;
}
```

---

## Figma/Design Tool Setup

### Color Styles
Create the following color styles in your design tool:

**Text:**
- Primary → #2B2B2B (Charcoal)
- Secondary → #8C8C8C (Grey)
- Accent → #D4A017 (Gold)

**Backgrounds:**
- Page → #FFFFFF (White)
- Section → #FAF7F4 (Sand Pale)
- Card → #FFFFFF (White)

**UI:**
- Primary Button → #D4A017 (Gold)
- Border → #DCDCDC (Grey Light)
- Divider → #DCDCDC (Grey Light)

### Text Styles
**Headings:**
- H1 Hero / Montserrat 900 / 56px / 1.2 line / Charcoal
- H2 Section / Montserrat 800 / 40px / 1.2 line / Charcoal
- H3 Subhead / Montserrat 800 / 25.6px / 1.2 line / Charcoal
- H4 Minor / Montserrat 700 / 17.6px / 1.2 line / Charcoal

**Body:**
- Body / Open Sans 400 / 17px / 1.7 line / Charcoal
- Body Strong / Open Sans 600 / 17px / 1.7 line / Charcoal Dark
- Caption / Open Sans 400 / 14px / 1.6 line / Grey
- Button / Montserrat 700 / 16px / 1.0 line / (varies)

---

## Print Materials (Future Reference)

### Business Cards
**Dimensions:** 3.5" × 2" (standard US)
**Orientation:** Horizontal
**Colors:** Charcoal background, Gold accents, White text
**Typography:** Montserrat for name, Open Sans for contact info

### Flyers/Brochures
**Paper:** Matte finish (not glossy — matches warm brand tone)
**Color Mode:** CMYK equivalents of brand colors
**Photos:** Bright lifestyle shots with flooring in real rooms

### Signage
**Background:** Charcoal or White (high contrast)
**Text:** Gold for headlines, Charcoal/White for body
**Visibility:** Ensure 4:1 contrast minimum at distance

---

## QA Checklist for Brand Compliance

Before launching any branded material, verify:

**Visual:**
- [ ] Brand colors used from defined palette (no off-brand colors)
- [ ] Montserrat + Open Sans fonts applied correctly
- [ ] Images bright, warm-toned, high-quality
- [ ] Shadows and radius match design system
- [ ] White space generous, not cramped

**Content:**
- [ ] Tone is honest, helpful, conversational (not corporate)
- [ ] Benefits stated before features
- [ ] Pricing transparent (no fake urgency)
- [ ] Local Victoria/Vancouver Island mentions present
- [ ] No spelling/grammar errors

**Technical:**
- [ ] Responsive at 1000px and 700px breakpoints
- [ ] Color contrast meets WCAG AA minimum
- [ ] Touch targets 44px+ on mobile
- [ ] Alt text on all images
- [ ] Page loads in <3 seconds

---

## Resources

**Design System File:** `projects/VictoriaFlooringOutlet/deliverables/code/styles.css`  
**Reference Implementations:** `deliverables/code/index.html`, `blog.html`  
**Brand Guidelines:** `projects/VictoriaFlooringOutlet/brand/BRAND_GUIDELINES.md`

---

**Version:** 1.0  
**Last Updated:** March 12, 2026  
**Maintained By:** Vale (Brand Strategy) + Devan (Implementation)
