# LineRate design system

LineRate is a treasury and settlement product built for nine-figure hosting
agreements. Daily settlement, automated counterparty payments, real-time
collateral, audit-ready reporting.

The audience is enterprise CFOs, treasury teams, and counterparty operations.
The aesthetic is **documentary, audit-grade, restrained**. Editorial weekly,
not consumer SaaS.

This document is the portable contract for the system. Hand it to a new
collaborator, a new agent, or paste it into Cursor or Claude and they have
everything they need to apply LineRate consistently.

The values live in three places, all of which agree:

| File | Role |
|---|---|
| `Setup/tokens.json` | Canonical, platform-agnostic source of truth (W3C Design Tokens format). |
| `src/app/globals.css` | Live web stylesheet: Tailwind v4 theme, semantic layer, light/dark, shadcn compatibility bridge. Edit here to retheme the running app. |
| This file | The narrative spec. Reads top to bottom. |

When the three disagree, fix all three.

---

## Principles

Eight hard rules. Violations are defects, not preferences.

1. **Use semantic tokens, not scale values.** `bg-surface text-foreground border-border`, never `bg-neutral-100 text-neutral-950 border-neutral-300`. Scale utilities exist as escape hatches; using them in product code is a defect.

2. **JetBrains Mono on every numeral that lives in the product.** Settlement amounts, transaction IDs, timestamps, account references, cycle numbers, hashes, percentages on data, durations. If a digit represents real-world data, it goes in mono. Add `font-mono` or use the `.ledger` class. Marketing copy and counter-style stat blocks may stay sans.

3. **Amber is a signal color. It is never a primary CTA.** Primary buttons are Ink on Bone (`bg-primary text-primary-foreground`). Amber appears in status pills, focus rings, the recommended pricing tier's border, and rare inline emphasis. If a screen has more than one or two amber elements, something is wrong.

4. **Sentence case everywhere.** Button labels, headings, navigation, table headers. The only Title Case allowed is the legal name "LineRate" itself and proper nouns in data (counterparty names). The only ALL CAPS is mono eyebrows with wide tracking.

5. **No em dashes in copy.** Use commas, periods, parentheses, or restructure. (This is brand voice, not a typographic preference. The rule extends to code comments and commit messages.)

6. **Two weights as the default: 400 regular, 500 medium.** Use 600 only for true display moments (hero headlines). Never bold for UI emphasis; use color and size instead.

7. **Flat surfaces. 1px borders. Minimal shadow.** Reach for `border-border` before `shadow-md`. Shadows exist for raised modals and floating menus only.

8. **Comfortable density.** Default padding on a card is `p-6` (24px). Default row padding in a list is `py-3.5` (14px). Don't go below `p-4` on a card without a reason.

---

## Voice

- Direct, factual, precise. The product handles real money; the copy should sound like it.
- No exclamation points. No "exciting news," "we're thrilled," or marketing exuberance.
- Numbers carry weight on their own. "$127.4M settled" beats "an incredible $127.4M settled."
- Mention concrete artifacts (audit pack, ledger, cycle, counterparty) over abstractions ("workflow," "experience").
- Headlines can be declarative or precise statements of fact. "Settle nine-figure obligations the same day." beats "The future of hosting payments."

---

## Tokens

### Color

The system is intentionally narrow: a neutral scale, an amber scale, and two muted status palettes (success, danger). Everything else is composition.

**Brand**

| Token | Hex | Role |
|---|---|---|
| Ink | `#14151A` | Primary text, primary buttons. The darkest tone. |
| Bone | `#F2EFE9` | Page background. Warm off-white. |
| Parchment | `#C2C0BD` | Borders, dividers, low-emphasis surfaces. |
| Amber | `#BE7818` | Signal color. Never primary. |

**Neutral scale (Ink family)** — `#FFFFFF` → `#14151A` across 12 stops. Use semantic tokens; scale utilities are escape hatches.

**Amber scale** — `#FCF4E5` → `#261805` across 11 stops. Signal use only.

**Semantic roles (live tokens in `globals.css :root`)**

| Token | Light | Dark | Use |
|---|---|---|---|
| `--page` | neutral-100 (Bone) | neutral-950 (Ink) | Page background |
| `--surface` | neutral-50 | neutral-900 | Cards, elevated panels |
| `--raised` | neutral-0 (white) | neutral-800 | Modals, popovers, dropdowns |
| `--muted` | neutral-200 | neutral-800 | Hover fills, subtle backgrounds |
| `--foreground` | neutral-950 | neutral-100 | Primary text |
| `--foreground-muted` | neutral-700 | neutral-400 | Secondary text, labels |
| `--foreground-subtle` | neutral-600 | neutral-500 | Captions, eyebrows, metadata |
| `--border` | neutral-300 | neutral-800 | Default borders |
| `--border-subtle` | neutral-200 | neutral-900 | Row dividers, soft separators |
| `--primary` | neutral-950 | neutral-100 | Primary CTA fill |
| `--primary-foreground` | neutral-100 | neutral-950 | Primary CTA text |
| `--accent` | amber-500 | amber-500 | Signal accents (always amber) |
| `--success-surface` | success-50 | success-700 | Settled pill background |
| `--danger-surface` | danger-50 | danger-700 | Failed pill background |
| `--pending-surface` | amber-50 | amber-900 | Pending pill background (amber) |
| `--ring` | rgba(190,120,24,0.32) | rgba(232,177,76,0.38) | Focus ring (amber) |

