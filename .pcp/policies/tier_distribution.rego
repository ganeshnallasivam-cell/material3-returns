package pcp.tier_distribution

# Logic-tier distribution bands (2026-07-18). How much of the product is
# allowed to live at rung 6 (LLM, nondeterministic) before validate-strategy
# colors the mix yellow/red? Advisory only -- this encodes a team's
# predictability budget, human-editable here instead of buried in Python.
# Defaults mirror validate_strategy.py's fallback bands.

color := "green" if input.rung6_share <= 0.35
else := "yellow" if input.rung6_share <= 0.6
else := "red"
