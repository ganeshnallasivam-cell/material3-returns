# Material 3 Returns (`@designtrove/material-web`)

<p align="center">
  <strong>Active Community Custodianship of Google's Material Design 3 Web Components</strong>
</p>

---

## About This Repository

In June 2024, Google placed `@material/web` (Material Web Components) into unstaffed maintenance mode with the public note:
> *"MWC is in maintenance mode pending new maintainers."*

**Material 3 Returns** is the open-source community's answer to that call. Under the Apache-2.0 license, this repository serves as the active upstream codebase for Material 3 web components, maintaining, fixing, and expanding Google's official design system for the open web.

This project is maintained under the [designtrove](https://github.com/designtrove) organization.

---

## Goals & Roadmap

1. **Bug Fixes & Modernization**: Triage and resolve the ~120 open issues from the original upstream repository.
2. **Gap Filling**: Implement official Material 3 components that were never completed by Google:
   - Date & Time Pickers (`md-date-picker`, `md-time-picker`)
   - Navigation Rail (`md-navigation-rail`) & Navigation Bar (`md-navigation-bar`)
   - Top & Bottom App Bars (`md-top-app-bar`, `md-bottom-app-bar`)
   - Side & Bottom Sheet Modals (`md-side-sheet`, `md-bottom-sheet`)
   - Segmented Buttons (`md-segmented-button`) & Search Bar (`md-search-bar`)
3. **Framework-Agnostic Standards**: Built on native Web Components and Lit, fully compatible across React, Vue, Svelte, Angular, and vanilla HTML.
4. **Registry Integration**: Directly consumable as copy-paste source code via the `designtrove` agent-native registry (`npx designtrove add <component>`) or as a traditional npm package (`@designtrove/material-web`).

---

## Installation & Quick Start

### Traditional NPM
```bash
npm install @designtrove/material-web
```

```html
<script type="module">
  import '@designtrove/material-web/button/filled-button.js';
  import '@designtrove/material-web/checkbox/checkbox.js';
</script>

<md-filled-button>Click Me</md-filled-button>
<md-checkbox checked></md-checkbox>
```

### React 19 Integration
```tsx
import { FilledButton, FilledTextField } from '@designtrove/material-web/react';

export function LoginCard() {
  return (
    <form onSubmit={(e) => { e.preventDefault(); console.log('Submitted'); }}>
      <FilledTextField label="Email" type="email" required />
      <FilledButton type="submit">Log In</FilledButton>
    </form>
  );
}
```

### Copy-Paste Vendoring (Zero-Lock-in via designtrove)
```bash
npx designtrove add button textfield dialog
```

---

## Resolved Upstream Issues & Improvements

For the full audit of Google upstream bugs resolved, see [FIXES.md](./FIXES.md). Highlights include:
- Form submission on `Enter` keypress in single-line text fields (#4182).
- Dialog scrim `z-index` elevation and ESC cleanup (#4948, #5384).
- Continuous slider scrubbing via `step="any"` (#5077).
- Real `href` routing and downloads on Tabs (#5783).
- Keyboard space/enter activation on Menu Items (#5577).
- Suppression of duplicate Firefox calendar indicators and password reveal eyes (#5795, #5728).
- Radio arrow-key `input` event dispatching (#5983).
- `formnovalidate` support on buttons (#5780).
- Standardized CSS Shadow Parts across all components.

## License & Attribution

- Licensed under **Apache-2.0**.
- Original code Copyright Google LLC.
- Maintenance, community enhancements, and new components Copyright designtrove contributors.
- See [LICENSE](./LICENSE) and [FORK_NOTICE.md](./FORK_NOTICE.md) for full terms.