### Typography

| Family | Stack | Voice |
|---|---|---|
| Sans | Schibsted Grotesk | The voice of the brand. Headings, body, marketing, legal. |
| Mono | JetBrains Mono | The voice of the ledger. Settlement amounts, transaction IDs, timestamps, hashes, account references. |

Fonts are self-hosted via `next/font/google` in `src/app/layout.tsx`, exposed as `--font-schibsted` and `--font-jetbrains-mono`. `--font-sans` and `--font-mono` in `globals.css @theme` resolve through them.

**Size scale**

`xs 11` · `sm 13` · `base 15` · `md 16` · `lg 18` · `xl 20` · `2xl 24` · `3xl 30` · `4xl 36` · `5xl 48` · `6xl 64` · `7xl 80` · `8xl 96` (all in px)

**Weight**

`400 regular` (default body) · `500 medium` (UI emphasis, headings) · `600 semibold` (hero headlines only)

**Tracking**

`tight -0.02em` (display) · `snug -0.01em` (mid headings, mono numerals at display size) · `normal 0` · `wide 0.08em` (eyebrows, small caps) · `widest 0.14em` (mono eyebrows, system labels)

**Leading**

`tight 1.05` (display) · `snug 1.2` · `normal 1.5` (body) · `relaxed 1.65`

### Spacing

`0` · `0.5 = 2px` · `1 = 4px` · `1.5 = 6px` · `2 = 8px` · `3 = 12px` · `4 = 16px` · `5 = 20px` · `6 = 24px` · `8 = 32px` · `10 = 40px` · `12 = 48px` · `16 = 64px` · `20 = 80px` · `24 = 96px` · `32 = 128px`

### Radius

`xs 2` · `sm 4` · `md 6` · `lg 8` · `xl 12` · `2xl 16` · `full 9999` (all in px)

Cards use `rounded-lg`. Buttons and inputs use `rounded-md`. Popovers use `rounded-md`. Pills use `rounded-sm`.

### Shadow

Mostly flat. Three available levels:

- `none` for default surfaces.
- `sm` (`0 1px 0 0 rgba(20,21,26,.04)`) for very subtle lift.
- `md` (`0 1px 2px rgba(20,21,26,.06)`) for floating menus and popovers.
- `lg` (`0 4px 12px rgba(20,21,26,.08)`) for modals and sheets.

Reach for `border-border` before any shadow.

### Motion

`fast 120ms` · `normal 200ms` · `slow 320ms`. Easing: `cubic-bezier(0.2, 0, 0, 1)` for default.

---

## Primitives

All primitives live in `src/components/ui/`. They are source files in the repo (shadcn model). Edit in place; do not wrap.

### Button

`primary` (Ink fill), `secondary` (Ink outline), `ghost` (no border, muted hover). Three sizes: `sm` (h-8), `md` (h-10, default), `lg` (h-12). Font weight 500. Rounded `md`. Focus handled by the global amber ring. No `destructive` variant.

```tsx
<Button>Export audit pack</Button>
<Button variant="secondary">View ledger</Button>
<Button variant="ghost">Cancel</Button>
```

### Input, Textarea, Label

Thin border, transparent background (adapts to page or surface), placeholder in `foreground-subtle`. Pass `mono` for ledger fields:

```tsx
<Label htmlFor="amount">Settlement amount</Label>
<Input id="amount" mono defaultValue="127,492,851.50" />
```

### Select

Trigger matches Input. Content lifts onto `bg-raised` with `border-border` and `shadow-md`. Highlighted items use `bg-muted` (never `bg-accent`).

### Badge

Renders the LineRate pill style (mono, uppercase, wide tracking, small radius). Four variants: `neutral`, `success`, `pending`, `danger`. No other colors.

```tsx
<Badge variant="success">Settled</Badge>
<Badge variant="pending">Pending</Badge>
<Badge variant="danger">Failed</Badge>
```

### Separator

`bg-border-subtle` by default for quiet dividers in cards and lists. Pass `className="bg-border"` for a stronger break.

### Card

`bg-surface`, `border-border`, `rounded-lg`, `p-6`. Composes `CardHeader` / `CardTitle` / `CardDescription` / `CardAction` / `CardContent` / `CardFooter`. No double borders, no footer fills.

### Table

Header cells render in the eyebrow style (mono, widest tracking, uppercase, subtle). Pass `numeric` on `TableHead` and `TableCell` for mono, tabular, right-aligned columns.

```tsx
<TableHead numeric>Amount</TableHead>
<TableCell numeric>42,180,000.00</TableCell>
```

Row dividers use `border-subtle`. No zebra striping. No hover background by default.

