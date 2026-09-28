# Material 3 Returns — Upstream Revival & Public Launch Plan

_Repository: `designtrove/material3-returns` | Target Package: `@designtrove/material-web`_

---

## Executive Objective

In June 2024, Google declared `@material/web` in maintenance mode pending new maintainers. 
`material3-returns` is the dedicated open-source upstream repository intended to revitalize this project for the global web development community.

Before initiating a high-visibility public launch (Hacker News, Reddit r/webdev, Lit Community, Twitter/X), we must complete the following comprehensive 7-phase operational readiness plan to ensure the library is stable, modern, accessible, and gap-free.

---

## Phase 1: Legal, Governance & Licensing Clearance

- [ ] **1.1 Preserve Google LLC Copyright Notices**:
  - Maintain the existing Apache-2.0 license header on all original Google-authored source files.
  - Establish `FORK_NOTICE.md` clearly documenting the heritage: forked from Google's `@material/web` at commit `70e259d`.
- [ ] **1.2 Developer Certificate of Origin (DCO)**:
  - Configure GitHub branch protection requiring `Signed-off-by` on all external pull requests (`git commit -s`).
- [ ] **1.3 Code of Conduct & Contributing Guide**:
  - Update `CONTRIBUTING.md` with guidelines for community pull requests, PR testing, and issue reporting.
- [ ] **1.4 Author Identity Audit**:
  - Ensure all commits and tags in the repository are authored under `Ganesh Nallasivam <ganesh.nallasivam@gmail.com>`.

---

## Phase 2: Build Toolchain Modernization & TS 5.x Upgrade

- [ ] **2.1 TypeScript & Compiler Upgrade**:
  - Upgrade from legacy TypeScript to TypeScript 5.6+ with strict null checks.
  - Ensure compatibility with Node 20, 22, and 24 LTS runtimes.
- [ ] **2.2 Modernized Build Pipeline**:
  - Evaluate and streamline `wireit` tasks (`build:ts`, `build:css-to-ts`, `build:manifest`).
  - Ensure zero build warnings on a clean checkout (`npm run build`).
- [ ] **2.3 Clean ES Module Emission**:
  - Verify that all emitted JS files in `button/`, `dialog/`, `textfield/`, etc., have valid relative specifiers (`.js` extensions) compliant with native browser ES modules.

---


---

## Phase 2.5: Developer DX & Modernization Overhaul

Addressing developer friction points from the original Google repository:

- [ ] **Modern CSS Styling Contracts**:
  - Expose clean CSS Shadow Parts (`::part(container)`, `::part(label)`, `::part(icon)`) on all components to eliminate Shadow DOM styling friction.
  - Zero-Sass pure CSS architecture using modern CSS features (`@layer`, `color-mix()`).
- [ ] **First-Class SSR & Framework Integration**:
  - Declarative Shadow DOM (`<template shadowrootmode="open">`) support to eliminate Next.js/Remix hydration mismatch and FOUCE.
  - Official typed React 19 wrappers under `@designtrove/material-web/react` with synthetic event forwarding.
  - Vue 3 and Svelte custom-element bindings.
- [ ] **Enterprise Form Association (ElementInternals)**:
  - Full form participation: standard `<form>` submission, native browser validation bubbles, and `FormData` extraction across all inputs.
- [ ] **Granular Subpath Tree-Shaking**:
  - Optimize bundle footprint ensuring single atomic component imports bundle under 4KB gzipped.
- [ ] **Enterprise Data Table & Missing Components**:
  - Engineering `md-data-table` (sortable, filterable, sticky header), `md-avatar`, and `md-badge`.

## Phase 3: Upstream Issue Backlog & Bug Triage (The Top 50)

When Google stepped down, ~120 open issues remained. Before going public, we resolve the top high-impact defects:

- [ ] **3.1 Server-Side Rendering (SSR) & Hydration Safety**:
  - Fix any direct references to `window`, `document`, or `customElements` in module evaluation scopes.
  - Implement Declarative Shadow DOM (`<template shadowrootmode="open">`) support to prevent Layout Flash (FOUCE) in Next.js, Nuxt, and Remix.
