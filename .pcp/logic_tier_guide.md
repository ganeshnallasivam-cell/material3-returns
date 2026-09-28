# Logic-Tier Selection & Implementation Guide

Read this when choosing a criterion's `logic_tier` or implementing a criterion
whose tier is already declared. Scaffolded by `pcp init`; doctrine, not
project-specific — edit only if your project genuinely disagrees with it.

## Choosing a rung: classify the CORRECTNESS ORACLE, not the task

Ask "how would I know an output is correct?", never "what kind of task is this":

| Correctness means... | Rung |
|---|---|
| It satisfies rules I can write down completely | 1 |
| It's the best feasible option under known constraints | 2 |
| It matches what historically happened in similar cases | 3 |
| It's faithful to what our documents/records actually say | 4 |
| Same as last time for the same question (overlay on any rung) | 5 |
| A reasonable human would accept it — and another human might accept a different answer | 6 |

## The walk (cheapest first — stop at the first rung whose litmus passes)

0. DECOMPOSE FIRST. A criterion is rarely one decision. "Categorize expenses
   and flag anomalies with explanations" = categorization (rung 1 or 3) +
   anomaly scoring (3) + explanation text (6). Classify each decision point
   separately; declare the highest rung actually present; implement each
   sub-decision at its own rung.
1. Rung 1 litmus: could you write unit tests asserting EXACT outputs for every
   input class right now (~<=20 rule branches, zero "it depends")?
   Danger sign: judgment verbs in the description (recommend/interpret/assess).
2. Rung 2 litmus: you cannot enumerate the answers but CAN enumerate the
   constraints and a scoring function — "best/cheapest/shortest X subject to Y".
   Danger sign: "optimization" with no writable objective = preference judgment.
3. Rung 3 litmus: (input -> correct outcome) history exists or is cheap to
   collect, hundreds of rows minimum. Countable before any code is written.
4. Rung 4 litmus: the answer already exists as text in a bounded corpus you
   control — the job is retrieval and assembly, not knowledge creation.
5. Rung 5 is an OVERLAY, not a destination: repetitive question stream ->
   cache in front of whichever rung serves it.
6. Rung 6 only after 1-4 each failed FOR A STATED REASON — the reasons go in
   build_vs_buy.rationale. Schema-cage the output, define the refusal path,
   and accept: shape is reproducible, content is not.

## Implementing each rung + where to search BEFORE building

### Rung 1 — deterministic
Process: rules as DATA (table/dict/config), never nested ifs; boundary +
property tests; exhaustive tests where the domain is finite.
Search first: domain rules are usually maintained packages — pycountry,
dateutil, babel, holidays. Never hand-code tax tables, timezone rules, ISO enums.

### Rung 2 — solver
Process: formalize on paper (variables, domains, constraints, objective);
brute-force a TINY instance first — that is your solver's ground truth; then
OR-Tools CP-SAT by default, pulp/CBC for LP/MIP, z3 for logic/SMT, networkx
for graph problems. Done = solver output matches brute force on small instances.
Search first: OR-Tools examples gallery, MiniZinc model library (pattern
catalog), OR Stack Exchange for the model shape.

### Rung 3 — statistical/ML
Process: data audit (row count, label quality, leakage) -> dumb baseline
(majority class / logistic) -> sklearn pipeline -> holdout eval -> confidence
threshold WITH a declared fallback path (below threshold -> rung 6 or human).
Search first: prefer PRETRAINED over training — HuggingFace for text/vision;
Kaggle and papers-with-code under the task's name; sklearn before anything exotic.

### Rung 4 — RAG
Process: corpus inventory (contents, freshness, owner) -> try grep/BM25
(rank_bm25, free) BEFORE embeddings -> hybrid only if BM25 measurably fails ->
retrieval-score threshold with an explicit "no answer" refusal (refusal beats
hallucination) -> cite the source in the output -> decompose the synthesized
answer into individual claims and check each against the retrieved context
(entailed / contradicted / unsupported) before returning it -- retrieval-score
threshold only proves retrieval worked, not that the synthesis stayed
faithful to what was retrieved. Where the corpus is structured (exact field
names, not free text), this is a cheap deterministic string/value match, not
an LLM judge call; reserve an LLM claim-check for synthesis that actually
combines/derives from multiple fields.
Search first: semantic-router; a vector DB only when BM25 fails on real queries.

### Rung 5 — cached reuse
Process: define the cache key (normalized input; embedding similarity only for
paraphrase tolerance) -> invalidation tied to the UNDERLYING DATA's change
events, not just TTL -> spot-check recompute a sample % -> collision test.
Search first: functools.lru_cache -> diskcache/redis -> GPTCache-class only
when semantic matching is proven necessary.

### Rung 6 — LLM (last resort)
Process: output schema FIRST (Pydantic/JSON Schema) -> prompt = role + inputs
+ schema + refusal rule -> Instructor/Outlines validation -> low temperature ->
verify pass when stakes are high -> every call logged with cost.
Search guidance is INVERTED here: search for a way OFF rung 6 — recheck rungs
1-5, then look for a bounded sub-decision split before accepting rung 6.

## Always, at every rung
Record the candidates you actually checked in build_vs_buy.candidates_considered
— the search step and the audit trail are the same act. A criterion whose
rationale names nothing checked is a criterion where nothing was checked.
