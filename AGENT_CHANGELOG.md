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

## 2026-09-28 08:09 PT — Antigravity

- Changed: labs/segmentedbutton/internal/segmented-button.ts, labs/segmentedbuttonset/internal/segmented-button-set.ts, react/index.ts, package.json
- Why: implemented md-segmented-button & md-segmented-button-set modernization with CSS shadow parts (::part(button), ::part(label), ::part(icon), ::part(checkmark), ::part(container)), React 19 wrappers (OutlinedSegmentedButton, OutlinedSegmentedButtonSet with onSegmentedButtonSetSelection event), and package exports
- Commitment: segmented button controls cleanly support styling customization via ::part(), emit typed React 19 bindings, and pass zero-warning wireit compilation
- Failure Signature: missing ::part attributes or TypeScript failure importing OutlinedSegmentedButtonSet from @designtrove/material-web/react

## 2026-09-28 08:32 PT — Antigravity

- Changed: labs/navigationbar/internal/navigation-bar.ts, labs/navigationtab/internal/navigation-tab.ts, react/index.ts, package.json
- Why: implemented md-navigation-bar and md-navigation-tab modernization with CSS shadow parts (::part(bar), ::part(tabs), ::part(tab), ::part(indicator), ::part(label)), React 19 wrappers with onNavigationBarActivated and onNavigationTabInteraction event bindings, and subpath package exports
- Commitment: navigation bar and tab components expose standard CSS parts for custom styling and typed React 19 bindings, compiling with 0 errors
- Failure Signature: missing ::part attributes or TypeScript failure importing NavigationBar / NavigationTab from @designtrove/material-web/react

## 2026-09-28 08:47 PT — Antigravity

- Changed: labs/navigationdrawer/internal/navigation-drawer.ts, labs/card/internal/card.ts, react/index.ts, package.json
- Why: implemented md-navigation-drawer and md-card (elevated, filled, outlined) modernization with CSS shadow parts (::part(drawer), ::part(content), ::part(container), ::part(outline)), React 19 wrappers (NavigationDrawer with onNavigationDrawerChanged event, ElevatedCard, FilledCard, OutlinedCard), and package exports
- Commitment: navigation drawer and card variants cleanly support external CSS part styling and export typed React 19 component definitions with zero wireit build warnings
- Failure Signature: missing ::part attributes or TypeScript failure importing NavigationDrawer / Card variants from @designtrove/material-web/react

## 2026-09-28 09:02 PT — Antigravity

- Changed: labs/item/internal/item.ts, react/index.ts, package.json
- Why: implemented md-item layout component modernization with CSS shadow parts (::part(container), ::part(text), ::part(overline), ::part(headline), ::part(supporting-text)), React 19 wrapper (Item), and package export
- Commitment: md-item cleanly exposes styling parts for list and layout item containers with full React 19 typings
- Failure Signature: missing ::part attributes or TypeScript failure importing Item from @designtrove/material-web/react
