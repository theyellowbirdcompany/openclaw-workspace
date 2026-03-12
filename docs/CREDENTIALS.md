# Shared Credentials — Agent-Readable

**Purpose:** Agents read credentials from this file instead of transcribing from messages. This prevents corruption of long base64 tokens.

**Rules:**
- Only the user or Claw writes to this file
- Agents MUST `read` this file for any credential they need
- Never copy credentials from chat messages — always read from here
- Rotate credentials by updating this file

---

## Supabase (Agent OS)

```
SUPABASE_URL=https://vzpexiztpmojgyswtkze.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cGV4aXp0cG1vamd5c3d0a3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxODQ1MjQsImV4cCI6MjA4ODc2MDUyNH0.upBYzZheIkZSULw08H45LqsoxPQNEPuJs7qDk1mN_HQ
```

## GitHub

```
GITHUB_PAT=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
```

## Vercel

```
VERCEL_TOKEN=<set via vercel login on the machine — no token file needed>
```
