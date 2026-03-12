# HEARTBEAT.md

# Heartbeats retired for task activation.

Tasks are dispatched via direct spawn / explicit briefing, not heartbeat polling.

If system monitoring is needed, use a separate lightweight health check for:
- Bird/process health
- cron health
- stuck-task detection

Do not use heartbeat prompts to wake agents for normal work.
