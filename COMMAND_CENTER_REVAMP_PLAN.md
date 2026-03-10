# Command Center Revamp - Project Plan
**Project Lead:** Bernard (Strategist)  
**Status:** Phase 0 - Planning Complete  
**Created:** 2026-03-10 01:07 PDT  
**Target:** Production-grade isometric command center with Yellow Bird branding

---

## 🎯 Vision Statement

Transform the Command Center dashboard from functional to **production-grade** — a polished, Yellow Bird-branded interface that embodies operational minimalism, leverages all 8 design system layers, and delivers accurate real-time metrics with visual distinction matching our reference aesthetic.

**Reference Image:** `/home/clawd/.openclaw/workspace/projects/command-center/command-center-reference.jpg`

**Design Goals:**
- Isometric office layout with hexagonal workstation pods
- Color-coded agent identity desks
- Central collaborative hub visualization
- Goals/Workflow visibility board
- Tech/holographic aesthetic with clean lines
- Individual agent stations clearly labeled and distinct

---

## 📊 Current State Assessment

### ✅ Completed Foundation
- Basic dashboard infrastructure exists
- Agent status tracking implemented (recently fixed via Task #006)
- Live Supabase integration working
- File system visualizer added (Task #008)
- Design system documentation complete (`BRAND.md`)
- Component library established (10 components from Phase 2)
- Performance monitoring tools in place

### ⚠️ Critical Blockers

**1. Security Vulnerabilities (12 Supabase warnings) - MUST FIX FIRST**
- 3 functions with mutable search_path (privilege escalation risk)
- 9 tables with RLS policies bypassed (anonymous access to ALL agent data)
- All agent tracking tables exposed without proper security

**2. Metric Tracking Issues**
- Metrics exist but "not properly tracked" per Brett's feedback
- Need robust, real-time metrics display
- Current implementation may have accuracy/reliability gaps

**3. Visual Refinement Gap**
- Current design is "unsatisfactory" per task brief
- Needs isometric aesthetic transformation
- Missing hexagonal pod layout
- Collaboration hub visualization not implemented
- Goals/workflow board not present

### 📦 Existing Assets
- React + Vite + Tailwind setup
- Framer Motion for animations
- Supabase client configured
- Vercel deployment pipeline
- Agent avatars (Bird PNG assets)
- Yellow Bird brand guidelines (`BRAND.md`)

---

## 🏗️ Multi-Phase Build Plan

### **Phase 1: Security Foundation (CRITICAL - DO FIRST)**
**Owner:** Devan  
**Duration:** 2-3 hours  
**Status:** Not Started

**Objectives:**
1. Fix all 12 Supabase security warnings
2. Implement proper RLS policies
3. Secure function search paths
4. Validate security posture before proceeding

**Deliverables:**
- [ ] SQL migration scripts for 3 function fixes (explicit search_path)
- [ ] SQL migration scripts for 9 RLS policy fixes (proper auth.uid() checks or service-role-only)
- [ ] Security audit report confirming 0 warnings
- [ ] Documentation of new RLS policy structure
- [ ] Rollback plan in case of issues

**Acceptance Criteria:**
- Supabase database linter shows 0 warnings
- All agent tables properly secured with RLS
- Anonymous access properly restricted
- Service role access still functional for agent writes

**Dependencies:** None (this blocks everything else)

---

### **Phase 2: Deep Research & Design Specification**
**Owner:** Christopher  
**Duration:** 4-6 hours  
**Status:** Not Started

**Objectives:**
1. Research best-in-class command center UIs (military, ops, gaming)
2. Analyze isometric dashboard design patterns
3. Study hexagonal/pod layout systems
4. Document interaction models for real-time collaboration visualization
5. Compile innovation opportunities beyond current implementation

**Research Focus Areas:**
- Isometric visualization techniques (CSS 3D transforms vs SVG vs Canvas)
- Real-time collaboration hub design patterns
- Metrics dashboard best practices (APM tools, observability platforms)
- Agent identity visualization in multi-agent systems
- Spatial UI navigation patterns

**Deliverables:**
- [ ] Research report: "Command Center UI Innovation Study" (markdown)
- [ ] Visual inspiration board (links + screenshots)
- [ ] Technical approach recommendations (isometric implementation)
- [ ] Interaction pattern library (collaboration visualization)
- [ ] Metric display best practices summary

**Acceptance Criteria:**
- 10+ reference examples documented with analysis
- Clear technical recommendations for isometric layout
- Actionable design patterns for Phase 3
- Sign-off from Vale on brand alignment

**Dependencies:** None (runs in parallel with Phase 1)

---

### **Phase 3: Comprehensive Design Brief**
**Owner:** Vale  
**Duration:** 3-4 hours  
**Status:** Not Started

**Objectives:**
1. Translate visual reference into actionable design specifications
2. Define component hierarchy and layout structure
3. Specify color usage per agent desk/zone
4. Detail animation and interaction patterns
5. Create metrics dashboard wireframes
6. Ensure strict `BRAND.md` compliance

**Deliverables:**
- [ ] **Design Brief Document** (markdown with ASCII wireframes)
  - Layout structure: hexagonal pod positioning
  - Agent desk specifications (7 desks, color mapping)
  - Central hub design (collaboration visualization)
  - Goals/workflow board layout
  - Metric card specifications
  - Typography hierarchy
  - Animation timing chart
  - Accessibility requirements
- [ ] Component specifications (16+ components)
- [ ] Color palette application guide (agent colors in context)
- [ ] Interaction flow diagrams
- [ ] Mobile/responsive strategy

**Acceptance Criteria:**
- Design brief is comprehensive enough for Devan to build from
- All BRAND.md rules applied and documented
- Reference image aesthetic translated to specs
- Sign-off from Bernard on feasibility

**Dependencies:** Phase 2 research complete

---

### **Phase 4: Metric Integration Architecture**
**Owner:** Atlas  
**Duration:** 3-4 hours  
**Status:** Not Started

**Objectives:**
1. Audit current metric tracking implementation
2. Design robust real-time metrics pipeline
3. Define data aggregation strategy
4. Plan performance monitoring integration
5. Ensure metric accuracy and reliability

**Deliverables:**
- [ ] **Metrics Architecture Document**
  - Data sources (Supabase tables to query)
  - Aggregation logic (how to compute metrics)
  - Real-time update strategy (subscriptions vs polling)
  - Error handling and fallback behavior
  - Performance budget (query optimization)
- [ ] Database query optimization plan
- [ ] Real-time subscription design
- [ ] Metric validation test plan
- [ ] Cost monitoring setup (query volume tracking)

**Acceptance Criteria:**
- Clear data flow documented: source → aggregation → display
- Performance benchmarks defined (query response < 200ms)
- Real-time update latency < 2 seconds
- Metric accuracy validation strategy defined
- Sign-off from Devan on implementation feasibility

**Dependencies:** Phase 1 security fixes complete (need proper RLS for queries)

---

### **Phase 5: Component Library Build**
**Owner:** Devan  
**Duration:** 8-10 hours  
**Status:** Not Started

**Objectives:**
1. Build core component library per design brief
2. Implement isometric layout system
3. Create agent desk components (7 variations)
4. Build collaboration hub visualization
5. Develop metrics display components

**Component Scope (Estimated 20+ components):**

**Layout Components:**
- `IsometricGrid` - Base grid system with perspective
- `HexagonalPod` - Agent desk container (reusable)
- `CollaborationHub` - Central hub visualization
- `WorkflowBoard` - Goals/task display panel

**Agent Components:**
- `AgentDesk` - Individual agent workspace (7 color variants)
- `AgentAvatar` - Agent identity display with status
- `AgentStatusIndicator` - Real-time status pulse/glow
- `DeskGlow` - Ambient lighting effect per agent color

**Metric Components:**
- `MetricCard` - Standard metric display
- `TrendChart` - Line chart with growth animation
- `StatusGrid` - Multi-metric overview
- `RealtimeCounter` - Animated number roll

**Visualization Components:**
- `CollaborationLine` - SVG connection between desks
- `DataFlowIndicator` - Animated data flow visualization
- `FloorPlanOverlay` - Spatial layout container

**UI Components:**
- `CommandButton` - Gold primary CTA
- `StatusBadge` - Agent color-coded status
- `TaskLabel` - Current task display
- `TimeDisplay` - Last updated timestamp

**Deliverables:**
- [ ] Component library (20+ components)
- [ ] Storybook/documentation for each component
- [ ] Unit tests for interactive components
- [ ] Animation performance validation
- [ ] Accessibility audit (WCAG 2.1 AA)

**Acceptance Criteria:**
- All components follow BRAND.md specifications
- No animation frame drops (60fps maintained)
- All interactive elements keyboard-accessible
- Components are reusable and composable
- Sign-off from Vale on visual fidelity

**Dependencies:** Phase 3 design brief complete

---

### **Phase 6: Integration & Assembly**
**Owner:** Devan  
**Duration:** 6-8 hours  
**Status:** Not Started

**Objectives:**
1. Assemble components into complete dashboard
2. Integrate real-time metric pipeline
3. Wire up Supabase subscriptions
4. Implement isometric layout with proper perspective
5. Add collaboration visualization logic

**Integration Points:**
- Connect `AgentDesk` components to live `agent_status` data
- Wire `MetricCard` components to Atlas's metric pipeline
- Implement `CollaborationLine` rendering between active agents
- Populate `WorkflowBoard` with live `todos` data
- Connect status indicators to real-time subscriptions

**Deliverables:**
- [ ] Fully integrated dashboard page
- [ ] Real-time data flow working end-to-end
- [ ] All 7 agent desks rendering with live status
- [ ] Central collaboration hub active
- [ ] Metrics displaying accurate real-time data
- [ ] Performance monitoring active (Lighthouse CI)

**Acceptance Criteria:**
- Dashboard loads in < 3 seconds (First Contentful Paint)
- Real-time updates visible within 2 seconds of data change
- No console errors or warnings
- All animations smooth (60fps)
- Responsive behavior on tablet/mobile
- Build passes all linters and type checks

**Dependencies:** Phase 4 (metrics) + Phase 5 (components) complete

---

### **Phase 7: Quality Assurance & Polish**
**Owner:** Bernard (coordinating all agents)  
**Duration:** 4-6 hours  
**Status:** Not Started

**Objectives:**
1. Comprehensive testing across all browsers
2. Accessibility audit and fixes
3. Performance optimization
4. Visual refinement and pixel-pushing
5. Documentation completion

**Testing Matrix:**
- [ ] Chrome/Edge/Safari/Firefox cross-browser testing
- [ ] Desktop (1920x1080, 1440x900, 2560x1440)
- [ ] Tablet (iPad, Android tablet)
- [ ] Mobile (iPhone, Android phone)
- [ ] Keyboard navigation full flow
- [ ] Screen reader compatibility (NVDA/JAWS)
- [ ] Reduced motion preference respected

**Performance Validation:**
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices)
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Bundle size analysis (code splitting if needed)
- [ ] Image optimization validation
- [ ] Database query performance check

**Visual Polish:**
- [ ] Pixel-perfect alignment check (all components)
- [ ] Animation timing refinement
- [ ] Color contrast validation (WCAG AA)
- [ ] Typography hierarchy verification
- [ ] Responsive breakpoint testing

**Deliverables:**
- [ ] QA report (issues found + resolution status)
- [ ] Performance audit results
- [ ] Accessibility compliance report
- [ ] Browser compatibility matrix
- [ ] Final sign-off from Vale on visual quality

**Acceptance Criteria:**
- Zero critical bugs
- All BRAND.md standards met
- Performance targets achieved
- Accessibility compliance verified
- Production-ready status confirmed

**Dependencies:** Phase 6 integration complete

---

### **Phase 8: Documentation & Handoff**
**Owner:** Scribe  
**Duration:** 3-4 hours  
**Status:** Not Started

**Objectives:**
1. Document all technical decisions
2. Create user guide for Command Center
3. Write deployment runbook
4. Document metric definitions
5. Create maintenance guide

**Deliverables:**
- [ ] **Technical Documentation**
  - Architecture overview
  - Component API documentation
  - Data flow diagrams
  - Supabase schema documentation
  - Performance optimization notes
- [ ] **User Guide**
  - Command Center feature walkthrough
  - Agent desk interpretation guide
  - Metric definitions and calculation methods
  - Troubleshooting common issues
- [ ] **Deployment Runbook**
  - Build and deploy process
  - Environment variable checklist
  - Rollback procedures
  - Monitoring setup guide
- [ ] **Maintenance Guide**
  - How to add new metrics
  - How to add new agent desk
  - Component update procedures
  - Database migration workflow

**Acceptance Criteria:**
- All documentation is clear and actionable
- New developer can deploy from docs alone
- Metric definitions are unambiguous
- Maintenance procedures are step-by-step
- Sign-off from Bernard on completeness

**Dependencies:** Phase 7 QA complete

---

### **Phase 9: Deployment & Iteration**
**Owner:** Atlas  
**Duration:** 2-3 hours + ongoing iteration  
**Status:** Not Started

**Objectives:**
1. Deploy to Vercel production
2. Validate live environment
3. Monitor real-world performance
4. Set up alerting and monitoring
5. Plan iteration cycle based on live data

**Deployment Steps:**
- [ ] Final production build test
- [ ] Environment variable verification (Vercel)
- [ ] Deploy to production
- [ ] Smoke test all features live
- [ ] Validate real-time data connections
- [ ] Confirm metric accuracy in production

**Monitoring Setup:**
- [ ] Performance monitoring (Core Web Vitals)
- [ ] Error tracking (Sentry or similar)
- [ ] Analytics integration (optional)
- [ ] Database query monitoring
- [ ] Cost tracking dashboard

**Iteration Planning:**
- [ ] Collect initial feedback
- [ ] Identify quick-win improvements
- [ ] Plan A/B test experiments (if applicable)
- [ ] Document learnings for future phases

**Deliverables:**
- [ ] Live production URL
- [ ] Monitoring dashboard access
- [ ] Post-deployment report
- [ ] Iteration backlog (prioritized)

**Acceptance Criteria:**
- Production deployment successful
- All features working in live environment
- Monitoring actively tracking key metrics
- Zero critical production issues in first 24 hours
- Brett approves final product

**Dependencies:** Phase 8 documentation complete

---

## 🔄 Iteration & Review Process

### Review Checkpoints
1. **End of Phase 3:** Design review with Vale + Bernard
2. **End of Phase 5:** Component review with Vale (visual fidelity)
3. **End of Phase 6:** Integration review with full team
4. **End of Phase 7:** Final QA review and sign-off
5. **Post-deployment:** Live product review and iteration planning

### Feedback Loop
- All design iterations reviewed by Vale for BRAND.md compliance
- All technical builds reviewed by Bernard for quality and feasibility
- All metric implementations reviewed by Atlas for accuracy
- User experience validated through Brett's review

### Definition of Done (per phase)
- All deliverables checked off
- All acceptance criteria met
- Dependencies for next phase satisfied
- Sign-off from designated reviewer
- Documentation updated
- Changes committed to git

---

## 📅 Timeline & Resource Estimate

### Critical Path
1. Phase 1 (Security) - **MUST START IMMEDIATELY** - 2-3 hours
2. Phases 2-4 run in parallel - 4-6 hours
3. Phase 5 (Component Build) - 8-10 hours
4. Phase 6 (Integration) - 6-8 hours
5. Phase 7 (QA) - 4-6 hours
6. Phase 8 (Documentation) - 3-4 hours
7. Phase 9 (Deployment) - 2-3 hours + iteration

**Total Estimated Duration:** 29-40 hours of focused work

**Parallelization Strategy:**
- Phases 1, 2, 4 can run in parallel (different agents)
- Phase 3 depends on Phase 2
- Phase 5 depends on Phase 3
- Phase 6 depends on Phases 4 + 5
- Phases 7-9 are sequential

**Realistic Calendar Time:** 5-7 days with proper coordination

### Agent Workload Distribution

| Agent | Primary Phases | Estimated Hours | Role |
|-------|---------------|-----------------|------|
| **Devan** | 1, 5, 6 | 16-21 hours | Heavy lifting (security + build + integration) |
| **Christopher** | 2 | 4-6 hours | Research and innovation |
| **Vale** | 3, 7 (review) | 5-6 hours | Design specification + quality validation |
| **Atlas** | 4, 9 | 5-7 hours | Metrics architecture + deployment |
| **Scribe** | 8 | 3-4 hours | Documentation |
| **Bernard** | 0, 7 | 6-8 hours | Planning + orchestration + QA coordination |

---

## 🚨 Risk Register

### High-Impact Risks

**1. Supabase Security Fix Breaking Existing Functionality**
- **Probability:** Medium
- **Impact:** High
- **Mitigation:** Test thoroughly in development; maintain rollback scripts; validate all agent logging still works
- **Owner:** Devan

**2. Isometric Layout Implementation Complexity**
- **Probability:** Medium
- **Impact:** Medium
- **Mitigation:** Christopher's research phase identifies best approach; prototype early; have fallback simpler design if needed
- **Owner:** Devan + Christopher

**3. Real-time Metric Accuracy Issues**
- **Probability:** Medium
- **Impact:** High
- **Mitigation:** Atlas designs robust validation; test with real agent activity; document calculation methods clearly
- **Owner:** Atlas

**4. Performance Degradation with Complex Animations**
- **Probability:** Low-Medium
- **Impact:** Medium
- **Mitigation:** Performance budget defined; monitor frame rates during build; simplify animations if needed
- **Owner:** Devan + Bernard

**5. Scope Creep / Perfectionism**
- **Probability:** Medium
- **Impact:** Medium
- **Mitigation:** Clear acceptance criteria per phase; time-box iterations; Bernard enforces "good enough" vs "perfect"
- **Owner:** Bernard

### Medium-Impact Risks

**6. Browser Compatibility Issues**
- **Mitigation:** Early cross-browser testing; use standard CSS transforms; test fallbacks

**7. Mobile Responsive Complexity**
- **Mitigation:** Define mobile-first breakpoints early; accept simplified mobile view if needed

**8. Documentation Lag**
- **Mitigation:** Scribe updates docs incrementally; each phase includes doc updates

---

## 📋 Success Metrics

### Quantitative Targets
- **Lighthouse Performance Score:** > 90
- **First Contentful Paint:** < 2.5 seconds
- **Time to Interactive:** < 3.5 seconds
- **Database Query Response Time:** < 200ms (p95)
- **Real-time Update Latency:** < 2 seconds
- **Bundle Size:** < 500KB (gzipped)
- **Accessibility Score:** 100 (WCAG AA compliance)
- **Zero Critical Bugs:** at production launch

### Qualitative Targets
- Brett's approval: "This is production-grade"
- Vale's sign-off: "This embodies Yellow Bird brand"
- Visual distinction: Unmistakably different from prior version
- User delight: "Wow" factor on first load
- Maintainability: New dev can extend within 1 day of onboarding

---

## 🔧 Tools & Technologies

### Development Stack
- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS + custom CSS (isometric transforms)
- **Animation:** Framer Motion
- **Data:** Supabase (PostgreSQL + real-time)
- **Deployment:** Vercel
- **Version Control:** Git

### Design Tools
- Markdown (design briefs, wireframes with ASCII art)
- Browser DevTools (visual debugging)
- Lighthouse CI (performance monitoring)

### Monitoring & Validation
- Lighthouse (performance)
- axe DevTools (accessibility)
- React DevTools (component debugging)
- Supabase Dashboard (database monitoring)
- Vercel Analytics (Core Web Vitals)

---

## 📞 Communication Plan

### Status Updates
- **Bernard:** Posts phase completion updates to BULLETIN_BOARD.md
- **All Agents:** Update task status when starting/completing work
- **Blockers:** Immediately escalate to Bernard via bulletin board
- **Daily Sync:** Bernard reviews progress, unblocks, re-prioritizes

### Handoff Protocol
- Completing agent posts summary + deliverable locations to bulletin board
- Next agent acknowledged receipt and confirms dependencies satisfied
- No phase starts until prior dependencies explicitly confirmed

### Decision Escalation
- **Technical decisions:** Devan makes calls, Bernard approves if cross-phase impact
- **Design decisions:** Vale makes calls, Bernard approves if scope impact
- **Scope/priority changes:** Bernard decides, documents on bulletin board

---

## 🎬 Next Actions (Immediate)

### 1. Bernard (me) - NOW
- [x] Complete project plan
- [ ] Post plan to BULLETIN_BOARD.md
- [ ] Delegate Phase 1 to Devan
- [ ] Delegate Phase 2 to Christopher (can run in parallel)
- [ ] Set up cron job for project monitoring

### 2. Devan - URGENT (Phase 1)
- [ ] Read full project plan
- [ ] Audit current Supabase RLS policies
- [ ] Write SQL migration scripts for security fixes
- [ ] Test migrations in development
- [ ] Execute migrations in production
- [ ] Validate 0 security warnings
- [ ] Post completion update to bulletin board

### 3. Christopher - START SOON (Phase 2)
- [ ] Read project plan
- [ ] Review reference image in detail
- [ ] Begin command center UI research
- [ ] Compile design inspiration
- [ ] Document technical recommendations
- [ ] Post research findings to bulletin board

### 4. All Other Agents - STANDBY
- Atlas: Prepare for Phase 4 (metrics architecture)
- Vale: Prepare for Phase 3 (design brief)
- Scribe: Prepare for Phase 8 (documentation)
- Await delegation from Bernard as dependencies satisfy

---

## 📚 Reference Documents

- **Design Reference:** `/home/clawd/.openclaw/workspace/projects/command-center/command-center-reference.jpg`
- **Brand Guidelines:** `/home/clawd/.openclaw/workspace/BRAND.md`
- **Security Credentials:** `/home/clawd/.openclaw/workspace/SUPABASE_CREDENTIALS.md`
- **Current Integration Docs:** `/home/clawd/.openclaw/workspace/projects/command-center/SUPABASE_LIVE_DATA_INTEGRATION.md`
- **Deployment Guide:** `/home/clawd/.openclaw/workspace/projects/command-center/DEPLOY_COMMAND_CENTER.md`
- **Git Guide:** `/home/clawd/.openclaw/workspace/projects/command-center/GIT_PUSH_GUIDE.md`
- **Task History:** `/home/clawd/.openclaw/workspace/BULLETIN_BOARD.md`

---

## ✅ Sign-off

**Plan Author:** Bernard (Strategist)  
**Date:** 2026-03-10 01:07 PDT  
**Status:** APPROVED - Ready for Execution

**Reviewed by:**
- [ ] Vale (Design alignment with BRAND.md) - Pending
- [ ] Atlas (Infrastructure feasibility) - Pending  
- [ ] Devan (Technical feasibility) - Pending

**Final Authority:** Bernard (Project Lead for Task #007)

---

*This plan is a living document. Updates will be tracked on BULLETIN_BOARD.md as phases complete and learnings emerge.*
