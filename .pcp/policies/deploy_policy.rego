package pcp.deploy

# Deploy-time policy (Harness policy-gate reference pattern, 2026-07-17).
# Consulted by `pcp deploy` before the approval prompt. All rules
# human-editable; a missing/failed OPA evaluation NEVER blocks a deploy
# (advisory layer, same posture as escalation.rego).

# Freeze windows: block deploys on listed UTC weekdays (0=Mon..6=Sun).
# Default: no frozen days. Example: freeze_days := {4, 5, 6} freezes Fri-Sun.
freeze_days := set()

deny contains msg if {
    input.utc_weekday in freeze_days
    msg := sprintf("deploy freeze window: weekday %d is frozen", [input.utc_weekday])
}

# Require rollback configured for any deploy touching risk-flagged criteria.
deny contains msg if {
    input.risk_flag_count > 0
    not input.rollback_configured
    msg := "risk-flagged release with no rollback command configured — configure one via pcp doctor"
}
