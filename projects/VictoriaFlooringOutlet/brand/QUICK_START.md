# Quick Start Guide — Victoria Flooring Outlet Brand

Fast reference for implementing the Victoria Flooring Outlet brand identity.

---

## The 30-Second Brand Brief

**Who We Are:**  
Victoria Flooring Outlet — a locally-owned flooring outlet in Victoria, BC

**What We Do:**  
Premium flooring brands at honest outlet prices, with expert guidance (no pressure)

**Who We Serve:**  
Homeowners and contractors in Victoria and Vancouver Island who want quality floors, fair pricing, and real help

**How We're Different:**  
Honest outlet pricing (not fake sales) + local expertise + curated quality (not overwhelming selection)

**Brand Promise:**  
"Honest pricing. Local trust. Quality floors."

---

## Brand Essentials (Copy/Paste Ready)

### Tagline
```
Honest pricing. Local trust. Quality floors.
```

### Elevator Pitch (30 seconds)
```
We're Victoria Flooring Outlet—a local flooring outlet that delivers premium brands at honest outlet pricing. No inflated compare-at prices, no pushy sales, just quality floors and expert guidance from a Victoria business you can trust.
```

### Extended Pitch (60 seconds)
```
Victoria Flooring Outlet is a locally-owned flooring outlet serving Victoria and Vancouver Island. We offer premium flooring brands—vinyl plank, laminate, hardwood—at genuine outlet prices, direct from distributors. Unlike big-box stores with overwhelming selection and minimal guidance, we carry a curated selection of quality products we actually know inside out. And unlike high-end showrooms with premium pricing, we keep overhead low and pass the savings to you. Whether you're a homeowner upgrading your floors or a contractor sourcing for a project, we provide honest pricing, expert guidance, and local service.
```

---

## Brand Colors (Design Tools)

### Hex Codes
```
Primary:
#2B2B2B  Charcoal (headers, text, navigation)
#C8B49A  Sand (accents, warm highlights)
#D4A017  Gold (CTAs, trust badges)

Supporting:
#FAF7F4  Sand Pale (page backgrounds)
#F0E9E0  Sand Light (section backgrounds)
#FFFFFF  White (cards, clean surfaces)
#8C8C8C  Grey (supporting text)
#DCDCDC  Grey Light (borders, dividers)
```

### CSS Custom Properties (Copy/Paste)
```css
:root {
  --charcoal: #2B2B2B;
  --sand: #C8B49A;
  --gold: #D4A017;
  --sand-pale: #FAF7F4;
  --white: #FFFFFF;
  --grey: #8C8C8C;
}
```

---

## Typography (Quick Setup)

### Google Fonts Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Open+Sans:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

### CSS Typography Setup
```css
body {
  font-family: 'Open Sans', sans-serif;
  font-size: 17px;
  line-height: 1.7;
  color: #2B2B2B;
}

h1, h2, h3, h4 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  line-height: 1.2;
  color: #2B2B2B;
}

h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.6rem, 3.5vw, 2.5rem); }
h3 { font-size: clamp(1.2rem, 2.5vw, 1.6rem); }
```

---

## Common Components (HTML + CSS)

### Primary CTA Button
```html
<a href="#" class="btn btn--primary">Order Your Free Sample</a>
```

```css
.btn {
  display: inline-block;
  padding: 16px 32px;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn--primary {
  background: #D4A017;
  color: #2B2B2B;
  box-shadow: 0 4px 12px rgba(212,160,23,0.3);
}

.btn--primary:hover {
  background: #E8B824;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212,160,23,0.4);
}
```

### Card Component
```html
<div class="card">
  <img src="product.jpg" alt="Product name" class="card__image">
  <h3 class="card__title">Product Name</h3>
  <p class="card__description">Brief benefit statement goes here.</p>
  <a href="#" class="btn btn--primary">View Details</a>
</div>
```

```css
.card {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  padding: 32px;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.16);
}

.card__image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
}

.card__title {
  margin-bottom: 12px;
}

.card__description {
  color: #8C8C8C;
  margin-bottom: 20px;
}
```

### Trust Badge
```html
<span class="badge badge--trust">
  <svg class="badge__icon" width="16" height="16" fill="currentColor">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
  </svg>
  No-Markup Pricing
</span>
```

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 14px;
}

