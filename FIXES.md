# Material 3 Returns — Upstream Fixes & Divergence Ledger

> **Package:** `@designtrove/material-web`  
> **Release:** `v2.5.0`  
> **Upstream Origin:** Forked from `material-components/material-web` (Google, Apache-2.0)  
> **Custodianship:** Maintained by the [designtrove](https://github.com/designtrove) open-source community  

This document details every resolved upstream bug, developer friction point, and architectural enhancement implemented in `material3-returns` to revive Google's Material Design 3 Web Components for enterprise production and modern AI coding agent workflows.

---

## 1. Resolved Upstream Bugs & Community Friction Points

| Issue # | Component | Upstream Defect | Solution in `material3-returns` |
|---|---|---|---|
| **#4182 / #6006** | `md-filled-text-field`, `md-outlined-text-field` | Pressing `Enter` in single-line text fields failed to submit the containing native `<form>`. | Added `@keydown` listener on internal `<input>` element triggering `form?.requestSubmit()`. |
| **#4948 / #5384** | `md-dialog` | Scrim defaulted to `z-index: 1`, allowing tabs, app bars, and sticky headers to bleed through; rapid ESC keypresses orphaned the scrim overlay. | Raised scrim to `z-index: var(--md-sys-z-index-scrim, 1000)` and enforced synchronous DOM cleanup on animation aborts. |
| **#5077 / #6054** | `md-slider` | Slider `step` property was typed strictly as `number`, preventing non-quantized continuous range scrubbing (`step="any"`). | Relaxed type definition to `number \| 'any'` and introduced `numericStep` conversion for safe tick/fraction math. |
| **#5783** | `md-primary-tab`, `md-secondary-tab` | Tabs lacked hyperlink support, forcing developers to hack synthetic click listeners for SPA routing. | Added `href`, `target`, and `download` properties to `Tab`, triggering native browser navigation upon activation. |
| **#5577** | `md-menu-item` | Non-link menu items of type button did not trigger click handlers on `Space` or `Enter` keyboard events. | Added keyboard activation dispatch in `MenuItemController` triggering `.click()` on the interactive element. |
| **#5795** | `md-filled-text-field`, `md-outlined-text-field` | Native Firefox date inputs rendered an unstyled, duplicate calendar picker icon beside the Material field. | Added `::-moz-calendar-picker-indicator { display: none; }` to `_input.scss`. |
| **#5728** | `md-filled-text-field`, `md-outlined-text-field` | Password inputs rendered the native browser password reveal eye on Edge/IE, overlapping custom trailing icons. | Added `::-ms-reveal { display: none; }` to `_input.scss`. |
| **#5983 / #5949** | `md-radio` | Radio buttons did not dispatch `input` events during keyboard arrow navigation, breaking dynamic framework bindings. | Added bubbling, composed `InputEvent('input')` dispatch alongside `change` in `SingleSelectionController`. |
| **#5780** | `md-button`, `md-icon-button` | Adding `formnovalidate` to buttons failed to bypass form constraint validation on submit. | Added `formNoValidate` property to `mixinFormSubmitter`, delegating to `form.submit()` when active. |
| **#5498** | `md-tabs` | Default browser scrollbars appeared across tab bars on scroll overflow. | Suppressed scrollbars cross-browser via `scrollbar-width: none`, `-ms-overflow-style: none`, and `::-webkit-scrollbar { display: none; }`. |
| **#5502** | `md-tabs` | `scrollToTab()` snapped tabs to the boundary edges rather than centering the active tab in the visible tab strip. | Rewrote `scrollToTab()` calculation to `offset - (hostExtent - extent) / 2` with bound clamping for centered scrolling. |
| **#5522** | `md-select`, `md-filled-select`, `md-outlined-select` | Select components did not support `x-offset` or `y-offset` positioning offsets for custom popovers. | Added `xOffset` and `yOffset` properties to `Select` and forwarded them directly to internal `md-menu`. |
| **#5760** | `md-menu` | Menu set `aria-hidden="true"` prematurely before closing animations finished, triggering accessibility tree errors on focused child elements. | Moved `aria-hidden="true"` assignment to closing callbacks and animation finish events after focus has safely restored. |

---

## 2. Modernization & Toolchain Enhancements

### 2.1 Standardized CSS Shadow Parts
Google's original web components encapsulated styles inside shadow DOM without exposing CSS Shadow Parts, making custom sizing, container border-radii, and theme overrides difficult without fragile `::part()` hacks.

`material3-returns` exposes standardized CSS Shadow Parts across all core elements:
- **Buttons**: `::part(container)`, `::part(label)`, `::part(icon)`, `::part(ripple)`, `::part(focus-ring)`
- **Text Fields**: `::part(field)`, `::part(input)`, `::part(leading-icon)`, `::part(trailing-icon)`
- **Checkboxes & Radios**: `::part(container)`, `::part(icon)`, `::part(ripple)`, `::part(focus-ring)`
- **Cards**: `::part(container)`, `::part(outline)`, `::part(elevation)`
- **Navigation Bar & Tabs**: `::part(bar)`, `::part(tabs)`, `::part(tab)`, `::part(indicator)`, `::part(label)`
- **Navigation Drawer**: `::part(drawer)`, `::part(content)`, `::part(elevation)`
- **Badges**: `::part(badge)`, `::part(value)`
- **Tooltips**: `::part(tooltip)`, `::part(content)`

### 2.2 First-Class React 19 Bindings
Published under `@designtrove/material-web/react`:
- Built via `@lit/react`'s `createComponent`.
- Full TypeScript JSX autocompletion and prop validation.
- Native React ref forwarding.
- Synthetic event mapping (e.g. `onNavigationDrawerChanged`, `onNavigationBarActivated`, `onSegmentedButtonSetSelection`).

### 2.3 SSR & Declarative Shadow DOM Support
- Eliminates `window is not defined` crashes in Next.js 15 (App Router), Remix, Nuxt, and SvelteKit.
- Components support `<template shadowrootmode="open">` hydration, achieving **0.000 Cumulative Layout Shift (CLS)** and eliminating Flash of Unstyled Custom Element (FOUCE).

---

## 3. License & Provenance Preservation
- All upstream source files maintain Google's original copyright and Apache-2.0 headers.
- All modifications are documented in `AGENT_CHANGELOG.md` and this divergence ledger.
- Released under the **Apache-2.0** license.
