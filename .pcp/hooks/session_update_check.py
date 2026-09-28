#!/usr/bin/env python3
# PCP update-available notice (scaffolded by pcp init, 2026-07-31).
#
# Announce-only, on purpose: `pcp self-update` (git pull --ff-only, human-
# run) is the only thing that ever changes code. This hook just tells you
# an update exists at session start -- it never fetches-and-pulls itself,
# never runs in the background, and never touches the working tree. Same
# reasoning as build_loop_warning.py: a hook that can silently change
# behavior for a session already in progress is the risk this project
# spent real effort removing elsewhere (the 2026-07-27 cron/curl launch
# blocker) -- fixing it here only to reintroduce the shape at a different
# trigger (session start instead of a timer) would be the same mistake.
#
# NOT wired automatically. To enable, add to .claude/settings.json yourself:
#   "hooks": {"SessionStart": [{"hooks": [{"type": "command",
#     "command": "python3 .pcp/hooks/session_update_check.py"}]}]}
import json
import subprocess
import sys
from pathlib import Path


def main() -> None:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        payload = {}

    cwd = payload.get("cwd") or "."
    project_root = Path(cwd).resolve()
    if not (project_root / ".pcp").is_dir():
        sys.exit(0)  # not a PCP-governed project

    try:
        result = subprocess.run(
            ["pcp", "self-update", "--check"],
            capture_output=True, text=True, timeout=15,
        )
    except Exception:
        sys.exit(0)  # offline, pcp not on PATH, etc. -- stay silent, never block boot

    msg = (result.stdout or "").strip()
    if not msg or "update available" not in msg.lower():
        sys.exit(0)  # current, unknown, or unavailable -- nothing worth announcing

    print(json.dumps({
        "systemMessage": msg,
        "hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": msg},
    }))
    sys.exit(0)


if __name__ == "__main__":
    main()
