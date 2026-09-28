# Fork Provenance

designtrove's `fork-core` module is a fork of Google's
[`@material/web`](https://github.com/material-components/material-web)
(Material Design 3 web components), imported per
[ADR-002](../../../.pcp/kb/adr/ADR-002-fork-revive-not-build-fresh.md).

- **Upstream repository:** https://github.com/material-components/material-web
- **Forked from commit:** `70e259d464f627a21c7831cb4e871e0061bc0644`
- **Upstream commit date:** 2026-07-23
- **Imported into designtrove:** 2026-08-01
- **License:** Apache-2.0 — original `LICENSE` file and all per-file
  copyright headers preserved unmodified. No copyright notice has been
  removed or altered.
- **Upstream status at fork time:** in maintenance mode since Google's
  June 2024 announcement (GitHub Discussion #5642) — team unstaffed, PRs
  not accepted by default, ~120 open issues, near-zero commit velocity
  since v2.0.0 (research confirmed 2026-08-01, see ADR-002).

## Deviations from upstream

The upstream source tree itself (all component directories, tokens, sass,
docs, tests) is a clean, unmodified import minus `.git` history. No upstream
file has been edited, moved, or deleted, and no copyright header touched.

Files designtrove has *added* inside this tree — upstream has no equivalent,
so none of these conflict on an upstream re-sync:

| Added file | Date | Why |
|---|---|---|
| `FORK_NOTICE.md` | 2026-08-01 | Fork provenance record required by ADR-002. |
| `feature_flag.env` | 2026-09-27 | `FEATURE_FORK-CORE_ENABLED=false`. Required of every designtrove module by `ci_rules.yaml` MOD_005 so modules ship dark by default. It lives at the module root because the gate looks for `src/modules/{module}/feature_flag.env`; it is inert to the component source and read by nothing upstream. |

Every future deviation from this point must be recorded here (or in a
dedicated ADR for architecturally significant changes), per ADR-002 —
no silent changes.

## What's next for this module

Per [ADR-006](../../../.pcp/kb/adr/ADR-006-roadmap-resequencing-deterministic-resolution.md)
and `roadmap.md`, this module's missing-component backlog (date/time
pickers, navigation rail/bar, top app bars, sheets, tooltips, snackbar,
data tables, search bar, segmented buttons, carousel) is Phase 1.0 work —
not required before catalog/mcp-server's Phase 0.1 resolve-mechanism PoC,
which uses only what's already present in this import.
