# Phase 1 Deployment Checklist

**When Atlas completes GitHub + Vercel setup:**

## 1. Verify Infrastructure
- [ ] GitHub repo exists at `github.com/theyellowbirdcompany/openclaw-command-center`
- [ ] Local repo has remote configured
- [ ] Can push to main branch
- [ ] Vercel is linked and auto-deploy configured
- [ ] Vercel env vars are set (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] Deployment URL is live and accessible

## 2. Brief Devan for Phase 1
- [ ] Spawn Devan as sub-agent with Phase 1 brief
- [ ] Specify Claude Code usage (free)
- [ ] Provide reference to:
  - Phase 1 brief: `/home/clawd/.openclaw/workspace/Bernard/command-center-v2-phase1-brief.md`
  - Project location: `/home/clawd/.openclaw/workspace/projects/command-center-v2/`
  - Reference image (inspiration only): `/home/clawd/.openclaw/workspace/projects/command-center/command-center-reference.jpg`

## 3. Quality Gate Preparation
- [ ] Review criteria ready (from brief)
- [ ] Screenshot verification plan ready
- [ ] Telegram message template ready
- [ ] Independent verification tools ready (browser, DevTools)

## 4. When Devan Submits Phase 1
- [ ] Take independent screenshot
- [ ] Verify all 7 agents shown
- [ ] Verify build passes
- [ ] Verify responsive layout
- [ ] Verify real Supabase data
- [ ] Check code quality (< 500 lines, Tailwind only, no prohibited libs)
- [ ] APPROVE or REJECT with specific feedback
- [ ] If APPROVED: Message Brett on Telegram with screenshot
- [ ] If REJECTED: Provide feedback, wait for iteration

## 5. When Phase 1 Approved
- [ ] Brief Devan for Phase 2
- [ ] Provide Phase 2 brief + schema note
- [ ] Repeat quality gate process

---

**Current Status:** Waiting for Atlas to complete GitHub + Vercel setup.
