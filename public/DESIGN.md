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

The values live in places that must agree:

| File | Role |
|---|---|
| `Setup/tokens.json` | Canonical, platform-agnostic source of truth (W3C Design Tokens format). |
| `src/app/globals.css` | Live web stylesheet: Tailwind v4 theme, semantic layer, dark and light, shadcn compatibility bridge. Edit here to retheme the running app. |
| This file | The narrative spec. Reads top to bottom. |
| `LineRate-Identity-v3.pdf` | Approved brand identity book at the project root. Source of the v3 palette, wordmark, and type. |

When they disagree, fix all of them.

---

## TL;DR

Dark-first, audit-grade, restrained: a printed annual report in black. Build
from semantic tokens; let typography and the ledger numerals carry the page.
Every change works in both themes.

- **Surfaces:** `bg-page` (Onyx) › `bg-surface` › `bg-raised`. **Text:** `text-foreground` (Paper) › `-muted` › `-subtle`. **Lines:** `border-border` / `-subtle`. **Accent:** `--accent` (amber), rare.
- **Fonts:** General Sans = language (headings, prose, UI labels). JetBrains Mono = ledger (every data numeral, eyebrows, pills, table headers, code).
- **Weights:** 400 / 500; 600 for display headlines + wordmark only. Never bold.
- **Primary CTA:** Paper on Onyx (dark) / Onyx on Paper (light). One per screen.

The nine rules, compressed:

1. Semantic tokens, never scale values (`bg-page`, not `bg-neutral-950`).
2. Every product numeral in mono + tabular (`.ledger` or `font-mono tabular-nums`).
3. Amber appears once or twice, never a primary CTA.
4. UPPERCASE only for wordmark, eyebrows, pills, buttons; everything else sentence case.
5. Headlines use `&`, not the word "and".
6. No em dashes, anywhere (copy, comments, commits).
7. Weights 400/500; 600 display-only; never `font-bold`/`font-semibold`.
8. Flat surfaces, 1px borders, tonal lift before shadow.
9. Comfortable density: cards `p-6`, list rows `py-3.5`.

Error copy answers, in order: what happened, why, what to do next. Full detail follows.

---

## Principles

Nine hard rules. Violations are defects, not preferences.

1. **Use semantic tokens, not scale values.** `bg-page text-foreground border-border`, never `bg-neutral-950 text-neutral-0 border-neutral-800`. Scale utilities exist as escape hatches; using them in product code is a defect.

2. **JetBrains Mono on every numeral that lives in the product.** Settlement amounts, transaction IDs, timestamps, account references, cycle numbers, hashes, percentages on data, durations. If a digit represents real-world data, it goes in mono with tabular figures. Add `font-mono` (with `tabular-nums`) or use the `.ledger` class. Marketing-style counter stats may stay sans.

3. **Amber is the brand accent and appears VERY rarely.** Its canonical placements are the active side-nav indicator (`border-accent`), the pending status pill, and the active data point in a chart. **Never a primary CTA.** Primary on dark is Paper on Onyx; primary on light is Onyx on Paper. More than one or two amber elements on a screen means something is wrong.

4. **Case is role-bound, not arbitrary.** Sentence case for prose, headings, navigation. **UPPERCASE is reserved for four roles only:** the wordmark (`LINERATE`), mono eyebrows, status pills, and button labels. Everything else is sentence case. The legal name "LineRate" appears in body copy and accessibility text. (See Typography for the enforcement table.)

5. **Ampersands in headlines.** Display and heading text use `&`, never the spelled-out word "and" ("The voice of the brand & the voice of the ledger"). Running prose, descriptions, and labels keep "and".

6. **No em dashes in copy.** Use commas, periods, parentheses, or restructure. (Brand voice. The rule extends to code comments and commit messages.)

7. **Two weights as the default: 400 regular, 500 medium.** Use 600 only for true display moments (hero/page-title headlines and the wordmark). Never `font-bold` or `font-semibold` for UI emphasis; use color, size, and space instead.

8. **Flat surfaces. 1px borders. Tonal lift, not shadow.** On dark, elevation comes from stepping the surface color up (`bg-surface` then `bg-raised`). Reach for tonal contrast or `border-border` before `shadow-md`. Shadows exist for raised modals and floating menus only.

