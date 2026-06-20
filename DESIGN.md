# LineRate design system (Brand v3)

LineRate is a treasury and settlement product for nine-figure hosting
agreements. Daily settlement, automated counterparty payments, real-time
collateral, audit-ready reporting.

The audience is enterprise CFOs, treasury teams, and counterparty operations.
The aesthetic is **documentary, audit-grade, dark-first, restrained**.
Editorial weekly, not consumer SaaS. The canonical surface is Onyx (page) with
Paper (text); light mode ships as the inverse.

This document is the portable contract for the system. Hand it to a new
collaborator, a new agent, or paste it into Cursor or Claude and they have
everything they need to apply LineRate consistently.

The values live in three places, all of which agree:

| File | Role |
|---|---|
| `Setup/tokens.json` | Canonical, platform-agnostic source of truth (W3C Design Tokens format). |
| `src/app/globals.css` | Live web stylesheet: Tailwind v4 theme, semantic layer, dark and light, shadcn compatibility bridge. Edit here to retheme the running app. |
| This file | The narrative spec. Reads top to bottom. |
| `LineRate-Identity-v3.pdf` | Approved brand identity book at the project root. Source of the v3 palette and type. |

When they disagree, fix all three.

---

## Principles

Eight hard rules. Violations are defects, not preferences.

1. **Use semantic tokens, not scale values.** `bg-page text-foreground border-border`, never `bg-neutral-950 text-neutral-0 border-neutral-800`. Scale utilities exist as escape hatches; using them in product code is a defect.

2. **JetBrains Mono on every numeral that lives in the product.** Settlement amounts, transaction IDs, timestamps, account references, cycle numbers, hashes, percentages on data, durations. If a digit represents real-world data, it goes in mono. Add `font-mono` or use the `.ledger` class. Marketing copy and counter-style stat blocks may stay sans.

3. **Amber is the brand accent and appears VERY rarely.** Status pending pill, occasional brand-accent line under nav, one or two intentional appearances per marketing page. **Never a primary CTA.** Primary on dark is Paper on Onyx; primary on light is Onyx on Paper. If a screen has more than one or two amber elements, something is wrong.

4. **Sentence case for product copy.** Button labels, headings, navigation, table headers. ALL CAPS is reserved for the **wordmark** (`LINERATE`) and **mono eyebrows** with wide tracking. The legal name "LineRate" appears in body copy and accessibility text.

5. **No em dashes in copy.** Use commas, periods, parentheses, or restructure. (Brand voice. The rule extends to code comments and commit messages.)

6. **Two weights as the default: 400 regular, 500 medium.** Use 600 only for true display moments (hero headlines, the wordmark). Never bold for UI emphasis; use color and size instead.

7. **Flat surfaces. 1px borders. Tonal lift, not shadow.** On dark, elevation comes from stepping the surface color up (`bg-surface` then `bg-raised`). Reach for tonal contrast or `border-border` before `shadow-md`. Shadows exist for raised modals and floating menus only.

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

Five brand colors. Their swatch proportions in the identity book communicate the hierarchy: Onyx dominant, Paper frequent, Chalk and Graphite supporting, Amber rare.

**Brand**

| Token | Hex | Role |
|---|---|---|
| Onyx | `#101010` | Page background on dark (canonical). Primary text on light. |
| Paper | `#FFFFFF` | Primary text on dark. Primary CTA fill on dark. Page background on light. |
| Chalk | `#E5E5E5` | Light fill. Top of the neutral ramp on light surfaces. |
| Graphite | `#838383` | Mid gray. Muted text. Supporting tone. |
| Amber | `#DF8E2A` | Single accent. Pending status, brand-accent line under nav, rare marketing emphasis. Never primary. |

**Neutral scale (Onyx to Paper ramp, cool grayscale).** 12 stops from `#FFFFFF` (Paper) to `#101010` (Onyx). Use the semantic tokens; scale utilities are escape hatches.

**Amber scale.** 11 stops derived from `#DF8E2A`. Used very rarely.

**Brand-tone status.** Desaturated, harmonious with the neutral ramp:

- Success `#6B7A5C` (forest, graphite-tinted)
- Danger `#9C5650` (brick, graphite-tinted warm)

**Semantic roles (live tokens in `globals.css`)**

Dark (canonical):

| Token | Value | Use |
|---|---|---|
| `--page` | neutral-950 (Onyx) | Page background |
| `--surface` | neutral-900 | Cards, elevated panels |
| `--raised` | neutral-800 | Modals, popovers, dropdowns |
| `--muted` | neutral-800 | Subtle fills, hover states |
| `--foreground` | neutral-0 (Paper) | Primary text |
| `--foreground-muted` | neutral-400 | Secondary text |
| `--foreground-subtle` | neutral-500 (Graphite) | Captions, eyebrows |
| `--border` | neutral-800 | Default borders |
| `--border-subtle` | neutral-900 | Row dividers, soft separators |
| `--primary` | neutral-0 (Paper) | Primary CTA fill |
| `--primary-foreground` | neutral-950 (Onyx) | Primary CTA text |
| `--accent` | amber-500 | Brand accent, rare |
| `--ring` | rgba(255,255,255,0.18) | Focus ring on dark |

