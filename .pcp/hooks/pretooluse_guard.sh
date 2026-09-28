#!/bin/sh
# PCP tool-call-time guard (scaffolded by pcp init, 2026-07-17).
#
# Commit-time gates (pcp check) catch a protected-path edit only AFTER the
# agent already made it. This PreToolUse hook denies the Edit/Write at the
# moment the agent attempts it — the layer Endor Agent Governance and
# Microsoft's agent-governance-toolkit operate at. DENY-only by design: a
# hook that auto-ALLOWS anything is an approval bypass and gets hard-blocked
# by Claude Code's own permission layer (see CLAUDE.md Hard Rules history).
#
# NOT wired automatically. To enable, add to .claude/settings.json yourself:
#   "hooks": {"PreToolUse": [{"matcher": "Edit|Write",
#     "hooks": [{"type": "command", "command": "sh .pcp/hooks/pretooluse_guard.sh"}]}]}
#
# Requires jq. Exits 0 (no opinion) when jq is missing or input is unparseable.
command -v jq >/dev/null 2>&1 || exit 0
INPUT=$(cat)
FILE=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)
[ -z "$FILE" ] && exit 0
if [ "$PCP_AGENT_SESSION" = "1" ]; then
  case "$FILE" in
    *.pcp/objective.md|*.pcp/target_state.md|*.pcp/architecture.md|*.pcp/ci_rules.yaml|*.pcp/controls.yaml|*.pcp/SDLC_phase.yaml|*.pcp/strategy/decomposition.md|*.pcp/strategy/dependency_map.md|*.pcp/strategy/inspiration_art.md|*.pcp/strategy/modules/*/spec.yaml|*.pcp/strategy/modules/*/acceptance.yaml)
      printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"PCP: unattended agent sessions may not edit human-authorized spec files. Route the change to the human, who applies it via pcp correct-objective / pcp pm / pcp amend (diff shown, approved, then written). See .pcp/ci_rules.yaml protected_path."}}\n'
      exit 0
      ;;
  esac
fi
exit 0