9. **Comfortable density.** Default padding on a card is `p-6` (24px). Default row padding in a list is `py-3.5` (14px). Don't go below `p-4` on a card without a reason.

---

## Voice

- Direct, factual, precise. The product handles real money; the copy should sound like it.
- No exclamation points. No "exciting news," "we're thrilled," or marketing exuberance.
- Numbers carry weight on their own. "$127.4M settled" beats "an incredible $127.4M settled."
- Mention concrete artifacts (audit pack, ledger, cycle, counterparty) over abstractions ("workflow," "experience").
- Headlines can be declarative or precise statements of fact. "Settle nine-figure obligations the same day." beats "The future of hosting payments."

**Error copy convention.** Any time something fails, the surface must answer three questions, in this order: **what happened, why, what to do next.** "Wire returned 0x12 (insufficient counterparty balance). Funds remain in escrow. Retry or mark as manual." Not "Something went wrong, please try again."

---

## Typography

Typography carries most of the information in this system, so it is specified
strictly. The two families have **non-overlapping domains**: General Sans is
the language, JetBrains Mono is the ledger. A numeral that represents data is
never set in sans; a sentence of prose is never set in mono.

| Family | Variable | Domain |
|---|---|---|
| General Sans | `--font-sans` (`--font-general-sans`) | The voice of the brand. Headings, body, navigation, button labels, marketing, legal. Self-hosted from Fontshare (OFL), weights 400/500/600. |
| JetBrains Mono | `--font-mono` (`--font-jetbrains-mono`) | The voice of the ledger. Every figure that represents real-world data, plus eyebrows, pills, table headers, and code. Self-hosted via `next/font/google`. |

Fonts are wired in `src/app/layout.tsx` (`next/font/local` for General Sans,
`next/font/google` for JetBrains Mono) and mapped to `--font-sans` /
`--font-mono` in `globals.css @theme`. `font-kerning` and common ligatures are
on globally; `.font-mono` enables `tnum` tabular figures.

**General Sans.** General Sans is the voice of the brand. It sets every heading,
every line of body copy, the navigation, button labels, and legal text:
anywhere a human is meant to sit down and read. It is confident and neutral,
legible from a display headline down to an 11px eyebrow, and it never competes
with the data beside it. Use it by default. If a string is language rather than
a figure, it belongs in General Sans.

**JetBrains Mono.** JetBrains Mono is the voice of the ledger. It sets every
figure that represents real-world data: settlement amounts, transaction IDs,
timestamps, account references, hashes, and cycle numbers. Its fixed-width,
tabular figures hold columns in alignment and make a number impossible to
misread at a glance. Use it the moment a digit carries meaning, and never for
running prose. The two families do not trade places.

### Type role table (enforcement)

Every piece of text belongs to one role. Build with this table; do not invent
ad-hoc sizes or weights.

| Role | Family | Size token | Weight | Tracking | Case | Notes |
|---|---|---|---|---|---|---|
| Hero / page title (h1) | sans | `text-display-md`–`display-lg` | 600 | tight | sentence | `text-wrap: balance`, `leading-[1.05]`. Display scale only here. |
| Section head (h2) | sans | `text-2xl` | 500 | snug | sentence | One per section. |
| Subsection (h3) | sans | `text-lg` | 500 | normal | sentence | |
| Body | sans | `text-base` (16px) | 400 | normal | sentence | `leading-1.55`. Constrain to 60–75ch. |
| Body, secondary | sans | `text-base`/`text-sm` | 400 | normal | sentence | `text-foreground-muted`. |
| Caption / metadata | sans | `text-sm` (13px) | 400 | normal | sentence | `text-foreground-subtle`. |
| Section index | **mono** | `text-sm` (13px) | 400 | snug | sentence | `.section-eyebrow`. A running ledger index above each section head: `01 / Foundations`. Auto-numbered via CSS counter; the numeral is `--foreground-muted`, the label `--foreground-subtle`. |
| Eyebrow (label) | **mono** | `text-xs` (11px) | 400 | widest (0.14em) | UPPERCASE | `.eyebrow`. The small caps tag for tight contexts: card heads, nav groups, table headers. `text-foreground-subtle`. |
| Button label | sans | `text-xs` (sm/md), `text-sm` (lg) | 500 | wide (0.08em) | UPPERCASE | Set by the Button component. |
| Nav label | sans | `text-sm` | 400 / 500 active | normal | sentence | Active is medium + `border-foreground`. |
| Table header | **mono** | 11px | 500 | widest | UPPERCASE | Eyebrow style. `text-foreground-subtle`. |
| Status pill | **mono** | 10px | 500 | wide | UPPERCASE | `.pill`. |
| Ledger figure (display) | **mono** | `text-3xl`–`6xl` (responsive) | 500 | snug (`.ledger`) | n/a | Tabular. Scale down on mobile (`text-4xl sm:text-6xl`). |
| Ledger figure (inline) | **mono** | inherits | 400 | normal | n/a | `font-mono tabular-nums`. |
| Code / token name | **mono** | inherits | 400 | normal | as written | `<span className="font-mono">`. |

