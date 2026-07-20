"use client";

import * as React from "react";
import { Plus, X } from "@phosphor-icons/react";

import { withBase } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reveal } from "./reveal";

/*
 * Markets grid for concept 06. Each card carries a square amber-duotone
 * halftone illustration (public/markets/*, 640px squares) instead of an icon;
 * the same brand treatment as the CTA cross-hatch, so the grid and the closing
 * band read as one family.
 *
 * The illustrations play a one-shot clip wipe (not scroll-scrubbed) when the
 * grid first enters view: an IntersectionObserver arms them hidden (while
 * still below the fold), then flips to "play" so the staggered wipe runs once
 * (the lr-market-icon rules animate opacity + clip-path, so they apply to any
 * element). Under reduced motion the grid stays idle and the images render
 * fully visible.
 *
 * Layout: the icon sits in a square full-height panel down the left edge
 * rather than above the copy, so each card reads as a block plus a label. The
 * panel is bg-page, not bg-muted, because the card's own hover state is
 * bg-muted and a muted panel would dissolve into the card exactly when it's
 * being pointed at. bg-page steps away from bg-surface in both themes, so the
 * panel holds its edge either way.
 *
 * Each card opens a takeover dialog with the longer story for that market and
 * a settlement-slip example rendered from the same ledger conventions as the
 * product (mono tabular numerals, eyebrow labels, status pill). One controlled
 * Dialog is shared across the four cards. The close affordance is a single
 * circular button that stays pinned near the bottom of the dialog while its
 * content scrolls (the Apple product-page pattern), so the exit never scrolls
 * out of reach; it composes .glass so it reads as floating chrome.
 */
const MARKETS = [
  {
    image: "/markets/hosting.jpg",
    title: "Hosting services",
    body: "Between hosting service providers and crypto miners.",
    more: [
      "A hosting agreement prices power, uptime, and hashrate, but it settles on a monthly invoice built from spreadsheets neither side fully trusts. Disputes surface weeks after the electricity was burned, and curtailment hours turn into negotiations.",
      "LineRate reads the site's meter data and the miner's hashrate telemetry as the cycle runs, prices each day against the contracted rate card, and settles the period the day it closes. Curtailment is priced by the rule the agreement already contains, not argued about afterwards.",
    ],
    example: {
      eyebrow: "Settlement / Cycle 118",
      pill: "Settled T+0",
      rows: [
        ["Metered draw", "4.21 GWh"],
        ["Contracted rate", "$0.062 / kWh"],
        ["Curtailment credit", "-$18,410.00"],
        ["Cycle settlement", "$242,610.00"],
      ],
      caption:
        "A hosting cycle as the console shows it: metered consumption priced against the rate card, curtailment credited by the contract's own rule.",
    },
  },
  {
    image: "/markets/energy.jpg",
    title: "Energy supply",
    body: "Electricity and gas agreements between suppliers and offtakers.",
    more: [
      "Power and gas agreements index to hub prices that move every hour, but the invoice arrives a month later as a single line. Offtakers rebuild the calculation to check it; suppliers field the disputes that follow.",
      "LineRate ingests the index feed the agreement names, applies the contracted basis and caps hour by hour, and keeps a running settlement both sides can open at any time. Month end becomes a confirmation, not a reconstruction.",
    ],
    example: {
      eyebrow: "Settlement / March delivery",
      pill: "Confirmed",
      rows: [
        ["Index", "ERCOT North DA"],
        ["Delivered volume", "61,320 MWh"],
        ["Contracted basis", "+$1.75 / MWh"],
        ["Period settlement", "$1,918,404.00"],
      ],
      caption:
        "An indexed power month: the named feed, the delivered volume, and the basis applied hour by hour into one running figure.",
    },
  },
  {
    image: "/markets/infrastructure.jpg",
    title: "Critical IT infrastructure",
    body: "Critical IT lease agreements between operators and tenants.",
    more: [
      "A colocation lease promises availability and power, but SLA credits only exist if the tenant notices the breach, documents it, and files the claim inside the window. Most credits are never collected.",
      "LineRate watches the facility telemetry the lease names, measures availability against the committed threshold, and applies credits to the next cycle automatically. The audit pack holds the breach, the clause, and the credit in one record.",
    ],
    example: {
      eyebrow: "Settlement / Cycle 41",
      pill: "Credit applied",
      rows: [
        ["Committed availability", "99.982%"],
        ["Measured availability", "99.847%"],
        ["SLA credit", "-$12,750.00"],
        ["Cycle rent", "$402,250.00"],
      ],
      caption:
        "An availability breach settled without a claim: the measured shortfall triggers the credit the lease already defines.",
    },
  },
  {
    image: "/markets/gpu.jpg",
    title: "GPU capacity",
    body: "Rental and consumption agreements between compute lessors and their customers.",
    more: [
      "Compute is sold by the GPU-hour against committed capacity, then billed from usage exports the customer cannot verify. Under-delivery stays invisible until finance reconciles the quarter.",
      "LineRate meters delivered GPU-hours against the committed schedule, prices overage and shortfall by the contract's own terms, and settles each cycle with the usage record attached. Both sides read the same meter.",
    ],
    example: {
      eyebrow: "Settlement / Cycle 12",
      pill: "Settled T+0",
      rows: [
        ["Committed capacity", "512 GPU"],
        ["Delivered", "361,148 GPU-h"],
        ["Utilization", "98.2%"],
        ["Cycle settlement", "$760,514.00"],
      ],
      caption:
        "A compute cycle from the shared meter: delivered GPU-hours against the committed schedule, settled with the usage record attached.",
    },
  },
];

