# Project Setup Skill

This skill creates a `PROJECT.md` file for new projects, automatically populating it with a standardized Project Brief, phase-specific Review Criteria checklists, and empty sections for agent work logs.

## Usage

To use this skill, run the `SKILL.md` script with the required arguments:

```bash
./Atlas/skills/project-setup/SKILL.md <project_name> \
  --objective "<Your project objective in one paragraph>" \
  --success "<Criterion 1>" "<Criterion 2>" "<Criterion 3>" \
  --constraints "<Any project constraints or 'None'>" \
  --assignments "Bernard:Strategy" "Christopher:Research" "Vale:Brand" "Scribe:Content" "Devan:Development"
```

### Arguments:

- `<project_name>`: The name of the project (e.g., `NewMarketingCampaign`). This will be used to create the project directory `/home/clawd/.openclaw/workspace/projects/<project_name>/` and the `PROJECT.md` file within it.
- `--objective "<objective>"`: A single paragraph describing the project's main objective.
- `--success "<criterion1>" "<criterion2>" ...`: 3-5 bulleted success criteria. Each criterion should be provided as a separate quoted string.
- `--constraints "<constraints>"`: Any known constraints for the project. If none, use `"None"`.
- `--assignments "<agent1>:<phase1>" "<agent2>:<phase2>" ...`: A space-separated list of agent assignments, where each assignment is in the format `AgentName:PhaseName` (e.g., `Bernard:Strategy`).

## Example

```bash
./Atlas/skills/project-setup/SKILL.md MyAwesomeProject \
  --objective "To launch a new product feature that increases user engagement by 15% within the next quarter." \
  --success "Users can easily access and utilize the new feature" "Feature is stable and bug-free" "Achieve 15% increase in daily active users" \
  --constraints "Must integrate with existing API" "Limited budget for external tools" \
  --assignments "Bernard:Strategy" "Christopher:Research" "Vale:Brand" "Scribe:Content" "Devan:Development"
```

This will create a `PROJECT.md` file in `/home/clawd/.openclaw/workspace/projects/MyAwesomeProject/PROJECT.md`.

## Idempotency

If a `PROJECT.md` file already exists for the specified project name, the script will prompt you to confirm if you want to overwrite it.