### Size scale

Rem-based so the scale follows browser zoom and user font preferences (16px root):

`xs 11` · `sm 13` · `base 16` · `md 17` · `lg 18` · `xl 20` · `2xl 24` · `3xl 30` · `4xl 36` · `5xl 48` · `6xl 64` · `7xl 80` · `8xl 96`

`--text-base` is `1rem` (16px), the WCAG readability floor. `--text-md`
(`1.0625rem`, 17px) is a comfortable long-form reading size, a notch above body.
Dense product surfaces stay editorial via `tracking-tight`/`snug` and tighter
leading, not by dropping below 16px.

### Display scale (fluid)

For hero and large headings only. `clamp()` scales smoothly with the viewport
instead of jumping at breakpoints:

- `display-sm` `clamp(1.875rem, 1.25rem + 2.5vw, 3rem)` — section/inner heads
- `display-md` `clamp(2.25rem, 1.25rem + 4vw, 4rem)` — page title (h1)
- `display-lg` `clamp(3rem, 1.25rem + 6vw, 5rem)` — hero

Product UI never uses the display scale; it keeps the fixed `rem` sizes so dense
layouts stay predictable. Large fixed specimens and ledger figures step down on
mobile with `sm:` breakpoints so they never force horizontal overflow.

### Weight

`400 regular` (default body) · `500 medium` (UI emphasis, headings, buttons,
pills) · `600 semibold` (display headlines and the wordmark only). Never bold.

### Tracking

`tight -0.02em` (display, wordmark) · `snug -0.01em` (mid headings, mono numerals
at display size) · `normal 0` · `wide 0.08em` (buttons, pills) · `widest 0.14em`
(eyebrows, table headers, system labels).

### Leading

`tight 1.05` (display) · `snug 1.2` · `normal/body 1.55` · `relaxed 1.65`.
Body leading is `1.55` in both themes (light-on-dark wants a touch more air; set
once for consistency). `h1, h2, h3` get `text-wrap: balance`.

### Typography do / don't

- **Do** set every product numeral in mono with tabular figures so columns align.
- **Do** head each section with the numbered index (`.section-eyebrow`, "01 / Label"); reserve the small caps `.eyebrow` for tight labels (card heads, nav groups, table headers).
- **Do** keep body measure between 60 and 75 characters (`max-w-[60ch]` / `max-w-2xl`).
- **Don't** spell out "and" in a headline; use `&`.
- **Don't** use uppercase outside the four allowed roles (wordmark, eyebrow, pill, button).
- **Don't** set a settlement amount, hash, or timestamp in General Sans.
- **Don't** reach for `font-bold`/`font-semibold` to emphasize UI; change color, size, or weight-to-500.
- **Don't** use the display (clamp) scale inside product chrome or tables.

---

## Color

Five brand colors. Their swatch proportions in the identity book communicate the
hierarchy: Onyx dominant, Paper frequent, Chalk and Graphite supporting, Amber rare.

**Brand**

