# LineRate, agent instructions (Brand v3)

You are working on **LineRate**, a treasury and settlement product for nine-figure hosting agreements. Daily settlement, automated counterparty payments, real-time collateral, audit-ready reporting.

The audience is enterprise CFOs, treasury teams, and counterparty operations. The aesthetic is **documentary, audit-grade, dark-first, restrained**. Brand v3 (see the approved identity book LineRate-Identity-v3.pdf) puts the canonical surface on Onyx. Editorial weekly, not consumer SaaS.

This file is the source of truth for design decisions. The values live in `tokens.json` (canonical, platform-agnostic) and `src/app/globals.css` (Tailwind v4 theme + semantic layer). When in doubt, this doc beats your intuition.

---

## Hard rules

1. **Use semantic tokens, not scale values.** `bg-page text-foreground border-border`, never `bg-neutral-950 text-neutral-0 border-neutral-800`. Scale utilities exist as escape hatches; using them in product code is a defect.

2. **JetBrains Mono on every numeral that lives in the product.** Settlement amounts, transaction IDs, timestamps, account references, cycle numbers, hashes, percentages on data, durations. If a digit represents real-world data, it goes in mono. Add `font-mono` or use the `.ledger` class. Marketing copy and counter-style stat blocks may stay sans.

3. **Amber is the brand accent and appears VERY rarely.** Status pending pill, occasional brand-accent line under nav, one or two intentional appearances per marketing page. **Never a primary CTA.** Primary on dark is Paper on Onyx; primary on light is Onyx on Paper. If a screen has more than one or two amber elements, something is wrong.

4. **Sentence case for product copy.** Button labels, headings, navigation, table headers. ALL CAPS is reserved for the **wordmark** (`LINERATE`) and **mono eyebrows** with wide tracking. The legal name "LineRate" (sentence case with capital L and R) appears in body copy and accessibility text.

5. **No em dashes in copy.** Use commas, periods, parentheses, or restructure. (Brand voice. The rule extends to code comments and commit messages.)

6. **Two weights as the default: 400 regular, 500 medium.** Use 600 only for true display moments (hero headlines, the wordmark). Never bold for UI emphasis; use color and size instead.

7. **Flat surfaces. 1px borders. Tonal lift, not shadow.** On dark, elevation comes from stepping the surface color up (`bg-surface` → `bg-raised`). Reach for tonal contrast or `border-border` before `shadow-md`. Shadows exist for raised modals and floating menus only.

8. **Comfortable density.** Default padding on a card is `p-6` (24px). Default row padding in a list is `py-3.5` (14px). Don't go below `p-4` on a card without a reason.

---

## Voice

- Direct, factual, precise. The product handles real money; the copy should sound like it.
- No exclamation points. No "exciting news," "we're thrilled," or marketing exuberance.
- Numbers carry weight on their own. "$127.4M settled" beats "an incredible $127.4M settled."
- Mention concrete artifacts (audit pack, ledger, cycle, counterparty) over abstractions ("workflow," "experience").
- Headlines can be declarative or precise statements of fact. "Settle nine-figure obligations the same day." beats "The future of hosting payments."

---

## Type pairing

| Use | Family | Notes |
|---|---|---|
| Page titles, section heads, body, marketing, legal | General Sans | The voice of the brand. Self-hosted from Fontshare. |
| Settlement amounts, tx IDs, timestamps, hashes, account refs | JetBrains Mono | The voice of the ledger. |
| Eyebrows above section heads | JetBrains Mono, `tracking-widest`, UPPERCASE, `text-foreground-subtle` | One per section, never more. |
| Wordmark | General Sans Semibold, `uppercase`, `tracking-tight` | Use the `<Wordmark/>` component, not raw text. |

Display headings: `tracking-tight`, `font-medium`, `leading-[1.05]`. Body: `leading-normal`, `font-regular`.

Mono numerals at display size get `tracking-snug` (-0.01em) to keep them from looking loose.

---

## Color use

The system is intentionally narrow: five brand colors plus brand-tone status. Onyx is dominant, Paper is frequent, Chalk and Graphite are supporting, Amber is rare.

| Brand color | Hex | Role |
|---|---|---|
| Onyx | `#101010` | Page background (dark, canonical), primary text (light) |
| Paper | `#FFFFFF` | Primary text on dark, primary CTA fill on dark, page background (light) |
| Chalk | `#E5E5E5` | Light fill, borders on light |
| Graphite | `#838383` | Mid gray, muted text, supporting tone |
| Amber | `#DF8E2A` | Single accent: pending status, brand emphasis, rare marketing accents |

**Semantic usage**