Light (the inverse) flips the page and the primary CTA: page = Paper, primary = Onyx on Paper. The brand-tone status surfaces shift to their light counterparts.

### Typography

| Family | Stack | Voice |
|---|---|---|
| Sans | General Sans | The voice of the brand. Self-hosted from Fontshare (OFL). |
| Mono | JetBrains Mono | The voice of the ledger. |

Fonts are self-hosted via `next/font/local` for General Sans (files under `/public/fonts/`) and `next/font/google` for JetBrains Mono. They are exposed as `--font-general-sans` and `--font-jetbrains-mono`, mapped to `--font-sans` and `--font-mono` in `globals.css @theme`.

**Size scale** (px)

`xs 11` · `sm 13` · `base 15` · `md 16` · `lg 18` · `xl 20` · `2xl 24` · `3xl 30` · `4xl 36` · `5xl 48` · `6xl 64` · `7xl 80` · `8xl 96`

**Weight**

`400 regular` (default body) · `500 medium` (UI emphasis, headings) · `600 semibold` (hero headlines and the wordmark only)

**Tracking**

`tight -0.02em` (display, wordmark) · `snug -0.01em` (mid headings, mono numerals at display size) · `normal 0` · `wide 0.08em` (eyebrows) · `widest 0.14em` (mono eyebrows, system labels)

**Leading**

`tight 1.05` (display) · `snug 1.2` · `normal 1.5` (body) · `relaxed 1.65`

### Spacing

`0` · `2px` · `4` · `6` · `8` · `12` · `16` · `20` · `24` · `32` · `40` · `48` · `64` · `80` · `96` · `128`

### Radius (px)

`xs 2` · `sm 4` · `md 6` · `lg 8` · `xl 12` · `2xl 16` · `full 9999`

Cards use `rounded-lg`. Buttons and inputs use `rounded-md`. Popovers use `rounded-md`. Pills use `rounded-sm`.

### Shadow

Mostly flat on dark; elevation comes from tonal lift, not shadow. Reserved:

- `sm` for very subtle separation.
- `md` (`0 1px 2px rgba(0,0,0,0.20), 0 0 0 0.5px rgba(0,0,0,0.30)`) for floating menus and popovers.
- `lg` (`0 8px 24px rgba(0,0,0,0.30), 0 0 0 0.5px rgba(0,0,0,0.30)`) for modals and sheets.

### Motion

`fast 120ms` · `normal 200ms` · `slow 320ms`. Easing: `cubic-bezier(0.2, 0, 0, 1)` for default.

---

## Wordmark

The wordmark sits in mastheads, footers, OOH-style surfaces, and anywhere the brand stamps itself. Always `LINERATE` in ALL CAPS, General Sans Semibold, tracking-tight. Use the `<Wordmark/>` component (`src/components/wordmark.tsx`). When the custom-wordmark SVG is delivered, swap the span for the inline SVG and keep the same className API.

Body copy and accessibility text always use the legal name **"LineRate"** (sentence case).

---

## Primitives

All primitives live in `src/components/ui/` as source files (shadcn model). Edit in place; do not wrap.

### Button

`primary` (Paper on Onyx on dark; Onyx on Paper on light), `secondary` (outline using `border-foreground`), `ghost` (no border, muted hover). Three sizes: `sm` (h-8), `md` (h-10, default), `lg` (h-12). Weight 500. Rounded `md`. Focus handled by the global ring. No `destructive` variant.

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

Renders the LineRate pill style (mono, uppercase, wide tracking, small radius). Four variants: `neutral`, `success`, `pending`, `danger`. Pending is amber; success and danger are brand-tone (desaturated forest and brick).

### Separator

`bg-border-subtle` by default. Pass `className="bg-border"` for a stronger break.

### Card

`bg-surface`, `border-border`, `rounded-lg`, `p-6`. Composes `CardHeader` / `CardTitle` / `CardDescription` / `CardAction` / `CardContent` / `CardFooter`. No double borders, no footer fills.

### Table

Header cells in the eyebrow style (mono, widest tracking, uppercase, subtle). Pass `numeric` on `TableHead` and `TableCell` for mono, tabular, right-aligned columns. Row dividers use `border-subtle`. No zebra striping.

### Tabs

Underline style only. Active trigger gets `border-foreground`; inactive triggers sit in `foreground-muted` and brighten on hover.

