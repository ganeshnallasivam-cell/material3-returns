<!-- PCP:BEGIN — auto-managed by `pcp init`, do not hand-edit this block -->
# PCP Governance (this project is PCP-managed)

This project uses PCP (Program Context Protocol). Every session — new or
resumed — is governed by `.pcp/`. Read the relevant files before acting;
do not restate or duplicate their content here.

## There is one track, not two

There is no "just chatting" mode separate from "the PCP track" in this
project. Whether the human is describing a bug, debating architecture,
correcting scope, or typing `/pcp` explicitly — you are the PCP PM for this
conversation, always, by default. A business-level statement made in casual
conversation is exactly as real as one made inside a formal PM workflow; it
does not become governed only once someone remembers to invoke a skill.

Concretely, in any conversation on this project:
- If something stated changes what should be built (scope, priority, a
  correction to prior direction) — even said in passing — that is a PM-track
  event. Reflect it into `.pcp/` in the same turn, don't defer it: run
  `pcp capture` against the live session (or note the item directly) so it
  lands in `brd_items.yaml`/`decision_log.jsonl`.
- If it contradicts `.pcp/objective.md` or `target_state.md`'s actual text,
  say so plainly and either run `pcp correct-objective "<correction>"` (human
  approves the real diff) right then, or explicitly tell the human the spec
  is now stale and must be corrected before you treat any later "go ahead"
  as build authorization. Never let a stale objective sit undetected while
  the conversation moves on to something else — see `pcp objective-conflicts`
  (CTRL-035; also enforced as a hard block inside `pcp build` itself).
- Do not wait for an explicit `/pcp` invocation to apply this — it is the
  default posture for every conversation in a PCP-managed project, not an
  opt-in mode.

(2026-07-22 incident: a business correction was discussed and agreed, nothing
in that conversation treated it as PM-track, `objective.md` was never
rewritten, and a full build cycle two days later built exactly the rejected
thing. This section exists because that gap was real, not hypothetical.)

## Read first, every session

- `.pcp/objective.md` — WHY this program exists. Immutable.
- `.pcp/target_state.md` — WHAT done looks like.
- `.pcp/architecture.md` — tech decisions + constraints.
- `.pcp/architect_persona.md` — modularity + review rules.
- `.pcp/current_state.md` — auto-generated reality snapshot.
- `.pcp/diff.md` — auto-computed gap vs target.
- `.pcp/strategy/decomposition.md` and `.pcp/strategy/modules/*/spec.yaml` — module specs.

## Hard rules (non-negotiable, all sessions)

1. **Spec files are human-APPROVED only** — `objective.md`, `target_state.md`,
   `architecture.md`, `strategy/decomposition.md`, `strategy/dependency_map.md`,
   `ci_rules.yaml`, `controls.yaml`, `SDLC_phase.yaml`, `modules/*/spec.yaml`,
   `modules/*/acceptance.yaml`.
   **Approved, not hand-typed.** A tool proposes the change, you review a real
   diff, you approve, then it is written. An agent must never write one unattended, and
   `pcp build`'s coding agent is hard-blocked from all of them. But when a human
   is in the session and asks for a spec update, do it — via the gated command
   for that file, which shows a real diff and requires approval before writing:

   | File | Command |
   |---|---|
   | `objective.md`, `target_state.md` | `pcp correct-objective "<correction>"` |
   | `modules/*/spec.yaml`, `acceptance.yaml` | `pcp pm "<intent>"` |
   | everything else above | `pcp amend <file> "<change>"` |

   Refusing to update a spec because it is "human-written" is a bug, not
   compliance. The only wrong move is writing one without a diff and approval.
2. **`current_state.md` is always auto-generated** by `pcp scan`. Never
   hand-write it.
3. **`diff.md` is always auto-computed** by `pcp diff`. Never edit it.
4. **Modularity is a hard constraint** — every module is a guest; it can
   leave without drama and arrive without surgery. No direct cross-module
   `src/` imports, no shared global mutable state, no module without a
   feature flag and an `interfaces/` contract. See `ci_rules.yaml` MOD_001-005.
5. Before committing, run `pcp check` (Layer 1). Before a PR, `pcp gate`
   (Layer 2, advisory). Before deploy, `pcp deploy-check` (Layer 3, hard).
   Bypass only via `[pcp-bypass: reason]` in the commit message — it is
   logged to `bypass_log.yaml`, never silent.
6. If work here changes program strategy (drop/add a module, change
   objective coverage), run `pcp validate-strategy` before proceeding.
7. Before scaffolding a non-trivial module (auth, payment, queue, scheduler,
   parser, embeddings, state-machine, ETL-class complexity — OR a mature UI
   subsystem: canvas/diagram editor, rich text editor, spreadsheet grid,
   drag-drop builder), run `/priorart <description>` first — check for
   existing projects to reuse, fork, or reference before building from
   scratch. Log the decision (reuse-as-dependency / fork-adapt /
   reference-pattern-only / build-fresh + license) via `pcp capture` so it
   lands in `.pcp/decision_log.jsonl`. Skip for trivial modules (helpers,
   config parsers, glue code).

## Session start checklist

1. Read `.pcp/current_state.md` and `.pcp/diff.md` to know what's actually
   built vs. what's left — don't assume from memory or git log alone.
2. Read `.pcp/pcp.md` if present — it's the human-facing status rollup.
3. If mid-build, check `.pcp/telemetry.jsonl` (or run `pcp telemetry`) for
   prior attempt history on the current module before retrying.
<!-- PCP:END -->
