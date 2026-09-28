#!/usr/bin/env python3
# PCP build-loop warning (scaffolded by pcp init, 2026-07-24).
#
# Real Project O finding: CTRL-037 (pcp doctor) catches build-loop
# bypass only in retrospect -- after the fact, only if someone runs
# pcp doctor. This is the real-time version: fires the moment an Edit/Write
# happens outside pcp build's own gated agent loop (PCP_AGENT_SESSION != 1),
# so the warning lands when it's actually useful -- before the work
# happens, not days later. Purely informational: no permissionDecision is
# ever set, so this can never block, ask, or grant a bypass -- it cannot
# hit the same hard-block Claude Code's permission layer applies to a hook
# that tries to auto-approve something (see verify-syntax-fix.sh's own
# history). One warning per session, not per edit -- noise defeats the
# point.
#
# NOT wired automatically. To enable, add to .claude/settings.json yourself:
#   "hooks": {"PreToolUse": [{"matcher": "Edit|Write",
#     "hooks": [{"type": "command", "command": "python3 .pcp/hooks/build_loop_warning.py"}]}]}
import json
import os
import sys
from pathlib import Path


def main() -> None:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    cwd = payload.get("cwd") or "."
    project_root = Path(cwd).resolve()
    pcp_dir = project_root / ".pcp"
    if not pcp_dir.is_dir():
        sys.exit(0)  # not a PCP-governed project

    if os.environ.get("PCP_AGENT_SESSION") == "1":
        sys.exit(0)  # inside pcp build's own gated loop already

    session_id = payload.get("session_id") or os.environ.get("CLAUDE_CODE_SESSION_ID") or "unknown"
    marker = pcp_dir / f".build_loop_warning_shown_{session_id}"
    if marker.exists():
        sys.exit(0)  # already warned this session
    try:
        marker.write_text("")
    except OSError:
        pass

    msg = (
        "PCP: this edit is happening outside pcp build's gated loop -- "
        "no architect-review/QA/telemetry will be recorded for this change. "
        "Run `pcp build` for a verified build, or continue if this is intentional "
        "ad-hoc work (`pcp build-status` / .pcp/build_report.md show what pcp build "
        "gives you that this path skips)."
    )
    print(json.dumps({
        "systemMessage": msg,
        "hookSpecificOutput": {"hookEventName": "PreToolUse", "additionalContext": msg},
    }))
    sys.exit(0)


if __name__ == "__main__":
    main()
