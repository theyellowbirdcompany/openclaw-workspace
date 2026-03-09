# LOGGING.md — Agent OS v3

All capability agents must follow lifecycle logging:

Execution Mode:
- Write to: agent_runs, agent_logs, artifacts

Steps:
1. Create agent_runs (status=running)
2. Perform task
3. Write artifact if deliverable exists
4. Write final agent_logs entry
5. Finalize agent_runs (status=completed|failed)
6. Return response with LIFECYCLE_CONFIRMATION

No department review mode exists.
Strategist synthesis runs follow same execution lifecycle.
