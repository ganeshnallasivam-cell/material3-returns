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
## 2026-09-28 10:05 PT — Antigravity

- Changed: textfield/internal/text-field.ts, dialog/internal/_dialog.scss, slider/internal/slider.ts, react/index.ts
- Why: resolved top community friction points from @material/web (#4182 Enter form submit, #4948 scrim z-index, #5077 continuous slider step) and cleaned duplicate React exports
- Commitment: single-line text fields submit enclosing forms on Enter, scrim layers above tabs at z-index 1000, slider steps allow continuous scrubbing
- Failure Signature: form submission failing on Enter keypress in textfield or TS2345 type error on slider step build

## 2026-09-28 10:18 PT — Antigravity

- Changed: tabs/internal/tab.ts, menu/internal/controllers/menuItemController.ts, textfield/internal/_input.scss, radio/internal/single-selection-controller.ts, labs/behaviors/form-submitter.ts
- Why: resolved open community requests (#5783 tab href navigation, #5577 menu item keyboard activation, #5795/#5728 Firefox date icon and password reveal removal, #5983 radio keyboard input events, #5780 formnovalidate form submission bypass)
- Commitment: tabs support semantic hyperlink routing, menu items trigger clicks on Enter/Space, radio dispatches input event on arrow navigation, formnovalidate bypasses constraint checks
- Failure Signature: tab failing to follow href, menu button failing keyboard clicks, or form validation triggering when formnovalidate is active

## 2026-09-28 10:22 PT — Antigravity

- Changed: FIXES.md, README.md, .github/workflows/ci.yml
- Why: established upstream divergence ledger (FIXES.md), React 19 quickstart documentation, multi-node GitHub Actions CI workflow, and tagged release v2.5.0
- Commitment: downstream consumers have transparent traceability of all Google @material/web bug fixes, automated CI matrix validation, and signed release tags
- Failure Signature: missing FIXES.md or GitHub Actions workflow failure on commit push