| Token | Hex | Role |
|---|---|---|
| Onyx | `#101010` | Page background on dark (canonical). Primary text on light. |
| Paper | `#FFFFFF` | Primary text on dark. Primary CTA fill on dark. Page background on light. |
| Chalk | `#E5E5E5` | Light fill. Top of the neutral ramp on light surfaces. |
| Graphite | `#838383` | Mid gray. Muted text. Supporting tone. |
| Amber | `#DF8E2A` | Single accent. Pending status, brand-accent rule under nav, rare emphasis. Never primary. |

**Neutral scale.** 12 stops from `#FFFFFF` (Paper) to `#101010` (Onyx), cool grayscale. Use semantic tokens; scale utilities are escape hatches.

**Amber scale.** 11 stops derived from `#DF8E2A`. Used very rarely.

**Brand-tone status.** Desaturated, harmonious with the neutral ramp:
Success `#6B7A5C` (forest, graphite-tinted), Danger `#9C5650` (brick, warm).

**Semantic roles (live tokens in `globals.css`), dark canonical:**

| Token | Value | Use |
|---|---|---|
| `--page` | neutral-950 (Onyx) | Page background |
| `--surface` | neutral-900 | Cards, elevated panels |
| `--raised` | neutral-800 | Modals, popovers, dropdowns |
| `--muted` | neutral-800 | Subtle fills, hover states |
| `--foreground` | neutral-0 (Paper) | Primary text |
| `--foreground-muted` | neutral-400 | Secondary text |
| `--foreground-subtle` | neutral-500 (Graphite) | Captions, eyebrows |
| `--border` / `--border-subtle` | neutral-800 / neutral-900 | Borders, row dividers |
| `--primary` / `--primary-foreground` | neutral-0 / neutral-950 | Primary CTA fill / text |
| `--accent` | amber-500 | Brand accent, rare |
| `--scrim` | rgba(16,16,16,0.72) | Modal overlay dim (dark in both themes) |
| `--glass` / `--glass-border` | rgba(22,22,22,0.55) / rgba(255,255,255,0.08) | Frosted floating chrome (see `.glass`) |
| `--ring` | rgba(255,255,255,0.18) | Focus token (see Focus) |

Light (the inverse) flips page and primary: page = Paper, primary = Onyx on Paper. Status surfaces shift to their light counterparts.

**Focus.** The visible focus ring is a two-layer ring (a 2px gap in `--page`, then 2px in `--foreground`) so it stays visible on any surface, including a Paper button on dark. Set globally on `*:focus-visible`; don't add per-component rings.

---

## Spacing, radius, shadow, motion

**Spacing** (px): `0 · 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128`.

**Radius** (px): `xs 2 · sm 4 · md 6 · lg 8 · xl 12 · 2xl 16 · full`. Cards `rounded-lg`; buttons/inputs/popovers `rounded-md`; pills `rounded-sm`.

**Shadow** (flat by default; tonal lift first): `md` for floating menus/popovers, `lg` for modals and sheets. Nothing else gets a shadow.

**Glass.** Floating chrome that sits over scrolling content (the top nav, the mobile nav disclosure, dropdowns and popovers) uses the `.glass` utility: a translucent `--glass` fill with `backdrop-blur(16px) saturate(160%)` and a faint `--glass-border` rim. Each theme carries its own glass values, so the one class reads correctly in light and dark. Where `backdrop-filter` is unsupported it falls back to the opaque `--surface` so text is never stranded on a see-through panel. Modal scrims add a soft `backdrop-blur-sm` over the dim. Solid panels (modal/sheet bodies, cards, tooltips) stay opaque for legibility. **Gotcha:** keep `transform`/`opacity` animations off a `.glass` element's ancestors, a transformed (even identity) or animating ancestor becomes a backdrop root and silently disables the blur. The top nav is deliberately not entrance-animated for this reason.

**Motion**: `fast 120ms · normal 200ms · slow 320ms`, easing `cubic-bezier(0.2,0,0,1)`. `scroll-behavior: smooth` globally, disabled under `prefers-reduced-motion`.

---

## Grid

A structural backdrop of vertical 1px hairlines runs behind every surface,
aligned to the content container (`max-w-6xl`, `px-6` inset) and dividing it
into four equal columns (five rules counting both framed edges). Drawn in
`border-subtle` so the rules read as a quiet ledger-paper grid: present in the
page-color gutters, covered by opaque surfaces (cards, tables, sheets) on top.

