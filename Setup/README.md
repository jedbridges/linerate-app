# LineRate design system

The starter kit for LineRate's identity in code. Drop these into a repo, point Claude Code (or any agent) at them, and you have a working design system.

## Files

| File | Purpose |
|---|---|
| `tokens.json` | Canonical, platform-agnostic design tokens in [W3C Design Tokens format](https://tr.designtokens.org/format/). The source of truth. Transform with [Style Dictionary](https://styledictionary.com/) to generate Swift, Android, JS, or other outputs. |
| `linerate.css` | Tailwind v4 theme + semantic layer for web. Light and dark mode. Import once at the top of your global stylesheet. |
| `CLAUDE.md` | Agent instructions. Tells Claude Code (or Cursor, Codex, etc.) how to apply the system and where the hard lines are. |
| `README.md` | This file. |

## Quick start (Tailwind v4)

```css
/* app/globals.css */
@import "tailwindcss";
@import "./linerate.css";
```

Then use semantic utilities in components:

```tsx
<div className="bg-surface border-border rounded-lg p-6">
  <p className="eyebrow">Today's settlement</p>
  <p className="font-mono text-5xl font-medium tracking-snug text-foreground">
    $127,492,851.50
  </p>
  <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
    Export audit pack
  </button>
</div>
```

## Brand at a glance

| Token | Value | Use |
|---|---|---|
| Ink | `#14151A` | Primary text, primary buttons |
| Bone | `#F2EFE9` | Page background |
| Parchment | `#C2C0BD` | Borders, dividers |
| Amber | `#BE7818` | Signal color. Status, accents, marketing moments. Never primary. |
| Schibsted Grotesk | sans | Voice of the brand |
| JetBrains Mono | mono | Voice of the ledger. Every numeric value in product UI. |

## Reskinning the Tailwind Plus UI Kit

`CLAUDE.md` contains a six-phase sweep order. Hand the kit and these four files to Claude Code and prompt:

> Read `CLAUDE.md`, then start phase 1 of the reskin protocol. Confirm each phase before moving to the next.

## Adding a token

Don't, without a real reason. The system is intentionally narrow. If you must:

1. Add it to `tokens.json` with `$type`, `$value`, and `$description`.
2. Add the corresponding CSS variable to `linerate.css` (inside `@theme` for raw values, inside `:root` for semantic ones).
3. Add the rule for when to use it to `CLAUDE.md`.

If you can't write the third one, the token isn't ready.
