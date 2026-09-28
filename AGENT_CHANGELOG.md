# Agent Changelog

Append-only log of changes made by AI agents/harnesses working on this project. Never edit or delete existing entries — only append new ones.

## 2026-09-27 22:28 PT — Antigravity

- Changed: button/internal/button.ts, checkbox/internal/checkbox.ts, switch/internal/switch.ts, textfield/internal/text-field.ts, react/, package.json
- Why: implemented Phase 2.5 Developer DX modernization (CSS Shadow Parts ::part(container/label/icon/field/input), React 19 wrappers, and ElementInternals form association)
- Commitment: components expose standard CSS shadow parts for styling, emit typed React 19 bindings under @designtrove/material-web/react, and maintain 100% clean wireit builds
- Failure Signature: wireit build failure or missing shadow parts attributes in rendered component templates

## 2026-09-28 07:47 PT — Antigravity

- Changed: labs/badge/internal/badge.ts, react/index.ts, package.json
- Why: implemented md-badge component modernization with CSS shadow parts (::part(badge), ::part(value)), max threshold truncation, dot mode, React 19 wrapper, and package export
- Commitment: md-badge correctly reflects badge/value parts and exposes typed React 19 component binding under @designtrove/material-web/react
- Failure Signature: missing ::part attributes on md-badge or TypeScript failure importing Badge from react wrapper