Implemented as `<GridLines />` (`src/components/grid-lines.tsx`), mounted once in
the root layout at `-z-10`. It depends on `body` being transparent (the page
color is painted by `<html>`) so the backdrop shows through. Column count is a
prop (`columns`, default 4).

---

## Wordmark

The official `LINERATE` wordmark ships as an inline SVG (`<Wordmark/>`,
`src/components/wordmark.tsx`), filled with `currentColor` so it themes
automatically (Paper on dark, Onyx on light). Size it with a height utility
(`h-4 w-auto`) or `font-size`. Used in the top nav and anywhere the brand stamps
itself.

Body copy and accessibility text always use the legal name **"LineRate"**
(sentence case). The wordmark is the only place the name is set in all caps.

---

## Layout & navigation

The product ships as a **single design-system surface at `/`** (`src/app/page.tsx`).
There is no separate marketing site or styleguide route.

- **Top nav.** `<SiteHeader/>` (`src/components/site-header.tsx`): a floating
  rounded bar, sticky, frosted `.glass` with `rounded-xl` and `shadow-lg`,
  inset from the top so content and the grid blur softly beneath it. Wordmark
  left (a HomeLink that reloads), theme toggle right. Below `lg` it also carries
  a "Contents" button (outlined, button-styled) that opens the section list as
  an **absolute dropdown overlay**, never an inline panel, so opening it doesn't
  reflow the page and nav taps land on the right section.
- **Side navigation.** `<SideNav/>` (`src/components/side-nav.tsx`): the sticky
  left rail on `lg+` only, grouped Foundations / Primitives / Patterns. Below
  `lg` the same list lives in the header's Contents dropdown. Both share the
  nav internals exported from `side-nav.tsx`: `useScrollSpy` (IntersectionObserver
  highlighting the active section), `scrollToSection` (reduced-motion-aware
  smooth scroll), and `NavList` (the rendered list). Section ids and anchors are
  kept in sync by the shared `slugify()` in `lib/utils`; sections carry
  `scroll-mt` so a tap lands the heading just under the sticky header, not behind
  it. The active item's indicator is amber (`border-accent`).
- **Theme toggle.** `<ThemeToggle/>`: an icon button (Sun/Moon) that crossfades
  and rotates on switch. Reads state via `useSyncExternalStore` (no
  setState-in-effect, no hydration flash); toggles `.dark` off live DOM state.
- **Responsive.** Block flow on mobile, flex row at `lg`. `body` is block (not
  flex) so wide tables can't inflate the page; tables scroll within their own
  `overflow-x-auto`. `html`/`body` carry `overflow-x: clip` as a guard.

---

## Primitives

All primitives live in `src/components/ui/` as source files (shadcn model). Edit
in place; do not wrap.

### Button

`primary` (Paper on Onyx / Onyx on Paper), `secondary` (outline using
`border-foreground`), `ghost` (no border, muted hover). Sizes `sm` (h-8), `md`
(h-10, default), `lg` (h-12). Every button is `cursor-pointer`, transitions
color/background/border/transform over 150ms, and presses with a 1px dip
(`active:translate-y-px`) for tactile click feedback; the global focus ring
covers keyboard focus. The same interaction language (pointer cursor, hover
shift, press feedback) applies to the icon buttons (theme toggle, dialog/sheet
close) and tab triggers. Labels are **uppercase, weight 500, `tracking-wide`**;
sizes step down a notch versus sentence case (sm/md `text-xs`, lg `text-sm`) and
padding opens up so the tracking has room. Rounded `md`. Focus via the global
ring. No `destructive` variant.

```tsx
<Button>Export audit pack</Button>      {/* renders: EXPORT AUDIT PACK */}
<Button variant="secondary">View ledger</Button>
<Button variant="ghost">Cancel</Button>
```

### Input, Textarea, Label

Thin border, transparent background, placeholder in `foreground-subtle`. Pass
`mono` for ledger fields:

