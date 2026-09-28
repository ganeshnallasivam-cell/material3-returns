package pcp.bypass

# Formalizes what ci_rules.yaml's [pcp-bypass: reason] mechanism treats as
# ad-hoc otherwise -- rejects placeholder reasons before pcp check treats
# a reason as adequate to log and accept a Layer 1 bypass.

default approved := false

approved if {
	count(trim_space(input.reason)) > 0
	not lower(trim_space(input.reason)) in {"reason", "todo", "test", "fixme"}
}
