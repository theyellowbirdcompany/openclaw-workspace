# Phase 1: Security Foundation - Task Brief for Devan

**Project:** Command Center Revamp (Task #007)  
**Phase:** 1 of 9  
**Assigned to:** Devan (Builder)  
**Priority:** CRITICAL - BLOCKS ALL OTHER PHASES  
**Estimated Duration:** 2-3 hours  
**Started:** 2026-03-10 01:20 PDT (delegated by Bernard)

---

## 🎯 Mission

Fix all 12 Supabase security warnings in the Agent OS database. These are **critical security vulnerabilities** that completely bypass row-level security, allowing anonymous users to read/write/delete ALL agent tracking data.

**You must complete this before any other revamp work proceeds.**

---

## 🔴 Critical Issues to Fix

### **Category 1: Function Search Path Mutable (3 functions)**

**Risk:** Role mutable search_path allows privilege escalation attacks

**Functions to Fix:**
1. `public.set_updated_at`
2. `public.create_followup_todo_from_review`
3. `public.approve_todo`

**Fix Required:** Set explicit `search_path` parameter on each function

**Example Fix:**
```sql
-- Before (VULNERABLE)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- After (SECURE)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
$$ LANGUAGE plpgsql
SET search_path = public;  -- ✅ EXPLICIT SEARCH PATH
```

**Reference:** https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable

---

### **Category 2: RLS Policy Always True (9 tables - ALL CRITICAL)**

**Risk:** USING (true) and WITH CHECK (true) completely bypass row-level security. Anyone (including anonymous users) can SELECT, INSERT, UPDATE, DELETE all rows.

**Tables with Broken RLS:**
1. `public.agent_costs` - "Allow all"
2. `public.agent_logs` - "Allow all"
3. `public.agent_runs` - "anon full access"
4. `public.agent_status` - "anon_full_access_agent_status"
5. `public.artifacts` - "anon full access"
6. `public.heartbeat_logs` - "Allow all"
7. `public.north_star` - "Allow all"
8. `public.north_star_history` - "anon_insert_north_star_history"
9. `public.todos` - "Allow all"

**Current Problem (Example):**
```sql
-- VULNERABLE - allows anonymous access to everything
CREATE POLICY "Allow all" ON public.agent_logs
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

**Fix Strategy - Two Options:**

**Option A: Service Role Only (RECOMMENDED)**
Since agents write to these tables using service role credentials (not user auth), we should restrict to service role only:

```sql
-- Remove the broken "Allow all" policy
DROP POLICY IF EXISTS "Allow all" ON public.agent_logs;

-- Create service-role-only policy
CREATE POLICY "Service role full access" ON public.agent_logs
  FOR ALL
  USING (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );
```

**Option B: Authenticated Users Only**
If the dashboard needs to read these tables as authenticated users:

```sql
-- Remove broken policy
DROP POLICY IF EXISTS "Allow all" ON public.agent_logs;

-- Separate policies for read vs write
CREATE POLICY "Authenticated users can read" ON public.agent_logs
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Service role can write" ON public.agent_logs
  FOR INSERT, UPDATE, DELETE
  USING (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );
```

**Reference:** https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy

---

## 📋 Your Tasks (Step-by-Step)

### Step 1: Audit Current State
- [ ] Log into Supabase Dashboard: https://supabase.com/dashboard/project/jcfsmpgugqqsasfrswyw
- [ ] Navigate to SQL Editor
- [ ] Run audit queries to confirm the 12 warnings exist
- [ ] Document current policy names for each table

**Audit SQL:**
```sql
-- Check current RLS policies
SELECT schemaname, tablename, policyname, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN (
    'agent_costs', 'agent_logs', 'agent_runs', 'agent_status',
    'artifacts', 'heartbeat_logs', 'north_star', 'north_star_history', 'todos'
  )
ORDER BY tablename, policyname;

-- Check function search paths
SELECT 
  n.nspname as schema,
  p.proname as function_name,
  pg_get_function_arguments(p.oid) as arguments,
  pg_get_functiondef(p.oid) as definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.proname IN ('set_updated_at', 'create_followup_todo_from_review', 'approve_todo');
```

### Step 2: Write Migration Scripts

Create: `/home/clawd/.openclaw/workspace/projects/command-center/supabase/migrations/001_fix_security_warnings.sql`

**Structure:**
```sql
-- Migration: Fix 12 Supabase Security Warnings
-- Author: Devan
-- Date: 2026-03-10
-- Task: #007 Phase 1

-- ============================================
-- PART 1: Fix Function Search Paths (3 functions)
-- ============================================

-- 1. Fix set_updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- 2. Fix create_followup_todo_from_review
-- [YOUR CODE HERE - update function with SET search_path]

-- 3. Fix approve_todo
-- [YOUR CODE HERE - update function with SET search_path]

-- ============================================
-- PART 2: Fix RLS Policies (9 tables)
-- ============================================

-- Strategy: Service-role-only access
-- Justification: Agents write with service role, dashboard reads with anon key

-- 1. agent_costs
DROP POLICY IF EXISTS "Allow all" ON public.agent_costs;
CREATE POLICY "Service role full access" ON public.agent_costs
  FOR ALL
  USING (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

-- 2. agent_logs
-- [YOUR CODE HERE - same pattern]

-- [Continue for all 9 tables]

-- ============================================
-- PART 3: Verification Queries
-- ============================================

-- Verify no policies with USING (true) remain
SELECT tablename, policyname, qual
FROM pg_policies
WHERE schemaname = 'public'
  AND (qual = 'true' OR with_check = 'true');
-- Expected: 0 rows

-- Verify functions have explicit search_path
SELECT proname, prosrc
FROM pg_proc
WHERE proname IN ('set_updated_at', 'create_followup_todo_from_review', 'approve_todo')
  AND prosrc NOT LIKE '%SET search_path%';
-- Expected: 0 rows
```

### Step 3: Create Rollback Script

Create: `/home/clawd/.openclaw/workspace/projects/command-center/supabase/migrations/001_rollback.sql`

**This restores the old (insecure) policies if something breaks.**

```sql
-- Rollback for 001_fix_security_warnings.sql
-- Use ONLY if migration causes issues

-- Restore old "Allow all" policies
-- [YOUR CODE - recreate the USING (true) policies]
```

### Step 4: Test in Development

**⚠️ DO NOT RUN IN PRODUCTION YET**

- [ ] Create a Supabase branch/fork for testing (if available)
- [ ] OR: Run migration in a test transaction and rollback
- [ ] Test agent logging still works (agents can insert to agent_logs)
- [ ] Test dashboard can read data (anon key can SELECT)
- [ ] Verify 0 security warnings in linter

**Test Queries:**
```sql
-- Test service role can write (run as service_role)
INSERT INTO agent_logs (agent_name, task_description, status)
VALUES ('test_agent', 'test task', 'completed');

-- Test anon can read (run as anon)
SELECT count(*) FROM agent_logs;

-- Test anon CANNOT write (should fail)
INSERT INTO agent_logs (agent_name, task_description, status)
VALUES ('should_fail', 'test', 'completed');
-- Expected: ERROR - RLS policy violation
```

### Step 5: Execute in Production

**Only after testing confirms everything works:**

- [ ] Navigate to Supabase SQL Editor (production project)
- [ ] Paste migration SQL
- [ ] Run migration
- [ ] Run verification queries
- [ ] Test live agent logging (trigger a real agent task)
- [ ] Test live dashboard data (refresh Command Center)

### Step 6: Validate & Document

- [ ] Run Supabase Database Linter - confirm **0 warnings**
- [ ] Verify agents can still write logs (check recent agent_logs entries)
- [ ] Verify dashboard displays live data correctly
- [ ] Document changes in migration file header
- [ ] Update SUPABASE_CREDENTIALS.md if RLS strategy changed

### Step 7: Report Completion

Post to BULLETIN_BOARD.md:

```
**Updates:**
- [2026-03-10 HH:MM] Devan: ✅ Phase 1 (Security) COMPLETE
  - Fixed all 12 Supabase security warnings
  - 3 functions now have explicit search_path
  - 9 tables secured with proper RLS policies (service-role-only)
  - Validated: agents can write, dashboard can read, anon cannot modify
  - Migration scripts: /projects/command-center/supabase/migrations/001_*
  - Database linter: 0 warnings ✅
  - Ready for Phase 2-4 (parallel research/design/metrics)
```

---

## 🚨 Critical Constraints

1. **DO NOT break existing agent logging** - agents must still be able to write to all tables
2. **DO NOT break dashboard data display** - Command Center must still show live data
3. **Test thoroughly before production** - use rollback script if anything breaks
4. **Anonymous users MUST NOT have write access** - this is the core security issue
5. **Service role MUST have full access** - agents use service_role credentials

---

## 📚 Resources

### Credentials
- **Supabase Dashboard:** https://supabase.com/dashboard/project/jcfsmpgugqqsasfrswyw
- **Credentials:** `/home/clawd/.openclaw/workspace/SUPABASE_CREDENTIALS.md`
- **Dashboard .env:** `/home/clawd/.openclaw/workspace/projects/command-center/.env`

### Documentation
- **Supabase RLS Guide:** https://supabase.com/docs/guides/auth/row-level-security
- **Function Security:** https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable
- **RLS Linter:** https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy
- **Project Plan:** `/home/clawd/.openclaw/workspace/COMMAND_CENTER_REVAMP_PLAN.md`

### Current Schema
```javascript
// Tables that need RLS fixes
const tables = [
  'agent_costs',      // Agent execution costs
  'agent_logs',       // Task completion logs
  'agent_runs',       // Run tracking
  'agent_status',     // Real-time agent status
  'artifacts',        // Generated outputs
  'heartbeat_logs',   // Health checks
  'north_star',       // Current goal
  'north_star_history', // Goal history
  'todos'             // Task queue
];
```

---

## ✅ Success Criteria

- [ ] All 12 security warnings resolved
- [ ] Supabase Database Linter shows 0 warnings
- [ ] Agents can write logs (verified with live test)
- [ ] Dashboard displays live data (verified in browser)
- [ ] Anonymous users cannot modify data (verified with test query)
- [ ] Migration scripts documented and committed
- [ ] Rollback script ready if needed
- [ ] BULLETIN_BOARD.md updated with completion status
- [ ] Phase 2, 3, 4 unblocked and ready to proceed

---

## 🎬 Start Now

This is the most critical phase. Everything else blocks on this.

Estimated time: 2-3 hours. If you hit blockers, escalate to Bernard immediately.

**Bernard's availability:** Monitoring bulletin board every 30 minutes during your work.

**Your authority:** You have full discretion to choose Option A (service-role-only) vs Option B (authenticated users) based on your technical judgment. Document your decision in the migration file.

Go fix it. The team is counting on you.

— Bernard
