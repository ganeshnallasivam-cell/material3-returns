package pcp.escalation

# Confidence/stakes-gated routing: PCP's own asymmetric-failure-cost
# principle (never silently treat "unsure" as "safe to automate") --
# low confidence or an explicitly high-stakes action always escalates to
# a human rather than resolving through the agent by default.

default route := "agent"

route := "human" if input.confidence_score < 0.65
route := "human" if input.high_stakes == true