- [ ] **3.2 Form-Associated Custom Element (FACE) Deficiencies**:
  - Audit and fix `ElementInternals` form attachment across `md-filled-text-field`, `md-checkbox`, `md-radio`, and `md-outlined-select`.
  - Ensure standard `<form>` submission, `form.reset()`, and `FormData` extraction work identically to native HTML inputs.
- [ ] **3.3 Accessibility (A11y) & Keyboard Navigation Polish**:
  - Resolve open issues regarding focus traps and ESC key dismissal in `md-dialog` and `md-menu`.
  - Ensure full WCAG 2.2 AA contrast compliance across all dynamic M3 color tokens in both light and dark themes.

---

## Phase 4: Component Gap Completion (The Missing M3 Suite)

Deliver the official Material Design 3 specifications that Google never completed in `@material/web`:

- [ ] **4.1 Navigation Rail (`md-navigation-rail`)**:
  - Essential for tablet and desktop side-navigation.
  - Features: Header action button slot, 3–7 destination items, badge support, and collapse/expand states.
- [ ] **4.2 Bottom Navigation Bar (`md-navigation-bar`)**:
  - Mobile viewport navigation bar (3–5 destinations with active indicator pills and badges).
- [ ] **4.3 Bottom Sheets (`md-bottom-sheet`)**:
  - Standard (persistent) and Modal (dismissible) bottom sheets with drag handles and velocity tracking.
- [ ] **4.4 Date & Time Pickers (`md-date-picker`, `md-time-picker`)**:
  - Calendar grid view, date-range selection, time-input dials, and modal dialog presentations.
- [ ] **4.5 Segmented Buttons (`md-segmented-button-set`, `md-segmented-button`)**:
  - Single-select and multi-select segmented button groups with icon/label support.
- [ ] **4.6 Search Bar (`md-search-bar`, `md-search-view`)**:
  - Docked and floating M3 search bars with expanding search view overlay.
- [ ] **4.7 Tooltips (`md-tooltip`) & Snackbars (`md-snackbar`)**:
  - Plain and rich tooltips with hover/focus triggers; transient toast alerts.

---

## Phase 5: Automated Testing, Cross-Browser CI & Visual Regression

- [ ] **5.1 Playwright & Web Test Runner Matrix**:
  - Automated test suite executing on Chromium, WebKit (Safari), and Firefox.
- [ ] **5.2 Automated Accessibility Audit**:
  - Run `@axe-core/playwright` across every component variant to assert zero accessibility violations.
- [ ] **5.3 Visual Regression Testing**:
  - Snapshot testing for all components in light, dark, and forced-colors modes.

---

## Phase 6: Modern Documentation & Interactive Showcase

- [ ] **6.1 Retire Deprecated Firebase/Eleventy Catalog Site**:
  - Replace legacy catalog with a fast, modern interactive playground (VitePress or Storybook).
- [ ] **6.2 Live Interactive Playground**:
  - Live token tweaker (change seed color dynamically and watch all components update in real time).
  - One-click copy-paste code snippets for Web Components, React wrappers, and `designtrove` CLI.
- [ ] **6.3 Comprehensive Migration Guide**:
  - Step-by-step guide: *"Migrating from Google's `@material/web` to `@designtrove/material-web` in 5 minutes."*

---

## Phase 7: NPM Distribution & Public Launch Campaign

- [ ] **7.1 NPM Packaging**:
  - Publish `@designtrove/material-web` v3.0.0 to npm with provenance attestation and 2FA.
- [ ] **7.2 Launch Announcement ("Material 3 Returns")**:
  - **Campaign Headline**: *"Material 3 Returns: The Open-Source Community Revival of Google's Material Design 3 Web Components."*
  - **Launch Surfaces**:
    - Hacker News Show HN
    - Reddit (r/webdev, r/javascript, r/frontend)
    - Lit / Web Components Community Discord
    - Tech blog post explaining Google's departure and our long-term custodial commitment.
- [ ] **7.3 Integration with designtrove Ecosystem**:
  - Wire `designtrove` agent-native registry directly to the published `@designtrove/material-web` distribution.