/* The dialog's cycle total counts up over ~700ms, so the settlement computes
   in front of you the way the product's own console would show it. Tabular
   mono figures keep the width stable while the digits run. Only dollar totals
   animate; anything else (or reduced motion) renders static. */
function useSettledFigure(raw: string) {
  // Static cases (non-dollar values, reduced motion) are decided in the
  // initializer, so the effect never has to set state synchronously. The
  // dialog mounts on click, client-side only, so matchMedia is available.
  const animate =
    /^\$[\d,]+\.\d{2}$/.test(raw) &&
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [text, setText] = React.useState(animate ? "$0.00" : raw);
  React.useEffect(() => {
    if (!animate) return;
    const target = parseFloat(raw.replace(/[$,]/g, ""));
    const fmt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const t0 = performance.now();
    const dur = 700;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setText(fmt.format(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [raw, animate]);
  return text;
}

/* The settlement-slip vignette inside each dialog. Values are illustrative,
   but they follow the product's ledger rules: every figure mono + tabular,
   labels sans, the last row carrying the cycle total. */
function MarketExample({
  example,
}: {
  example: (typeof MARKETS)[number]["example"];
}) {
  const total = example.rows[example.rows.length - 1];
  const settled = useSettledFigure(total[1]);
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div
          style={{ ["--row-i" as string]: 0 } as React.CSSProperties}
          className="lr-slip-row flex items-center justify-between border-b border-border px-5 py-3.5"
        >
          <span className="text-xs tracking-wide text-foreground-subtle uppercase">
            {example.eyebrow}
          </span>
          <span className="lr-slip-pill rounded-sm border border-border px-2 py-0.5 text-[10px] font-medium tracking-wide text-foreground-muted uppercase">
            {example.pill}
          </span>
        </div>
        <dl>
          {example.rows.map(([label, value], i) => (
            <div
              key={label}
              style={{ ["--row-i" as string]: i + 1 } as React.CSSProperties}
              className={
                i === example.rows.length - 1
                  ? "lr-slip-row flex items-baseline justify-between border-t border-border px-5 py-3.5"
                  : "lr-slip-row flex items-baseline justify-between border-t border-border-subtle px-5 py-3 first:border-t-0"
              }
            >
              <dt className="text-sm text-foreground-muted">{label}</dt>
              <dd
                className={
                  i === example.rows.length - 1
                    ? "font-mono text-sm font-medium tabular-nums text-foreground"
                    : "font-mono text-sm tabular-nums text-foreground"
                }
              >
                {i === example.rows.length - 1 ? settled : value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-foreground-subtle">
        {example.caption}
      </figcaption>
    </figure>
  );
}

export function MarketsGrid() {
  const ref = React.useRef<HTMLDivElement>(null);
  // Undefined until mounted so the attribute isn't in the SSR HTML (no
  // hydration mismatch); the effect adds "armed" then "play" on the client.
  const [anim, setAnim] = React.useState<"armed" | "play" | undefined>(
    undefined,
  );
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  const open = openIdx === null ? null : MARKETS[openIdx];

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Hide the icons while they're still below the fold, then play once on view.
    setAnim("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnim("play");
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-market-anim={anim}
      className="mt-14 grid gap-4 sm:grid-cols-2"
    >
      {MARKETS.map((m, i) => (
        <Reveal key={m.title} delay={i * 80} className="flex">
          <button
            type="button"
            onClick={() => setOpenIdx(i)}
            aria-haspopup="dialog"
            className="group relative flex flex-1 cursor-pointer overflow-hidden rounded-xl border border-border bg-surface text-left transition-[background-color,border-color,transform] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)] hover:-translate-y-1 hover:border-border-strong hover:bg-muted"
          >
            {/* The art is absolutely positioned so its intrinsic 640px size
                never enters layout: the card keeps taking its height from the
                text column, and aspect-square derives the panel's width from
                that stretched height (same mechanism as the icon version).
                The wipe class and --icon-i drive the same staggered entrance
                the icons had; hover zooms the art inside the clipped square. */}
            <div className="relative aspect-square shrink-0 overflow-hidden border-r border-border bg-page">
              <img
                src={withBase(m.image)}
                alt=""
                width={640}
                height={640}
                loading="lazy"
                style={{ ["--icon-i" as string]: i } as React.CSSProperties}
                className="lr-market-icon absolute inset-0 size-full object-cover transition-transform duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
                aria-hidden
              />
            </div>
            <div className="flex flex-col justify-center p-6 pr-14">
              <h3 className="text-lg font-medium text-foreground">{m.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-foreground-muted">
                {m.body}
              </p>
            </div>
            {/* The open affordance, persistent so touch users see it too. On
                hover it quarter-turns; the dialog's pinned close rotates the
                same way, so the way in and the way out rhyme. */}
            <span
              aria-hidden
              className="absolute right-4 bottom-4 flex size-7 items-center justify-center rounded-full border border-border text-foreground-subtle transition-[color,border-color,transform] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)] group-hover:rotate-90 group-hover:border-border-strong group-hover:text-foreground"
            >
              <Plus className="size-4" />
            </span>
          </button>
        </Reveal>
      ))}

      <Dialog
        open={openIdx !== null}
        onOpenChange={(o) => {
          if (!o) setOpenIdx(null);
        }}
      >
        {open && (
          <DialogContent
            showCloseButton={false}
            className="block max-h-[85dvh] w-full max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-xl p-0 sm:max-w-xl"
          >
            <div className="p-6 pb-0 sm:p-8 sm:pb-0">
              <img
                src={withBase(open.image)}
                alt=""
                width={640}
                height={640}
                className="lr-dialog-art size-20 rounded-lg border border-border object-cover"
                aria-hidden
              />
              <DialogTitle className="mt-4 text-2xl">{open.title}</DialogTitle>
              <DialogDescription className="mt-1 text-sm text-foreground-subtle">
                {open.body}
              </DialogDescription>

              {open.more.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="mt-4 max-w-[60ch] text-base leading-relaxed text-foreground-muted"
                >
                  {p}
                </p>
              ))}

              <div className="mt-8">
                <MarketExample example={open.example} />
              </div>
            </div>

            {/* The pinned close: sticky inside the scroll container, so it
                floats over the content near the bottom edge no matter how far
                the dialog has scrolled. pointer-events split so the dead
                space either side of the button still scrolls/clicks through. */}
            <div className="lr-dialog-close-in pointer-events-none sticky bottom-0 flex justify-center pt-6 pb-5">
              <DialogClose asChild>
                <button
                  type="button"
                  className="glass glass-strong pointer-events-auto flex size-11 cursor-pointer items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:text-foreground active:scale-95 [&:hover_svg]:rotate-90"
                >
                  <X
                    className="size-5 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)]"
                    aria-hidden
                  />
                  <span className="sr-only">Close</span>
                </button>
              </DialogClose>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