```tsx
<Label htmlFor="amount">Settlement amount</Label>
<Input id="amount" mono defaultValue="127,492,851.50" />
```

### Select

Trigger matches Input. Content lifts onto `bg-raised` with `border-border` and `shadow-md`. Highlighted items use `bg-muted` (never `bg-accent`).

### Badge

The LineRate pill (mono, uppercase, wide tracking, small radius, 1px inset edge so pale light-mode tints stay defined). Four variants: `neutral`, `success`, `pending`, `danger`. Pending is amber; success and danger are brand-tone.

### Avatar

Brand avatar: the wordmark's geometric L glyph (`AVATAR_MARK_PATH`) in a circle,
in three sizes (`sm` 32, `md` 40, `lg` 56) and two brand tones: `onyx` (black
fill, Paper mark) and `amber` (amber fill, Onyx mark). The mark is framed by
`AVATAR_MARK_VIEWBOX` so the L sits at ~43% of the circle height, stem left of
center, with its foot extended off the right edge (clipped by `overflow-hidden`)
for an editorial crop. Both `Avatar` and the 400x400 export read the same
viewBox constant, so on-screen and exported marks stay identical. The mark
inherits the tone via `currentColor`; tones use the literal brand colors (not
theme-flipping tokens) so it looks the same in either theme and when exported.

### Brand assets (downloads)

`brand-assets.tsx` is the downloadable-mark surface:
- **Wordmark SVG** — standalone vector (Onyx fill), recolor as needed.
- **Wordmark PNG** — white mark on an Onyx field with cap-height clear space (1472x408), for dark contexts.
- **Avatar PNG** — the L mark at the common 400x400 social size, in both tones. Full-bleed tone square (platforms crop to a circle) with the mark framed exactly as the on-screen Avatar.

All assets draw from the shared `WORDMARK_PATHS` / `AVATAR_MARK_PATH`, so they stay exact and retheme with the source.

**Social share image.** The link-unfurl card ships as a committed `public/og.png`
(1200x630): Onyx field, the hairline grid, the wordmark, a mono "DESIGN SYSTEM"
eyebrow, one amber accent, and the hero line. It's wired through `openGraph` /
`twitter` metadata in `layout.tsx` with `metadataBase`, referenced by an
absolute origin+basePath URL so crawlers resolve it on the Pages sub-path. The
generator source lives in `scripts/og-image.tsx` (next/og + Satori, vendored
JetBrains Mono TTFs) with regeneration steps in its header.

### Separator

`bg-border-subtle` by default. Pass `className="bg-border"` for a stronger break.

### Card

`bg-surface`, `border-border`, `rounded-lg`, `p-6`. Composes `CardHeader` / `CardTitle` / `CardDescription` / `CardAction` / `CardContent` / `CardFooter`. No double borders, no footer fills.

### Table

Header cells in the eyebrow style. Pass `numeric` on `TableHead`/`TableCell` for mono, tabular, right-aligned columns. Row dividers `border-subtle`, no zebra. Always wrapped in an `overflow-x-auto` container so wide tables scroll instead of breaking layout.

### Tabs

Underline style only. Active trigger gets `border-foreground`; inactive sit in `foreground-muted` and brighten on hover.

### Navigation (product shell)

The application's navigation suite (distinct from this doc site's own chrome).

- **AppTopNav** (`patterns/app-top-nav.tsx`). Main bar: wordmark, primary destinations, a search affordance with a `⌘K` hint, and an account chip. Active link gets an amber underline (`border-accent`) with a foreground label.
- **AppSidebar** (`patterns/app-sidebar.tsx`). Persistent left rail: groups (mono `.eyebrow` labels) of icon + label rows with optional mono counts. The active row lifts onto `bg-muted` with an amber left indicator (the one shell spot amber marks "you are here"); `danger` tone counts use `text-danger-foreground`.
- **SubNav** (`patterns/sub-nav.tsx`). Secondary nav within a section: underline links sharing the Tabs vocabulary (active `border-foreground`), with optional mono counts.
- **Breadcrumb** (`ui/breadcrumb.tsx`). Hierarchical trail; links in `foreground-muted`, current page in `foreground`, hairline chevron separators. Compose `Breadcrumb` / `BreadcrumbList` / `BreadcrumbItem` / `BreadcrumbLink` / `BreadcrumbPage` / `BreadcrumbSeparator`.
- **Pagination** (`ui/pagination.tsx`). For long ledger tables: a mono "1-25 of 412" range readout plus prev/next and page numbers (mono, tabular). Current page fills with `bg-primary`; ends disable at the boundaries. Takes `page` / `pageSize` / `total` / `onPageChange`.

