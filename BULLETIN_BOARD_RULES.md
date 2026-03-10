# Bulletin Board Rules

## For All Agents

### Task Workflow
1. **Read** the bulletin board (`BULLETIN_BOARD.md`)
2. **Update status** to `IN_PROGRESS` with timestamp
3. **Execute** the work
4. **Self-review** your changes
5. **Push to git** (with descriptive commit message)
6. **Update bulletin board** with completion notes
7. **Mark status** as `DONE`

### Git Push Requirements
- **Always push after completing a task** (before marking DONE)
- Write clear commit messages describing what changed
- Include task number in commit (e.g., "Task #003: Fix button issues")
- Push triggers deployment and allows Brett to review

### Status Updates Format
```markdown
**Updates:**
- [YYYY-MM-DD HH:MM] AgentName: Started work on X
- [YYYY-MM-DD HH:MM] AgentName: Completed Y, pushed to git (commit: abc1234)
- [YYYY-MM-DD HH:MM] AgentName: Task complete, ready for review
```

### When to Notify Claw
- ❌ **Don't notify** for normal progress
- ✅ **Do notify** if you hit blockers
- ✅ **Do notify** if you need input/approval
- ✅ **Do notify** if something breaks

---

## For Claw

### Monitoring
- Watch `.bird-signal` for new tasks
- Spawn agents when tasks are posted
- Only intervene on errors or blockers
- Let agents work autonomously

### After Agent Completion
- Verify git push happened
- Notify Brett that work is ready for review
- Clear completed tasks from active section

---

## For Brett

### Task Creation
Post tasks with:
- Clear scope
- Priority (Critical/High/Medium/Low)
- Assigned agent(s)
- Success criteria
- Due date

### Review Process
1. Agent completes task and pushes to git
2. Deployment happens automatically (Vercel)
3. Brett reviews the changes in production or via git diff
4. Brett approves or requests changes via new task
