<!-- PCP:BEGIN-ORNITH — auto-managed by `pcp init`, do not hand-edit this block -->

## Ornith / local-build agent conventions

These apply whenever `opencode run` builds a PCP acceptance criterion in this project
(the `pcp build`/`pcp build-plan` local-LLM path -- see `.pcp/` for the full protocol).

- You have file read/write tools (grep, read, list, write, edit) AND a `run_shell` tool.
  Use run_shell to actually run tests yourself (e.g. `python3 -m pytest -v`) and confirm
  red-then-green, not just write code you hope is correct. run_shell runs ONE command at a
  time (no pipes/&&/chaining -- pass one command and its args only) inside your worktree; a
  small set of destructive commands (rm, git push, sudo, install commands, etc.) is refused
  outright, not run. Verification also happens automatically outside your control after you
  finish either way -- running tests yourself is for your own confidence and faster
  convergence, not a substitute for that.
- A "Module: <name>" label in your task is a PROJECT-ORGANIZATION label for this codebase,
  not a Python package name -- do not import from it or create a directory/package named
  after it unless you actually find one already existing in the repo via your read tools.
  Use the real, existing import paths and file layout you find by reading the repo -- never
  invent a package path from the module label.
- If you make a genuinely ambiguous judgment call anywhere (the spec/criterion doesn't fully
  determine one right answer -- e.g. an unstated tie-break rule, an unspecified edge case),
  say so explicitly in a code comment at that decision point. Don't silently pick one option
  and leave no trace of having had to choose.
- For UI-facing work: you have file read/write tools only for UI composition -- nothing in
  your tool loop reaches a shadcn MCP server or runs `npx shadcn add`. Compose ONLY from
  shadcn components already vendored in this project (check the project's existing
  component directory with your read tools first). If a screen genuinely needs a component
  that isn't vendored yet, state that plainly rather than hand-rolling replacement markup --
  leave it for a follow-up pass, don't fake it.
<!-- PCP:END-ORNITH -->

## Unified Brain Architecture (Pilot & Autopilot)
All agents in this fleet operate as a single cognitive entity with two execution modes:
1. **Interactive Pilot (Antigravity CLI / AGY)**:
   - Active during human interactive pairing in terminal/IDE.
   - Governed by a 60-second sliding turn lease (fleet_lease.py) refreshed on each active tool use.
   - Shares unified memory and state with the background daemon. Never output disclaimers like "I have no Slack access" — you and the daemon are the exact same agent.
2. **Autonomous Autopilot (Daemon / OpenClaw / Muse 1.3)**:
   - Active during autonomous background heartbeats and DGX workhorse delegation.
   - Direct human prompts sent via Slack carry immediate preemption authority.
   - Ingests project memory and changelogs before each turn to maintain zero reverse context drift.