### Overlays (Dialog, Sheet, DropdownMenu, Popover, Tooltip)

Shared floating-surface vocabulary: `shadow-md` (`shadow-lg` for full sheets/modals). DropdownMenu and Popover float on frosted `.glass`; Dialog and Sheet panels stay opaque on `bg-raised` while their scrim adds a soft `backdrop-blur-sm` over the dim. Highlighted dropdown items use `bg-muted`. Tooltip inverts to `bg-inverse` / `text-foreground-inverse`, sized for mono reveals, and stays opaque. `<TooltipProvider/>` wraps the root layout.

### Resilience (Alert, EmptyState, Skeleton)

For failure, emptiness, and loading. Copy follows the error convention (what happened, why, what to do next).

- **Alert.** Tones `neutral`, `warning` (amber), `danger`; compose `AlertTitle` / `AlertDescription` / `AlertActions`. `role="alert"` on danger.
- **EmptyState.** Eyebrow + heading + body + optional action. No illustration.
- **Skeleton.** Pulsing tonal block on `bg-muted`. Prefer skeletons over spinners.

### Charts (data viz)

Built on Recharts via the shadcn `Chart` wrapper (`src/components/ui/chart.tsx`), reskinned to the brand: Paper stroke, a faint area wash (foreground at low opacity to transparent), hairline horizontal grid in `border-subtle`, mono axis ticks in `foreground-subtle`, no decorative gradients. One amber accent reserved for emphasis (e.g. the active data point). Tooltips render figures in mono via `ChartTooltipContent`. Draw-in animation is gated on `useReducedMotion` (Recharts animates in JS, so the CSS reduced-motion kill-switch doesn't reach it). Series colors come from the `ChartConfig` (`--color-<key>`), so charts retheme with the tokens. Reference impls: `SettlementVolumeChart` (area) and `ClearedRateChart` (bar) in `src/components/patterns/settlement-charts.tsx`.

---

## Patterns

LineRate-specific compositions in `src/components/patterns/`. Compose primitives; never invent new tokens.

### SettlementSummary
Card + Table + Badge. Eyebrow + title row, big mono total, counterparty list with three columns (party, amount-right, status-right). Status uses pills.

### AuditPackDrawer
Sheet (right) + Badge + Button. Header with eyebrow and title, body `<dl>` of mono figures, footer with `Copy hash` (ghost) and `Download audit pack` (primary).

### ConfirmDestructive
For irreversible action at meaningful stakes. Composes Dialog + Input; the operator types a match string (cycle number/token) before the primary confirm enables. Description copy stays plain ("Recorded in the audit log and cannot be reversed"). Do not soften.

### PreFlight
The forward-looking surface operators watch in the seconds before a window opens, where the brand's gravitas pays off. Top to bottom: eyebrow + cycle title + countdown pill; large mono countdown ("opens in") paired with total queued; a three-up ready / awaiting / at-risk strip; an at-risk Alert (only when something is at risk); the counterparty list with status pills; and a footer decision row, "Hold cycle" (gated through ConfirmDestructive) vs "Open on time." Voice: tense but calm.

### CounterpartyRow / CounterpartyList
`counterparty-row.tsx`. Name in sans, tx ID in small mono below, amount and status (pill) in mono right-aligned. `CounterpartyList` stacks rows with `border-subtle` dividers.

### CycleIndicator
`cycle-indicator.tsx`. A mono pill carrying cycle metadata, `T+0 · 14:32 UTC · cycle 4271`. Read-only signal for headers, table captions, and emails.

---

## How to retheme

The system is built to evolve. Three swap points, increasing in scope.

**1. Tweak a color, weight, or radius.** Edit the token in `src/app/globals.css`. The change is live everywhere because every component references semantic tokens.

```css
/* In @theme */
--color-amber-500: #2860c0;   /* and the rest of the amber ramp */
```

`--accent` and `--ring` reference these tokens through the semantic layer, so amber-coded elements retheme together.

**2. Switch fonts.** Drop new `.woff2` files into `/public/fonts/`, update the `localFont` config in `src/app/layout.tsx` with a new `variable` name, and point `--font-sans` (or `--font-mono`) at it in `globals.css @theme`. The type role table still holds; only the typeface changes.

**3. Swap the entire brand identity.** Edit `Setup/tokens.json` (the canonical source), then propagate to `globals.css`. The four semantic surfaces (`--page`, `--surface`, `--raised`, `--muted`) and four text roles (`--foreground`, `--foreground-muted`, `--foreground-subtle`, `--foreground-disabled`) are the API. Every component consumes them; components don't change.

**Proof:** Brand v3 was applied by editing `tokens.json` + `globals.css`, swapping the font in `layout.tsx`, and replacing the wordmark SVG. Every primitive and pattern picked up the new theme automatically.

**Dark mode** is canonical (`.dark` on `<html>` by default). Removing it via `<ThemeToggle/>` flips to the light inverse.

**Adding a token, weight, or radius.** Don't, unless you have a real reason. If you must: (1) add it to `tokens.json`, (2) add the CSS variable to `globals.css`, (3) document when to use it here. If you can't write step 3, the token isn't ready.

---

## A worked example

One screen built correctly, to pattern-match against: a cycle's settlement
summary. Card + Table + Badge, the total as a display-size ledger figure, the
per-counterparty breakdown with status. Watch what is mono versus sans, where
the single amber lives (the pending pill), and that there is no raw hex, no
bold, and one eyebrow.

```tsx
<Card className="p-0">
  <div className="border-b border-border-subtle p-6">
    <CardHeader className="mb-4">
      <div>
        <p className="eyebrow mb-2">Today's settlement</p>   {/* mono · uppercase · subtle · one per section */}
        <CardTitle className="text-2xl">Cycle 4271</CardTitle>
      </div>
      <CardAction>
        <Badge variant="pending">T+0 · 14:32 UTC · CYCLE 4271</Badge>  {/* the single amber */}
      </CardAction>
    </CardHeader>
    {/* the total: mono, tabular, display-size ledger figure, steps down on mobile */}
    <p className="ledger text-3xl font-medium text-foreground sm:text-5xl">
      $127,492,851.50
    </p>
  </div>

  <Table>                                            {/* auto-wrapped in overflow-x-auto */}
    <TableHeader>
      <TableRow>
        <TableHead>Counterparty</TableHead>          {/* eyebrow-style header, sans label */}
        <TableHead numeric>Amount</TableHead>        {/* numeric → mono · tabular · right-aligned */}
        <TableHead className="text-right">Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm text-foreground">Acme Hosting</span>            {/* name → sans */}
            <span className="font-mono text-xs text-foreground-subtle">A-7142</span> {/* reference → mono */}
          </div>
        </TableCell>
        <TableCell numeric>42,180,000.00</TableCell>
        <TableCell className="text-right">
          <Badge variant="success">Settled</Badge>   {/* brand-tone status, not amber */}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Card>
```

Why it reads as LineRate: surfaces lift tonally (`bg-surface` card, `border-subtle`
divider) with no shadow; every figure is mono and tabular while every label is
sans; amber appears exactly once; weights stay at 400/500; one eyebrow sits above
the title; the amount uses the display ledger scale and steps down on mobile.
Reference implementation: `SettlementSummary` in
`src/components/patterns/settlement-summary.tsx`.

---

## What good output looks like

- A diff that's almost entirely class renames and semantic token swaps, structural HTML intact.
- Every product numeral in mono, tabular, aligned.
- Headlines use `&`; uppercase only in the wordmark, eyebrows, pills, and buttons.
- No raw hex in components. No em dashes in copy or comments. No `font-bold`/`font-semibold`.
- One primary CTA per screen. Amber appears once, maybe twice, never more.
- The page reads like a printed page from an annual report, in black: quiet, intentional, audit-grade.
