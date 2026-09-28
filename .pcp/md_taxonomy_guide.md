# Markdown Taxonomy Guide

Read this before creating a new `.md` file anywhere in this project, or
before adding a large chunk to an existing one. Scaffolded by `pcp init`;
doctrine, not project-specific -- edit only if your project genuinely
disagrees with it. Sibling to `logic_tier_guide.md` -- that guide governs
which RUNG a piece of logic belongs on; this one governs which BUCKET a
piece of writing belongs in.

Purpose-splitting alone (one file per topic) doesn't prevent sprawl -- five
well-labeled files that each grow forever is still sprawl. The missing piece
is a rule for what happens to a doc at the moment of creation: does it get
one atomic file, a size cap, or does it not belong in prose at all.

## The five buckets

Ask these in order; stop at the first yes.

1. **Is this a record of something decided, found, or that happened?**
   -> `.pcp/kb/adr/ADR-NNN-slug.md`. One file per decision, never edited
   after acceptance -- superseded by a NEW numbered file that links back,
   not a mutation of the old one (see `ADR-001-example.md`'s `Status` field).
   Already wired: `architect_review.py` loads every file in `kb/adr/` into
   every review prompt. Known gap in that loader, not yet fixed: it loads
   ALL of them unconditionally ("small, high signal" was true at zero-to-few
   files; nothing bounds it as the count grows) -- unlike
   `decision_log.select_relevant()`, which already does bounded, deterministic
   selection for the exact same shape of problem. If `kb/adr/` grows past a
   few dozen files, that loader needs the same treatment before token
   discipline breaks -- flag it, don't let it grow unnoticed.
   Distinct from `decision_log.jsonl`: that file is auto-captured, ambient,
   unreviewed conversational drift (`pcp capture`); `kb/adr/` is deliberate,
   human-curated, and worth architect-review seeing on every single review.
   A decision_log entry that turns out to matter should graduate into an ADR,
   not stay buried in JSONL.

2. **Is this a description of CURRENT state that changes over time?**
   -> Exactly one canonical file, never both a generated and a hand-authored
   version of the same fact:
   - Machine-generated from the atomic records (`current_state.md`,
     `diff.md`, each module's `docs/built.md`) -- regenerated on demand,
     never hand-edited, ever.
   - Hand-authored, small, human-gated (`objective.md`, `target_state.md`,
     `architecture.md`) -- written only through their gated propose/diff/
     approve command (see CLAUDE.md Hard Rule 2), never free-hand.
   A file that's sometimes regenerated and sometimes hand-patched is the bug
   itself, not a third valid option.

3. **Is this long-form human narrative** (rationale, how something works,
   onboarding)?
   -> Diataxis-labeled by purpose (tutorial / how-to / reference /
   explanation) -- a file silently doing all four jobs at once is exactly
   how a 300-line doc becomes a 1000-line doc. Cap it (roughly 300-400
   lines is a reasonable trigger, not a hard rule); hitting the cap means
   split by sub-topic into a companion file linked from the original, not
   grow past it. `architecture.md`, `logic_tier_guide.md`, and this file
   are all bucket 3 -- each stays single-purpose on its own topic.

4. **Is this structured data wearing a `.md` costume** -- something code
   parses by pattern-matching rather than a human reading prose?
   -> It isn't documentation. Move it to schema-validated YAML/JSON (see
   `.pcp/schema/*.schema.json`) the same way `ci_rules.yaml`/`controls.yaml`
   already do it correctly. The failure mode this rule exists to prevent:
   a "spec" file that's actually a table some script regexes out of prose.

5. **Is this LLM-instruction/context** (agent persona, standing rules)?
   -> Hierarchical, one file per scope (`CLAUDE.md`, `architect_persona.md`),
   cascading by override, never by copy-paste duplication between levels.

## The part every bucket needs and usually skips: an index with a real cap

A bucket without an index is undiscoverable; an index without a size cap
just relocates the sprawl one level up. If a bucket's file count or an
index's line count grows past what's skimmable, that's the trigger to
consolidate -- not a someday task. This project's own memory system (if
you're reading this inside a Claude Code session with persistent memory)
already runs exactly this: typed, atomic entries, an index file, and a hard
line cap that forces consolidation instead of unbounded growth. That's not
a hypothetical pattern -- it's proof this works, one layer up from this file.
