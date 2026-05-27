# LineRate — agent instructions

You are working on a reskin of the Tailwind Plus UI Kit for **LineRate**, a treasury and settlement product built for nine-figure hosting agreements. Daily settlement, automated counterparty payments, real-time collateral, audit-ready reporting.

The audience is enterprise CFOs, treasury teams, and counterparty operations. The aesthetic is **documentary, audit-grade, restrained**. Think editorial weekly more than consumer SaaS.

This file is the source of truth for design and styling decisions. The values themselves live in `tokens.json` (canonical, platform-agnostic) and `linerate.css` (Tailwind v4 theme + semantic layer). When in doubt, this doc beats your intuition.

---

## Hard rules

1. **Use semantic tokens, not scale values.** `bg-surface text-foreground border-border` — never `bg-neutral-100 text-neutral-950 border-neutral-300`. Scale utilities exist as escape hatches; using them in product code is a defect.

2. **JetBrains Mono on every numeral that lives in the product.** Settlement amounts, transaction IDs, timestamps, account references, cycle numbers, hashes, percentages on data, durations. If a digit represents real-world data, it goes in mono. Add `font-mono` or use the `.ledger` class. Marketing copy and counter-style stat blocks can stay sans.

3. **Amber is a signal color. It is never a primary CTA.** Primary buttons are Ink on Bone (`bg-primary text-primary-foreground`). Amber appears in: status pills, focus rings, key marketing accents, the occasional inline emphasis. If a screen has more than one or two amber elements, something is wrong.

4. **Sentence case everywhere.** Button labels, headings, navigation, table headers. The only Title Case allowed is the legal name "LineRate" itself. The only ALL CAPS is mono eyebrows with wide tracking.

5. **No em dashes in copy.** Use commas, periods, or restructure. (This is brand voice, not a typographic preference.)

6. **Two weights as the default: 400 regular, 500 medium.** Use 600 only for true display moments (hero headlines, big numbers in marketing). Never bold for UI emphasis — use color and size instead.

7. **Flat surfaces. 0.5px borders. Minimal shadow.** Reach for `border-border` before `shadow-md`. Shadows exist for raised modals and floating menus only.

8. **Comfortable density.** Default padding on a card is `p-6` (24px). Default row padding in a list is `py-3.5` (14px). Don't go below `p-4` on a card without a reason.

---

## Voice

- Direct, factual, precise. The product handles real money, the copy should sound like it.
- No exclamation points. No "exciting news," "we're thrilled," or marketing exuberance.
- Numbers carry weight on their own — don't decorate them with adjectives. "$127.4M settled" beats "an incredible $127.4M settled."
- Mention concrete artifacts (audit pack, ledger, cycle, counterparty) over abstractions ("workflow," "experience").
- Headlines can be declarative or precise statements of fact. "Settle nine-figure obligations the same day." beats "The future of hosting payments."

---

## Type pairing

| Use | Family | Notes |
|---|---|---|
| Page titles, section heads, body, marketing, legal | Schibsted Grotesk | The voice of the brand |
| Settlement amounts, tx IDs, timestamps, hashes, account refs | JetBrains Mono | The voice of the ledger |
| Eyebrows above section heads | JetBrains Mono, `tracking-widest`, UPPERCASE, `text-foreground-subtle` | One per section, never more |

Display headings: `tracking-tight`, `font-medium`, `leading-[1.05]`. Body: `leading-normal`, `font-regular`.

Mono numerals at display size get `tracking-snug` (-0.01em) to keep them from looking loose.

---

## Color use

- **Page background:** `bg-page` (Bone). Use this everywhere by default.
- **Cards / elevated surfaces:** `bg-surface` (Paper, slightly lighter than the page).
- **Modals / popovers:** `bg-raised` (pure white).
- **Section dividers:** `border-border` (Parchment-derived).
- **Primary text:** `text-foreground` (Ink).
- **Secondary text:** `text-foreground-muted`. Captions: `text-foreground-subtle`.
- **Primary CTA:** `bg-primary text-primary-foreground hover:bg-primary-hover`.
- **Secondary CTA:** `bg-transparent text-foreground border border-foreground hover:bg-muted`.
- **Status pills:** `.pill--success` / `.pill--pending` / `.pill--danger`. Pending uses amber.
- **Inline emphasis (rare):** `text-accent` for an inline brand-tinted word in marketing copy. Not in product UI.

