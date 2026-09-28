package pcp.coupling

# Mirrors validate_strategy.py's display thresholds (green >= 0.8,
# yellow >= 0.6, else red) -- human-editable here instead of buried in
# Python.

coupling_color := "green" if input.coupling_score >= 0.8
else := "yellow" if input.coupling_score >= 0.6
else := "red"