- **Page background:** `bg-page` (Onyx on dark, Paper on light).
- **Cards / elevated surfaces:** `bg-surface` (one step above page).
- **Modals / popovers:** `bg-raised` (two steps above page).
- **Section dividers:** `border-border` and `border-border-subtle`.
- **Primary text:** `text-foreground` (Paper on dark, Onyx on light).
- **Secondary text:** `text-foreground-muted`. Captions: `text-foreground-subtle` (Graphite).
- **Primary CTA:** `bg-primary text-primary-foreground` (Paper on Onyx, or Onyx on Paper).
- **Secondary CTA:** outline using `border-foreground`.
- **Status pills:** `.pill--success` / `.pill--pending` / `.pill--danger`. Pending uses amber, success and danger use brand-tone desaturated tones.
- **Inline emphasis (rare):** `text-accent` for a single brand-tinted word.

Dark mode is the canonical surface. Light mode ships as the inverse via removing the `.dark` class on `<html>` (layout sets `.dark` by default; `<ThemeToggle/>` flips it).

---

## Reskin protocol for shadcn/ui

Sweep order. Do not jump ahead.

### Phase 1: Foundation
1. Merge tokens.json (canonical) into `src/app/globals.css` (Tailwind v4 theme + `:root` + `:root.dark`).
2. Self-host General Sans (400, 500, 600) and JetBrains Mono via `next/font/local` / `next/font/google`.
3. Set the `.dark` class on `<html>` by default in `app/layout.tsx`.
4. Run the app, confirm Onyx page + Paper text + General Sans heading.

### Phase 2: Primitives
5. Buttons: three forms (primary, secondary outline, ghost). Three sizes (sm/md/lg, default md). No amber, no destructive.
6. Inputs: 1px border, focus ring is the global ring. Mono variant for numeric fields.
7. Links: `text-foreground` with `underline underline-offset-4 decoration-border-strong hover:decoration-foreground`. Never blue.
8. Badges/pills: `.pill--*` variants only. Drop kit color variants.

### Phase 3: Cards and data
9. Cards: `bg-surface border-border rounded-lg p-6`. No double-bordered cards.
10. Tables: numeric columns `font-mono text-right`. Header row in the eyebrow style. Row dividers `border-subtle`.
11. Stat blocks: large number in `font-mono font-medium`, label in sans `text-foreground-subtle`. No icons unless they encode a delta.

### Phase 4: Navigation and chrome
12. Top nav: `bg-page` with `border-border` bottom border. No shadow. No backdrop blur. Wordmark on the left.
13. Sidebar: `bg-page` with `border-border` right border. Active item gets `bg-muted text-foreground`. Hover gets `bg-muted/60`.
14. Tabs: underline-style only, `border-foreground` on the active tab.

### Phase 5: Marketing surfaces
15. Hero: General Sans at `text-7xl` or `text-8xl`, `tracking-tight`, `font-medium`. Subhead in `text-lg text-foreground-muted`.
16. Section eyebrows above every marketing section.
17. Pricing tables: highlight tier uses a thin amber accent border (`border-accent`), not amber fill. Body stays neutral.
18. Logo cloud: grayscale neutrals only. No color logos.
19. Use `<Wordmark/>` in mastheads and OOH-style surfaces. Body copy and accessibility text still say "LineRate."

### Phase 6: Audit pass
20. Search the codebase for:
    - `text-blue-` / `bg-blue-` / `text-indigo-` / `bg-indigo-` (kit defaults that snuck through)
    - Em dashes in any user-facing string or comment (`—` → comma or period)
    - Title Case button labels
    - `font-bold` or `font-semibold` on body or button labels (downgrade to `font-medium`)
    - Numeric data in sans (should be `font-mono`)
    - Hardcoded hex values in components

---

## Component patterns you will need to invent

The UI Kit doesn't ship these. When LineRate-specific surfaces appear, build them with the patterns below:

- **Settlement summary card.** Eyebrow + title row, big mono amount, counterparty list with three columns (party, amount-right, status-right). Status uses pills.
- **Counterparty row.** Sub-row of a list. Name in sans, tx ID in small mono below, amount in mono right-aligned, status in mono right-aligned.
- **Ledger table.** Dense tabular data. Mono numerals, sans labels, subtle row dividers, no zebra striping.
- **Audit pack export drawer.** Slide-in from right, `bg-raised`, summary at top with mono figures, action row at bottom with primary export button.
- **Cycle indicator.** Mono pill showing "T+0 · 14:32 UTC · cycle 4271" style metadata. Lives in headers and emails.

---

## When to ask vs. when to ship

- **Ship without asking** if the change is mechanical (renaming utility classes, fixing case, replacing colors with semantic tokens, applying mono to numerals).
- **Ask first** if the change is structural (changing a component's layout, removing a section, inventing a new pattern not covered above).
- **Always ask** before adding a new color, font, weight, or radius value to the system. The system is intentionally constrained.

---

## What good output looks like

- A diff that's almost entirely class renames and semantic token swaps, with the structural HTML mostly intact.
- Numerals in mono everywhere they represent data.
- No raw hex values in component files.
- No em dashes in copy or comments.
- One primary CTA per screen. Amber appears once, maybe twice, never more.
- The page looks like it could be a printed page from an annual report, in black: quiet, intentional, audit-grade.
