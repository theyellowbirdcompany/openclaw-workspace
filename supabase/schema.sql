-- ============================================================
-- Agent OS v3 — Supabase Schema
-- Run this in the Supabase SQL editor on your new project
-- ============================================================

-- ─── agent_runs ────────────────────────────────────────────
-- One record per agent task run (created at start, updated at end)
create table if not exists agent_runs (
  id            uuid primary key default gen_random_uuid(),
  agent_name    text not null,
  department    text not null,
  task          text not null,
  status        text not null default 'running',   -- running | completed | failed
  trigger_source text,                              -- agent | todo
  started_at    timestamptz not null default now(),
  finished_at   timestamptz,
  created_at    timestamptz not null default now()
);

-- ─── agent_logs ────────────────────────────────────────────
-- One final log entry per run (written before returning output)
create table if not exists agent_logs (
  id               uuid primary key default gen_random_uuid(),
  run_id           uuid references agent_runs(id) on delete cascade,
  agent_name       text not null,
  department       text,
  task_description text not null,
  model_used       text,
  status           text not null,                  -- completed | failed
  message          text,
  created_at       timestamptz not null default now()
);

-- ─── artifacts ─────────────────────────────────────────────
-- Meaningful deliverables only (reports, code, plans, briefs)
create table if not exists artifacts (
  id           uuid primary key default gen_random_uuid(),
  run_id       uuid references agent_runs(id) on delete cascade,
  agent_name   text not null,
  artifact_type text,                              -- report | code | plan | brief | document
  title        text,
  content      text,
  created_at   timestamptz not null default now()
);

-- ─── tool_calls ────────────────────────────────────────────
-- Managed by orchestration layer only (Claw / Bernard)
create table if not exists tool_calls (
  id          uuid primary key default gen_random_uuid(),
  run_id      uuid references agent_runs(id) on delete cascade,
  agent_name  text not null,
  tool_name   text not null,
  input       jsonb,
  output      jsonb,
  called_at   timestamptz not null default now()
);

-- ─── run_reviews ───────────────────────────────────────────
-- Managed by department leads only (Bernard)
create table if not exists run_reviews (
  id              uuid primary key default gen_random_uuid(),
  run_id          uuid references agent_runs(id) on delete cascade,
  reviewer        text not null,
  review_target   text not null,
  self_review     boolean default false,
  passed          boolean,
  notes           text,
  created_at      timestamptz not null default now()
);

-- ─── todos ─────────────────────────────────────────────────
-- Managed by orchestration layer only
create table if not exists todos (
  id           uuid primary key default gen_random_uuid(),
  assigned_to  text,
  task         text not null,
  status       text not null default 'pending',    -- pending | in_progress | done
  priority     text,                               -- high | medium | low
  created_by   text,
  due_at       timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ─── RLS Policies ──────────────────────────────────────────
-- Enable Row Level Security on all tables
alter table agent_runs    enable row level security;
alter table agent_logs    enable row level security;
alter table artifacts     enable row level security;
alter table tool_calls    enable row level security;
alter table run_reviews   enable row level security;
alter table todos         enable row level security;

-- Allow anon key full access (agents use anon key)
create policy "anon full access" on agent_runs    for all using (true) with check (true);
create policy "anon full access" on agent_logs    for all using (true) with check (true);
create policy "anon full access" on artifacts     for all using (true) with check (true);
create policy "anon full access" on tool_calls    for all using (true) with check (true);
create policy "anon full access" on run_reviews   for all using (true) with check (true);
create policy "anon full access" on todos         for all using (true) with check (true);

-- ─── Done ──────────────────────────────────────────────────
-- Tables: agent_runs, agent_logs, artifacts, tool_calls, run_reviews, todos