### Overlays (Dialog, Sheet, DropdownMenu, Popover, Tooltip)

All share the floating surface vocabulary: `bg-raised`, `border-border`, `shadow-md` (`shadow-lg` for full sheets and modals). No backdrop blur. Highlighted dropdown items use `bg-muted`. Tooltip inverts to `bg-inverse` with `text-foreground-inverse`, sized for mono reveals.

`<TooltipProvider/>` is wrapped at the root layout.

---

## Patterns

LineRate-specific compositions in `src/components/patterns/`. Build new patterns the same way: compose primitives, never invent new tokens.

### SettlementSummary

Card + Table + Badge. Eyebrow + title row, big mono total, counterparty list with three columns (party, amount-right, status-right). Status uses pills.

### AuditPackDrawer

Sheet (right side) + Badge + Button. Header with eyebrow and title, body with `<dl>` of mono figures, footer with `Copy hash` (ghost) and `Download audit pack` (primary).

### Patterns still to build

- **Counterparty row.** Sub-row of a list. Name in sans, tx ID in small mono below, amount in mono right-aligned, status in mono right-aligned.
- **Ledger table.** Dense tabular data. Mono numerals, sans labels, subtle row dividers, no zebra striping. (Table primitive supports this via `numeric`.)
- **Cycle indicator.** Mono pill showing `T+0 · 14:32 UTC · cycle 4271` style metadata. Lives in headers and emails.

---

## Marketing surfaces

In `src/components/marketing/`. Same brand voice (no exclamation points or em dashes), display-size headlines, sentence case throughout.

- **Hero.** `text-7xl` General Sans medium, factual subhead, primary Paper-on-Onyx + secondary outline CTAs.
- **StatRow.** Counter-style stats. Sans permitted here. Generous spacing.
- **FeatureGrid.** Numbered blocks (mono index, sentence-case title, factual body). No icons.
- **PricingTable.** Three tiers, all on `bg-surface`. Highlight tier uses a thin `border-accent` outline and a `RECOMMENDED` mono eyebrow in the border gap. Body never gets an amber fill.
- **LogoCloud.** Grayscale only. Text wordmarks in the scaffold; swap to `<img>` / `<svg>` for production.

---

## How to retheme

The system is built to evolve. Three swap points, in increasing scope.

**1. Tweak a color, weight, or radius.**
Edit the relevant token in `src/app/globals.css`. The change is live everywhere because every component references semantic tokens.

Example: change the brand amber to cobalt.

```css
/* In @theme */
--color-amber-500: #2860c0;
--color-amber-600: #1f4a99;
/* ...and the rest of the amber scale */
```

`--accent` and `--ring` reference these tokens through the semantic layer, so amber-coded elements (pending pill, accent border, the rare brand-accent line) all retheme together.

**2. Switch fonts.**
Drop new `.woff2` files into `/public/fonts/`. Update the `localFont` config in `src/app/layout.tsx` to reference them with a new `variable` name. Update `--font-sans` in `globals.css @theme` to reference the new variable.

**3. Swap the entire brand identity.**
Edit `Setup/tokens.json` (the canonical source), then propagate to `globals.css`. The four semantic surfaces (`--page`, `--surface`, `--raised`, `--muted`) and four text roles (`--foreground`, `--foreground-muted`, `--foreground-subtle`, `--foreground-disabled`) are the API. Every component consumes them. Components do not need to change.

**Proof:** Brand v3 was applied to this scaffold by editing `tokens.json`, `globals.css`, swapping the font in `layout.tsx`, and adding a `<Wordmark/>` component. Every primitive and pattern picked up the new theme automatically.

**Dark mode** is the canonical surface. The `.dark` class on `<html>` is set by default in `layout.tsx`. Removing it (via `<ThemeToggle/>`) flips to the light inverse.

**Adding a new token, weight, or radius.** Don't, unless you have a real reason. If you must:

1. Add it to `Setup/tokens.json`.
2. Add the CSS variable to `globals.css`.
3. Document when to use it in this file.

If you cannot write the third step, the token isn't ready.

---

## Surfaces

The scaffold ships three routes:

- `/` LineRate index. Wordmark, hero, two routed buttons.
- `/marketing` Full marketing landing (Hero, LogoCloud, StatRow, FeatureGrid, PricingTable).
- `/styleguide` Design system reference. Every primitive and pattern, with the dark/light toggle.

---

## What good output looks like

- A diff that's almost entirely class renames and semantic token swaps, with the structural HTML intact.
- Numerals in mono everywhere they represent data.
- No raw hex values in component files.
- No em dashes in copy or comments.
- One primary CTA per screen. Amber appears once, maybe twice, never more.
- The page looks like it could be a printed page from an annual report, in black: quiet, intentional, audit-grade.