### Tabs

Underline style only. Active trigger gets `border-foreground`; inactive triggers sit in `foreground-muted` and brighten on hover. No segmented pill variant.

### Overlays (Dialog, Sheet, DropdownMenu, Popover, Tooltip)

All share the floating surface vocabulary: `bg-raised`, `border-border`, `shadow-md` (`shadow-lg` for full sheets and modals). No backdrop blur. Highlighted dropdown / select items use `bg-muted`, never `bg-accent`. Tooltip inverts to `bg-inverse` (Ink) with `text-foreground-inverse` (Bone), sized for mono reveals.

Wrap the root layout in `<TooltipProvider>` (already done in `src/app/layout.tsx`).

---

## Patterns

LineRate-specific compositions in `src/components/patterns/`. Build new patterns the same way: compose primitives, never invent new tokens.

### SettlementSummary

Card + Table + Badge. An eyebrow + title row, a big mono total, and a counterparty list with three columns (party, amount-right, status-right). Status uses pills.

### AuditPackDrawer

Sheet (right side) + Badge + Button. Header with eyebrow and title, body with `<dl>` of mono figures, footer with `Copy hash` (ghost) and `Download audit pack` (primary). Slide-in from right.

### Patterns to build next (named in the original brief)

- **Counterparty row** — sub-row of a list. Name in sans, tx ID in small mono below the name, amount in mono right-aligned, status in mono right-aligned.
- **Ledger table** — dense tabular data. Mono numerals, sans labels, 0.5px row dividers, no zebra striping. (Table primitive already supports this via `numeric`.)
- **Cycle indicator** — mono pill showing `T+0 · 14:32 UTC · cycle 4271` style metadata. Lives in headers and emails.

---

## Marketing surfaces

In `src/components/marketing/`. Looser brand voice (still no exclamation points or em dashes), display-size headlines, sentence case throughout.

- **Hero** — `text-7xl` Schibsted Grotesk medium, factual subhead, primary Ink + secondary outline CTAs.
- **StatRow** — counter-style stats. Sans permitted here (CLAUDE.md exception). Generous spacing.
- **FeatureGrid** — numbered blocks (mono index, sentence-case title, factual body). No icons.
- **PricingTable** — three tiers, all on `bg-surface`. Highlight tier uses a thin `border-accent` (amber) outline and a `RECOMMENDED` mono eyebrow in the border gap. Body never gets an amber fill.
- **LogoCloud** — grayscale only. Text wordmarks in this scaffold; swap to `<img>` or `<svg>` for production.

---

## How to retheme

The system is built to evolve. Three swap points, in increasing scope.

**1. Tweak a color, weight, or radius.**
Edit the relevant token in `src/app/globals.css`. The change is live everywhere because every component references semantic tokens.

Example: change the brand amber to a brand cobalt.

```css
/* In @theme */
--color-amber-500: #2860c0;  /* new brand color */
--color-amber-600: #1f4a99;
/* ...and the rest of the amber scale */

/* --accent and --ring still point through these tokens, so amber-coded
   elements (pills, accent border, focus ring) all retheme together. */
```

The system would still call the role "amber" internally; rename the scale variable for clarity if the brand is no longer amber.

**2. Switch fonts.**
Edit `src/app/layout.tsx` to load a different family from `next/font/google` (or `next/font/local`). Update `--font-sans` / `--font-mono` in `globals.css @theme` to reference the new variable.

**3. Swap the entire brand identity.**
Edit `Setup/tokens.json` (the canonical source), then propagate to `globals.css`. The four semantic surfaces (`--page`, `--surface`, `--raised`, `--muted`) and four text roles (`--foreground`, `--foreground-muted`, `--foreground-subtle`, `--foreground-disabled`) are the API. Every component consumes them. Components do not need to change.

**Dark mode** is already wired. Toggle `.dark` on `<html>` (the `ThemeToggle` component in `src/components/theme-toggle.tsx` does this). The `:root.dark` block in `globals.css` mirrors the light tokens to dark values.

**Adding a new token, weight, or radius.** Don't, unless you have a real reason. The system is narrow on purpose. If you must:

1. Add it to `Setup/tokens.json`.
2. Add the CSS variable to `globals.css` (inside `@theme` for raw scale values, inside `:root` for semantic roles).
3. Document when to use it in this file.

If you cannot write the third step, the token isn't ready.

---

## Surfaces

The scaffold ships three routes:

- `/` — LineRate index. Eyebrow, hero, two routed buttons.
- `/marketing` — full marketing landing (Hero, LogoCloud, StatRow, FeatureGrid, PricingTable).
- `/styleguide` — design system reference. Every primitive and pattern in one page, with a dark-mode toggle.

---

## What good output looks like

- A diff that's almost entirely class renames and semantic token swaps, with the structural HTML mostly intact.
- Numerals in mono everywhere they represent data.
- No raw hex values in component files.
- No em dashes in copy or comments.
- One primary CTA per screen. Amber appears two or three times max.
- The page looks like it could be a printed page from an annual report: quiet, intentional, audit-grade.