.badge--trust {
  background: #FFF8E7;
  border: 1px solid #D4A017;
  color: #2B2B2B;
}

.badge__icon {
  flex-shrink: 0;
}
```

---

## Messaging Templates

### Homepage Hero
```
Headline: [Benefit] + [Local Trust]
Example: "Quality Floors at Honest Prices—Victoria's Trusted Flooring Outlet"

Subhead: [What We Do] + [How We're Different]
Example: "Premium brands at outlet pricing, with expert guidance and no sales pressure."

CTA: [Action-Oriented]
Example: "Browse This Week's Deal" or "Visit Our Showroom"
```

### Deal of the Week Announcement
```
Headline: [Product] + [Key Benefit] + [Price Hook]
Example: "Quiet, Durable Floors That Handle Real Life (14% Off This Week)"

Body:
- Lead with benefit (what customer gets)
- Include 2-3 key specs (wear layer, sound rating, etc.)
- State price clearly (compare-at + sale price)
- End with CTA

CTA: "Get Your Free Sample" or "See Full Details"
```

### Product Page
```
Headline: [Product Name]
Subhead: [Primary Benefit]

Body Structure:
1. Overview (what it is, why it's great)
2. Key Features (3-5 bullets)
3. Technical Specs (table format)
4. Best For (room types, use cases)
5. CTA (Get Sample, Get Quote, Buy Now)
```

---

## SEO Essentials

### Page Title Formula
```
[Primary Keyword] | Victoria Flooring Outlet

Examples:
- "Vinyl Plank Flooring Victoria | Victoria Flooring Outlet"
- "Flooring Deals Victoria BC | Victoria Flooring Outlet"
- "Harbinger York LVP Deal | Victoria Flooring Outlet"
```

### Meta Description Formula
```
[Benefit] + [Local] + [CTA] (150-160 characters)

Examples:
- "Shop quality vinyl plank flooring in Victoria, BC. Honest outlet pricing, expert guidance, free samples. Vancouver Island delivery available."
- "This week's flooring deal: Harbinger York LVP with cork underlay at $4.29/sqft (14% off). Free samples. Victoria-based, Island delivery."
```

### H1 Headline
```
Include primary keyword naturally:
✅ "Vinyl Plank Flooring in Victoria: Quality Brands, Outlet Prices"
✅ "Flooring Deals in Victoria BC—This Week's Top Pick"
❌ "Welcome to Our Website"
❌ "Products"
```

---

## Social Media Quick Reference

### Instagram Post Format
```
Image: Bright, airy room with featured flooring
Caption: 2-3 sentences focusing on benefit + visual
Hashtags: 1-2 max (#VictoriaBC #YYJ)

Example:
"Light oak floors meet sound control. This week's deal features integrated cork underlayment—your home will thank you. 🏡

#VictoriaBC #YYJ"
```

### Facebook Post Format
```
Headline: Clear benefit or question
Body: 1-2 short paragraphs
Link: Product page or blog post
Image: High-quality lifestyle shot

Example:
"Looking for flooring that handles real life?

This week's Deal of the Week features a commercial-grade wear layer plus integrated cork underlayment for superior sound control. It's the smart choice for busy homes—and it's 14% off this week.

[Link to product page]"
```

---

## Email Templates

### Deal Announcement Subject Lines
```
✅ "This Week: Quiet Floors at 14% Off"
✅ "The Best Flooring Deal in Victoria This Week"
✅ "Harbinger York LVP—$4.29/sqft (Down from $4.99)"
❌ "🔥🔥 HUGE SALE ALERT 🔥🔥"
❌ "You Won't Believe This Deal!!!"
```

### Email Body Structure
```
1. Hero image (bright room with flooring)
2. Headline (benefit-focused)
3. 3 bullet benefits (what customer gets)
4. Pricing (compare-at + sale price, percentage off)
5. CTA button ("See the Deal" or "Get Your Sample")
6. Footer (showroom address, phone, unsubscribe)
```

---

## Brand Voice Checklist

Before publishing any content, verify:

**Tone:**
- [ ] Conversational but professional (not stiff)
- [ ] Honest and straightforward (no hype)
- [ ] Helpful and educational (not pushy)
- [ ] Local and warm (not corporate)

**Language:**
- [ ] Plain English (no jargon unless explained)
- [ ] Benefits before features (what customer gets)
- [ ] Active voice (not passive)
- [ ] Contractions okay (we're, it's, you'll)

**Avoids:**
- [ ] ALL CAPS (except rare headline emphasis)
- [ ] Fake urgency ("ONLY 2 LEFT!!!")
- [ ] Corporate speak ("leverage," "solutions")
- [ ] Overpromising ("life-changing," "revolutionary")

---

## Photography Guidelines (Quick Checklist)

**Lighting:**
- [ ] Bright and natural (not harsh)
- [ ] Warm undertones (slightly golden/sandy)
- [ ] High brightness, moderate contrast

**Composition:**
- [ ] Show flooring in real rooms (not isolated)
- [ ] Slight perspective (not flat overhead)
- [ ] Clean, uncluttered spaces
- [ ] Modern transitional style (not ultra-modern or traditional)

**Post-Processing:**
- [ ] Warm color grading (match sand palette)
- [ ] Natural saturation (not oversaturated)
- [ ] Sharp but not oversharpened
- [ ] True-to-life colors

---

## Launch Checklist

### Website Pages (Minimum Viable)
- [ ] Homepage (hero, featured deal, about, contact)
- [ ] Deal of the Week page
- [ ] Product category pages (LVP, laminate, hardwood)
- [ ] Individual product pages
- [ ] About Us page
- [ ] Contact page
- [ ] Blog (initial posts)

### Essential Content
- [ ] Brand story (about page)
- [ ] Deal of the Week setup
- [ ] 3-5 product category descriptions
- [ ] 5-10 featured product pages
- [ ] 2-3 blog posts (educational)

### Technical Setup
- [ ] Google Fonts loaded (Montserrat + Open Sans)
- [ ] CSS design system implemented (colors, typography, components)
- [ ] Mobile-responsive (test at 1000px and 700px breakpoints)
- [ ] SEO meta tags (title, description, og:* tags)
- [ ] Google Analytics installed
- [ ] Contact form functional

### Marketing Setup
- [ ] Google My Business claimed and optimized
- [ ] Instagram profile setup (bio, profile pic)
- [ ] Facebook page setup
- [ ] Email signup form on website
- [ ] Initial email welcome sequence

---

## Resources & Reference Files

**Full Brand Guidelines:**  
`projects/VictoriaFlooringOutlet/brand/BRAND_GUIDELINES.md`

**Visual Reference:**  
`projects/VictoriaFlooringOutlet/brand/VISUAL_REFERENCE.md`

**Messaging Framework:**  
`projects/VictoriaFlooringOutlet/brand/MESSAGING_FRAMEWORK.md`

**Competitive Positioning:**  
`projects/VictoriaFlooringOutlet/brand/COMPETITIVE_POSITIONING.md`

**Design System (CSS):**  
`projects/VictoriaFlooringOutlet/deliverables/code/styles.css`

**Reference Implementations:**  
`projects/VictoriaFlooringOutlet/deliverables/code/index.html`  
`projects/VictoriaFlooringOutlet/deliverables/code/blog.html`

---

## Contact & Approval

**Brand Guidelines Author:** Vale (Brand Strategy Agent)  
**Technical Implementation:** Devan (Builder Agent)  
**Project Coordination:** Bernard  
**Client:** Victoria Flooring Outlet  

**Status:** Draft v1.0 (pending client review and approval)  
**Next Steps:** Client review → revisions → final approval → launch

---

## Common Questions

**Q: Can I use different fonts?**  
A: Montserrat + Open Sans are core to brand identity. If you must substitute, choose similar geometric sans-serif (heading) + humanist sans-serif (body).

**Q: What if I need a color not in the palette?**  
A: Try to work within palette first. If absolutely necessary, stay within warm, neutral tones (no bright blues, harsh reds, or neon colors).

**Q: Can I use stock photos?**  
A: Yes, but choose carefully—bright, warm-toned, real room settings (not obviously staged). Avoid generic "perfect showroom" photos.

**Q: How strict is the voice/tone?**  
A: Guidelines are principles, not scripts. Stay conversational, honest, and helpful. When in doubt, read it aloud—does it sound like a real person talking?

**Q: What if competitors copy our approach?**  
A: Brand is more than visuals/messaging—it's consistent execution and authentic delivery. Stay true to principles, and the brand builds over time.

---

**Version:** 1.0  
**Date:** March 12, 2026  
**Last Updated:** March 12, 2026
