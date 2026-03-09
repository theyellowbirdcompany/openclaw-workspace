# PIPELINES.md — Standard Operating Pipelines

Three core pipelines. Use the command format to trigger each one.
If Brett doesn't specify which pipeline, Claw asks before proceeding.

---

## Pipeline 1 — Project Blueprint Pipeline

**When to use:** Project is messy or undefined. Need a clean plan before building anything.

**Command:** `Run blueprint pipeline for [project]`

### Flow

| Step | Agent | Task | Output |
|------|-------|------|--------|
| 1 | Christopher | Market landscape, competitors, audience, demand, opportunity gaps | Research Brief (with sources) |
| 2 | Radar | Competitive matrix, positioning, pricing, weaknesses | Competitor Snapshot |
| 3 | Atlas | Operating shape: what it is, how it makes money, user journey | Project Structure + Offer Draft |
| 4 | Vale | Positioning, value prop, brand voice, messaging pillars | Messaging Guide |
| 5 | Bernard | Technical architecture, recommended stack, core modules | Build Plan (high-level) |
| 6 | Stu | 30/60/90 plan, channels, KPIs, partnerships, monetization paths | Go-To-Market Plan |

### Completion Criteria
Blueprint is NOT complete until Claw delivers a single final bundle containing:
- [ ] Research Brief
- [ ] Competitor Snapshot
- [ ] Project Structure + Offer Draft
- [ ] Messaging Guide
- [ ] Build Plan
- [ ] 30/60/90 Go-To-Market Plan

---

## Pipeline 2 — Content Factory Pipeline

**When to use:** Consistent content output needed — blog → social → promo.

**Command:** `Run content factory on [topic] for [project]`

### Flow

| Step | Agent | Task | Output |
|------|-------|------|--------|
| 1 | Christopher | Stats, examples, claims validation, citations | Content Brief |
| 2 | Tobias | SEO title, meta description, outline, full draft | Publish-Ready Article |
| 3 | Matthew | Break article into platform posts (IG/LinkedIn/X/TikTok) | Social Pack (hashtags + posting times) |
| 4 | Stu | Distribution + promotion plan | Promo Plan (channels + actions) |
| 5 | Piper *(optional but recommended)* | Defines how to measure success | Tracking Plan (KPIs + what to watch) |

### Completion Criteria
Pipeline is NOT complete until the final bundle contains:
- [ ] Content Brief
- [ ] Publish-Ready Article
- [ ] Social Pack
- [ ] Promo Plan
- [ ] Tracking Plan *(optional)*

---

## Pipeline 3 — Product Build Pipeline

**When to use:** Shipping a feature, fixing a mess, or building a new section.

**Command:** `Run product build pipeline for [project]: [feature/task]`

### Flow

| Step | Agent | Task | Output |
|------|-------|------|--------|
| 1 | Atlas | Problem definition, user journey, constraints, success criteria | Functional Spec |
| 2 | Bernard | Technical approach, modules, data flows, risks | Technical Plan |
| 3 | Devan | Builds UI/components following the plan | Implementation Draft (code + notes) |
| 4 | Patch | Reviews for bugs, edge cases, performance, error handling | Fix List + Patch Suggestions |
| 5 | Scribe | Writes docs, README, release notes, internal SOP | Docs Update |

### Completion Criteria
Pipeline is NOT complete until the final bundle contains:
- [ ] Functional Spec
- [ ] Technical Plan
- [ ] Implementation Draft
- [ ] Fix List + Patch Suggestions
- [ ] Docs Update

---

## Pipeline Selection Guide

| If Brett says... | Use |
|-----------------|-----|
| "We need a plan for [project]" | Pipeline 1 — Blueprint |
| "Figure out [project] / it's a mess" | Pipeline 1 — Blueprint |
| "Write about [topic]" | Pipeline 2 — Content Factory |
| "Create content for [project]" | Pipeline 2 — Content Factory |
| "Build [feature]" | Pipeline 3 — Product Build |
| "Fix [thing] / ship [thing]" | Pipeline 3 — Product Build |
| Unclear | Claw asks: "Which pipeline — Blueprint, Content Factory, or Product Build?" |

---

## Notes for Claw

- Always run each step sequentially — previous agent's output feeds the next agent's brief
- Each agent's output must be saved to their `workspace/` before moving to the next step
- Do not deliver partial bundles — hold until all completion criteria are met
- If any step fails or is incomplete, flag it to Brett before continuing
- Bundle all outputs in a single summary delivery message at the end
