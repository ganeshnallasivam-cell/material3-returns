# Observability Guide — This Project's Own LLM Calls

Scaffolded by `pcp init`. Applies to any rung-6 (or 3/4) logic this project
implements with an LLM call — not PCP's own internals, which govern
themselves the same way one layer up (`llm/otel_trace.py` in the PCP repo).
Prior-art check run 2026-08-06: reuse-as-dependency on both pieces below,
nothing vendored, nothing built fresh.

## Instrumentation: OpenTelemetry GenAI semantic conventions

Use **OpenLLMetry** (`traceloop/openllmetry`, Apache 2.0) or plain
OpenTelemetry with the GenAI semantic conventions directly — not a
vendor-specific SDK. Every LLM/agent call gets one span with standard
attributes: `gen_ai.system`, `gen_ai.request.model`,
`gen_ai.usage.input_tokens` / `output_tokens`. This is the same shape PCP
already uses for its own calls: one funnel every call site passes through
(see PCP's `token_ledger.yaml` pattern), emitting a span there rather than
scattering tracing calls across the codebase.

Caveat (still true as of 2026-08): the GenAI semantic convention spec is
experimental upstream — attribute names can shift between OTel spec
revisions. Pin a version, don't chase `main`.

## Viewer/backend: Langfuse (self-hosted)

**Langfuse** (MIT, self-hostable via Docker Compose — Postgres + ClickHouse
+ Redis + S3-compatible storage) is the recommended default: most mature
open-source option, framework-agnostic via OTel, gives tracing + prompt
management + evaluation + cost dashboards for free when self-hosted.
Alternatives if Langfuse's stack is too heavy for this project's scale:
- **Helicone** (Apache 2.0) — fastest to stand up, drop-in proxy, strong at
  multi-provider cost visibility, thinner on evaluation.
- **Arize Phoenix** — check current license before adopting; as of 2026-08
  the core platform ships under Elastic License 2.0 (source-available, not
  OSI-approved), not the plain Apache 2.0 some docs still imply. Fine for
  internal-only use, re-check `ships_externally` posture before shipping it
  bundled with a proprietary product.

Because the wire format is OTel-standard, switching viewers later is a
config change (a different OTLP endpoint), not a rewrite.

## What NOT to build

Don't hand-roll a tracing/span format, a cost dashboard, or a trace
storage layer — all three are exactly the "mature, well-trodden tool
already exists" case the global Prior-Art Check rule flags. If this
project's LLM-call volume is genuinely small enough that a lightweight
ledger (a single append-only YAML/JSONL file, PCP's own `token_ledger.yaml`
is the reference shape) covers it, that's a legitimate build-fresh call —
state that reasoning in `build_vs_buy.rationale`, don't skip the check.
