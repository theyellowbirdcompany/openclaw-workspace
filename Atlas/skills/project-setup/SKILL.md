
#!/bin/bash

# project-setup skill
# Creates a PROJECT.md file with a standardized brief and review criteria.

if [ -z "$1" ]; then
  echo "Usage: project-setup <project_name> --objective "<objective>" --success "<criterion1>" "<criterion2>" ... --constraints "<constraints>" --assignments "<agent1>:<phase1>" "<agent2>:<phase2>" ..."
  exit 1
fi

PROJECT_NAME=$1
shift

OBJECTIVE=""
SUCCESS_CRITERIA=()
CONSTRAINTS="None"
AGENT_ASSIGNMENTS=()

while (( "$#" )); do
  case "$1" in
    --objective)
      OBJECTIVE=$2
      shift 2
      ;;
    --success)
      shift
      while [[ "$1" != --* && -n "$1" ]]; do
        SUCCESS_CRITERIA+=("$1")
        shift
      done
      ;;
    --constraints)
      CONSTRAINTS=$2
      shift 2
      ;;
    --assignments)
      shift
      while [[ "$1" != --* && -n "$1" ]]; do
        AGENT_ASSIGNMENTS+=("$1")
        shift
      done
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

PROJECT_DIR="/home/clawd/.openclaw/workspace/projects/${PROJECT_NAME}"
PROJECT_FILE="${PROJECT_DIR}/PROJECT.md"

mkdir -p "${PROJECT_DIR}"

if [ -f "${PROJECT_FILE}" ]; then
  read -p "PROJECT.md already exists for ${PROJECT_NAME}. Overwrite? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborting."
    exit 0
  fi
fi

SUCCESS_LIST=""
for entry in "${SUCCESS_CRITERIA[@]}"; do
  SUCCESS_LIST+="- ${entry}\n"
done

AGENT_LIST=""
for entry in "${AGENT_ASSIGNMENTS[@]}"; do
  AGENT_LIST+="- ${entry}\n"
done

# Bernard's existing review framework (placeholder - needs to be pulled from DELEGATION_SPEC.md or hardcoded)
BERNARD_REVIEW_FRAMEWORK="
### Phase: Strategy (Bernard)
- [ ] Strategy aligns with overall objective
- [ ] Key assumptions clearly stated
- [ ] Risks identified and mitigation proposed
"

cat <<EOF > "${PROJECT_FILE}"
# ${PROJECT_NAME}

## Project Brief

**Objective**
${OBJECTIVE}

**Success Criteria**
${SUCCESS_LIST}
**Constraints**
${CONSTRAINTS}

**Agent Assignments**
${AGENT_LIST}
---

## Review Criteria by Phase
${BERNARD_REVIEW_FRAMEWORK}

### Phase: Research (Christopher)
- [ ] Sources cited
- [ ] Findings specific, not generic
- [ ] Summary written for next agent downstream

### Phase: Brand (Vale)
- [ ] Voice/tone defined
- [ ] Visual direction clear enough to implement
- [ ] No contradictions with strategy

### Phase: Content (Scribe)
- [ ] Copy reflects strategy accurately
- [ ] Matches Vale's brand voice
- [ ] Written for intended audience
- [ ] Ready for implementation

### Phase: Dev (Devan)
- [ ] Spec matches PROJECT.md objective
- [ ] Edge cases noted
- [ ] Handoff is clean

---

## Strategy
[Empty, Bernard fills this]

## Research Summary
[Empty, Christopher summarizes here]

## Brand Summary
[Empty, Vale summarizes here]

## Content Summary
[Empty, Scribe summarizes here]

## Work Log

Format: \`[YYYY-MM-DD HH:MM] [Agent] [Phase] [Status] — Notes — Bernard: [✅ LOCKED / ⏳ IN REVIEW / ⚠️ REVISION NEEDED]\`

---
EOF

echo "PROJECT.md created successfully at ${PROJECT_FILE}"