Dark mode is supported. Both themes share the amber. Neutrals invert.

---

## Reskin protocol — Tailwind Plus UI Kit

Sweep order. Do not jump ahead.

### Phase 1 — Foundation
1. Replace the kit's `globals.css` / Tailwind config with `linerate.css`.
2. Self-host Schibsted Grotesk (400, 500, 600) and JetBrains Mono (400, 500) and remove the Fontsource imports.
3. Run the app, confirm the base type and color scheme apply.

### Phase 2 — Primitives
4. Buttons: replace all variants with three forms — primary (Ink), secondary (outline), ghost (no border, hover bg). No amber buttons. No more than three sizes (sm, md, lg). Default is md.
5. Inputs: 0.5px border on default, ring on focus. No drop shadow. Mono variant for numeric inputs (amounts, references).
6. Links: `text-foreground` with `underline underline-offset-4 decoration-border-strong hover:decoration-foreground`. Never blue.
7. Badges and pills: only the `.pill--*` variants above. Remove any color variants you find in the kit.

### Phase 3 — Cards and data
8. Replace card components with `bg-surface border-border rounded-lg p-6`. No double-bordered cards.
9. Tables: numeric columns get `font-mono text-right`. Header row uses `eyebrow`-style labels (mono, widest tracking, uppercase, subtle color). Row dividers use `border-subtle`.
10. Stat blocks: large number in `font-mono font-medium`, label below in sans `text-foreground-subtle`. No icons on stat blocks unless they encode a delta.

### Phase 4 — Navigation and chrome
11. Top nav: `bg-page` with a `border-border` bottom border. No shadow. No backdrop blur.
12. Sidebar: `bg-page` with a `border-border` right border. Active item gets `bg-muted text-foreground`. Hover gets `bg-muted/60`.
13. Tabs: underline-style only, with `border-foreground` on the active tab.

### Phase 5 — Marketing surfaces
14. Hero: Schibsted Grotesk at `text-7xl` or `text-8xl`, `tracking-tight`, `font-medium`. Subhead in `text-lg text-foreground-muted`.
15. Section eyebrows above every marketing section.
16. Pricing tables: highlight tier uses a thin amber accent border (`border border-accent`), not amber fills. Body of the card stays neutral.
17. Logo cloud: grayscale neutrals only. No color logos.

### Phase 6 — Audit pass
18. Search the codebase for any of these and remove or fix:
    - `text-blue-`, `bg-blue-`, `text-indigo-`, `bg-indigo-` (kit defaults that snuck through)
    - Em dashes in any user-facing string (`—` → comma or period)
    - Title Case button labels
    - `font-bold` or `font-semibold` on body or button labels (downgrade to `font-medium`)
    - Numeric data in sans (`$1,234.56` should be `<span class="font-mono">$1,234.56</span>`)
    - Hardcoded hex values in components

---

## Component patterns you will need to invent

The UI Kit doesn't ship these. When LineRate-specific surfaces appear, build them with the patterns below:

- **Settlement summary card** — eyebrow + title row, big mono amount, counterparty list with three columns (party, amount-right, status-right). Status uses pills.
- **Counterparty row** — sub-row of a list. Name in sans, tx ID in small mono below the name, amount in mono right-aligned, status in mono right-aligned.
- **Ledger table** — dense tabular data. Mono numerals, sans labels, 0.5px row dividers, no zebra striping.
- **Audit pack export drawer** — slide-in from right, `bg-raised`, summary at top with mono figures, action row at bottom with primary export button.
- **Cycle indicator** — mono pill showing "T+0 · 14:32 UTC · cycle 4271" style metadata. Lives in headers and emails.

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
- No em dashes in copy.
- One primary CTA per screen. Amber appears two or three times max.
- The page looks like it could be a printed page from an annual report — quiet, intentional, audit-grade.
