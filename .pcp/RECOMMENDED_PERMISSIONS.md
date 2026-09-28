# Recommended Claude Code Permissions for PCP

Found the hard way, once: an agent correcting a spec/target-path drift issue in
`.pcp/` one file at a time (via the Edit tool) is exactly the kind of routine,
low-risk PCP maintenance that still triggers a permission prompt on every
single file under Claude Code's default settings. Pre-approving it narrows the
friction to just this one path, not a blanket edit allowance.

**This is advisory, not applied automatically** -- PCP does not (and will not)
edit `.claude/settings.json` itself. Review the snippet below and merge it
into your own `.claude/settings.json` or `.claude/settings.local.json` if you
want it.

## Recommended: allow edits under `.pcp/`

```json
{
  "permissions": {
    "allow": ["Edit(/.pcp/**)"]
  }
}
```

Narrower alternative, if you'd rather scope it to just spec/acceptance files
instead of all of `.pcp/`:

```json
{
  "permissions": {
    "allow": ["Edit(/.pcp/strategy/modules/**/spec.yaml)", "Edit(/.pcp/strategy/modules/**/acceptance.yaml)"]
  }
}
```

## Optional: `acceptEdits` permission mode

For a session dedicated to PCP spec maintenance specifically (not general
coding), consider switching that session to `acceptEdits` mode instead of
adding the rule above project-wide. Session-scoped, reverts when the session
ends -- a good fit if this kind of correction is occasional rather than
routine for your workflow.

## If you use a `git branch -D` deny rule

PCP's own worktree/branch-reset code (`pcp build`'s parallel module builds,
and any PCP-provided demo/setup scripts) uses the non-destructive
`git checkout -B <branch> <start-point>` form, never `git branch -D` --
a standing deny rule on `-D` will not conflict with anything PCP itself does.

## Optional: keep CLAUDE.md's PCP context block fresh via a SessionStart hook

`pcp context --inject` writes a marked block into CLAUDE.md (objective,
architecture, current state, pending gaps) -- Claude Code reads CLAUDE.md
every session regardless, but nothing calls `pcp context --inject` for you.
If you want that block to stay current automatically instead of running it
by hand, add a `SessionStart` hook:

```json
{
  "hooks": {
    "SessionStart": [
      {"hooks": [{"type": "command", "command": "pcp context --inject --path \"$CLAUDE_PROJECT_DIR\""}]}
    ]
  }
}
```

Same posture as everything else in this file: advisory, not applied by PCP itself.

## Optional: real-time build-loop warning (2026-07-24)

`.pcp/hooks/build_loop_warning.py` fires the moment an Edit/Write happens
outside `pcp build`'s own gated agent loop -- a real-time companion to
CTRL-037 (`pcp doctor`), which only catches this in retrospect. Purely
informational: never sets a permission decision, so it can't block or force
an "ask" prompt, one warning per session. To enable:

```json
{
  "hooks": {
    "PreToolUse": [
      {"matcher": "Edit|Write", "hooks": [{"type": "command", "command": "python3 .pcp/hooks/build_loop_warning.py"}]}
    ]
  }
}
```

## Optional: PCP update-available notice at session start (2026-07-31)

`.pcp/hooks/session_update_check.py` runs `pcp self-update --check` (fetch +
compare, read-only) at the start of a session and prints a one-line notice
if a newer PCP is available. It never pulls anything itself -- updating
always stays a separate, explicit `pcp self-update`. To enable:

```json
{
  "hooks": {
    "SessionStart": [
      {"hooks": [{"type": "command", "command": "python3 .pcp/hooks/session_update_check.py"}]}
    ]
  }
}
```
