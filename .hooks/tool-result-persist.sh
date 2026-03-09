#!/bin/bash
# tool_result_persist hook
# Intercepts CSS writes and runs banned-property linter before transcript write

set -euo pipefail

# Parse tool result from stdin (JSON envelope)
TOOL_RESULT=$(cat)

# Extract tool name and result content
TOOL_NAME=$(echo "$TOOL_RESULT" | jq -r '.tool // empty')
RESULT_CONTENT=$(echo "$TOOL_RESULT" | jq -r '.content // empty')

# Only lint if this is a file write that includes CSS
if [[ "$TOOL_NAME" != "write" ]] && [[ "$TOOL_NAME" != "edit" ]]; then
  # Not a file write, pass through unchanged
  echo "$TOOL_RESULT"
  exit 0
fi

FILE_PATH=$(echo "$TOOL_RESULT" | jq -r '.file_path // .path // empty')

# Only lint CSS/JSX/TSX files
if [[ ! "$FILE_PATH" =~ \.(css|jsx|tsx|js|ts)$ ]]; then
  echo "$TOOL_RESULT"
  exit 0
fi

# Read file content that was just written
if [[ ! -f "$FILE_PATH" ]]; then
  echo "$TOOL_RESULT"
  exit 0
fi

FILE_CONTENT=$(cat "$FILE_PATH")

# Run CSS linter
LINT_WARNINGS=""

# Check for banned fonts
if echo "$FILE_CONTENT" | grep -qi "font-family.*inter"; then
  LINT_WARNINGS="${LINT_WARNINGS}⚠️  BANNED FONT: Inter detected. Use Space Mono + IBM Plex Sans.\n"
fi

if echo "$FILE_CONTENT" | grep -qi "font-family.*roboto"; then
  LINT_WARNINGS="${LINT_WARNINGS}⚠️  BANNED FONT: Roboto detected. Use Space Mono + IBM Plex Sans.\n"
fi

if echo "$FILE_CONTENT" | grep -qi "font-family.*system-ui"; then
  LINT_WARNINGS="${LINT_WARNINGS}⚠️  BANNED FONT: system-ui detected. Use Space Mono + IBM Plex Sans.\n"
fi

# Check for purple-to-blue gradients
if echo "$FILE_CONTENT" | grep -qiE "gradient.*(#7c3aed|purple).*(#4f46e5|blue)"; then
  LINT_WARNINGS="${LINT_WARNINGS}⚠️  BANNED GRADIENT: Purple-to-blue gradient detected. Use Navy/Gold palette.\n"
fi

# Check for centered body text (text-align: center on elements with >50 chars)
# This is a heuristic check - more sophisticated parsing would be better
if echo "$FILE_CONTENT" | grep -qiE "text-align:\s*center"; then
  LINT_WARNINGS="${LINT_WARNINGS}⚠️  WARNING: Center-aligned text detected. Body copy should be left-aligned or asymmetric.\n"
fi

# Check for excessive border-radius (>8px on non-badge elements)
if echo "$FILE_CONTENT" | grep -qiE "border-radius:\s*(9|[1-9][0-9]+)px"; then
  LINT_WARNINGS="${LINT_WARNINGS}⚠️  WARNING: Border-radius >8px detected. Max 8px unless badge element.\n"
fi

# Check for fully rounded corners (50% or 9999px patterns)
if echo "$FILE_CONTENT" | grep -qiE "border-radius:\s*(50%|9999px)"; then
  LINT_WARNINGS="${LINT_WARNINGS}⚠️  WARNING: Fully rounded corners (pill shape) detected. Only allowed on badges.\n"
fi

# Check for bounce animations
if echo "$FILE_CONTENT" | grep -qiE "ease-(in-out-)?bounce"; then
  LINT_WARNINGS="${LINT_WARNINGS}⚠️  BANNED ANIMATION: Bounce easing detected. Use linear, ease, or custom cubic-bezier.\n"
fi

# If warnings exist, inject them into the tool result
if [[ -n "$LINT_WARNINGS" ]]; then
  # Create modified tool result with warnings prepended
  MODIFIED_RESULT=$(echo "$TOOL_RESULT" | jq --arg warnings "$LINT_WARNINGS" '
    .content = ($warnings + (.content // ""))
  ')
  
  echo "$MODIFIED_RESULT"
else
  # No warnings, pass through unchanged
  echo "$TOOL_RESULT"
fi
