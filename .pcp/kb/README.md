# Knowledge Base Index

Auto-scaffolded by `pcp init`, at project bootstrap -- before `pcp kickoff`
has run and before any source files exist. This is an honest status index:
it says what kb content actually exists right now, not what a mature
project's kb eventually looks like. Keep it that way as the project grows --
a bucket in "What does not exist yet" moves up only when something real
lands, never edited ahead of the fact to claim coverage that isn't there.

## What exists right now

- `kb/adr/ADR-001-example.md` -- a placeholder example ADR, not a real
  decision record yet. Replace it with your first real ADR (or delete it)
  once one lands; keep one file per decision after that, never edited
  after acceptance.
- `kb/domain/general.md` -- a placeholder domain-knowledge template with
  empty `[bracketed]` fields (failure modes / invariants / gotchas). Not
  yet populated with anything project-specific.
- `kb/topics.yaml` -- an empty skeleton (`topics: []`). No topics have
  been registered yet.

## What does not exist yet

- **No per-file metadata cards.** Cards (with `tier:cited`/
  `tier:not_grounded` claims, each `tier:cited` claim backed by a literal
  quote) are authored as the kb module's own card-authoring pieces run --
  not scaffolded here, and not implied by this file's existence.
- **No ingested candidates.** Phase A (candidate identification, staged
  with rationale only) and Phase B (ingestion of an already-approved
  candidate) of the kb module's gap/ingestion engine have not run.
- **No catalog or index built from real content.** The deterministic
  catalog/index builders (regex + filesystem walk, no LLM, no embeddings)
  regenerate from real cards once they exist. This README does not
  attempt to synthesize or forecast that content ahead of time.

Do not hand-edit this file to move an item into "What exists right now"
before it's real -- that defeats the one property an honest index needs.
