# Vercel Deployment Reference (OpenClaw Dashboard)

Last verified: 2026-03-09 22:08 PDT

## Source of truth (Git)

Default remote:
- Name: `origin`
- URL: `https://github.com/theyellowbirdcompany/test.git`

This repository now uses **only** the Yellow Bird company remote for pushes and deployment-triggering commits.

## Vercel

- Account/ownership: **Yellow Bird company Vercel account**
- Production URL: `https://openclaw-dashboard.vercel.app`
- Project: `openclaw-dashboard`

## Standard deploy flow

From `/home/clawd/.openclaw/workspace/projects/command-center`:

```bash
git push origin main
```

Fallback (if Git auto-deploy is delayed and Vercel CLI is authenticated):

```bash
npx vercel --prod
```

## Verification commands

```bash
git remote -v
git ls-remote origin refs/heads/main
```
