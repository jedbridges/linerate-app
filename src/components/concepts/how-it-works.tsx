"use client";

import * as React from "react";
import { ArrowDown, ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { HeroPanelTilt } from "./hero-panel-tilt";
import { PreviewGlow } from "./preview-glow";

/*
 * Concept 06 "how it works": a scroll-driven walkthrough. The five steps
 * scroll down the left; a sticky panel on the right shows an example of the
 * product UI for whichever step is currently centred in the viewport (the
 * first is active by default). Changing the active step cross-fades the panel
 * with a blur-and-lift transition, and the panel rests angled like the hero.
 *
 * Not tied to hover: an IntersectionObserver with a centre-line band tracks
 * which step owns the viewport middle. Desktop uses the sticky swap; mobile
 * drops the sticky panel and renders each step's UI inline beneath it, each
 * revealing with the same fade/blur on scroll (see .lr-hiw-card in
 * globals.css). Everything fails safe to visible and respects reduced motion.
 */

// Shared chrome for every mock: the same framed, grid-backed surface as the
// hero's contract model, so the examples read as one product.
function PreviewFrame({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="lr-card-lift relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-surface"
      style={{
        backgroundImage:
          "linear-gradient(var(--stream-grid) 1px, transparent 1px), linear-gradient(90deg, var(--stream-grid) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        ["--stream-grid" as string]:
          "color-mix(in oklab, var(--border) 45%, transparent)",
      }}
    >
      <div className="flex items-center justify-between px-5 pt-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-page/60 px-3 py-1">
          <LiveDot />
          <span className="eyebrow text-foreground">{title}</span>
        </span>
        <span className="ledger text-xs text-foreground-subtle">{hint}</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-5 py-4">{children}</div>
    </div>
  );
}

function LiveDot() {
  return (
    <span className="relative flex size-1.5">
      <span
        className="absolute inline-flex size-full rounded-full bg-accent opacity-75"
        style={{ animation: "lr-pulse 2.4s ease-in-out infinite" }}
      />
      <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
    </span>
  );
}

function CheckDot() {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
      <Check className="size-2.5" strokeWidth={3} aria-hidden />
    </span>
  );
}

/* 01: the agreement compiling into a shared calculation model. */
function ModelPreview() {
  const terms = [
    "Pricing",
    "Floors",
    "Caps",
    "True-ups",
    "Fees",
    "Penalties",
    "Settlement",
  ];
  return (
    <PreviewFrame title="Model" hint="7 terms">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-page/40 px-3 py-2.5">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border text-[10px] font-medium text-foreground-subtle">
          PDF
        </span>
        <span className="truncate text-sm text-foreground">
          Master agreement.pdf
        </span>
        <span className="ledger ml-auto shrink-0 text-[11px] text-foreground-subtle">
          parsed
        </span>
      </div>
      <ArrowDown
        className="mx-auto my-3 size-4 shrink-0 text-foreground-subtle"
        aria-hidden
      />
      <div className="flex flex-wrap gap-2">
        {terms.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-page/50 px-2.5 py-1.5 text-xs text-foreground-muted"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            {t}
          </span>
        ))}
      </div>
    </PreviewFrame>
  );
}

/* 02: live inputs streaming into the model. */
function InputsPreview() {
  const rows = [
    { name: "Meter data", value: "4.21M kWh" },
    { name: "Energy usage", value: "42.1 MW" },
    { name: "Infra telemetry", value: "99.3%" },
    { name: "Payouts", value: "$412k" },
    { name: "Invoices", value: "128" },
    { name: "Market data", value: "live" },
  ];
  return (
    <PreviewFrame title="Inputs" hint="6 live">
      <div className="flex flex-1 flex-col justify-between">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between gap-3 border-b border-border/60 py-1.5 last:border-0"
          >
            <span className="text-sm text-foreground">{r.name}</span>
            <span className="flex items-center gap-2">
              <span className="ledger text-xs text-foreground-muted">
                {r.value}
              </span>
              <LiveDot />
            </span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

/* 03: both parties reviewing and approving versions. */
function ApprovalsPreview() {
  return (
    <PreviewFrame title="Versions" hint="v4 proposed">
      <div className="mb-3 flex items-center gap-2">
        <PartyChip label="Operator" initial="O" />
        <PartyChip label="Counterparty" initial="C" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2.5">
        <VersionRow v="v2" status="Approved" done />
        <VersionRow v="v3" status="Approved" done />
        <VersionRow v="v4" status="Proposed" />
      </div>
    </PreviewFrame>
  );
}

function PartyChip({ label, initial }: { label: string; initial: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-page/50 py-1 pr-3 pl-1">
      <span className="flex size-5 items-center justify-center rounded-full bg-accent/15 text-[10px] font-medium text-accent">
        {initial}
      </span>
      <span className="text-xs text-foreground-muted">{label}</span>
    </span>
  );
}

function VersionRow({
  v,
  status,
  done = false,
}: {
  v: string;
  status: string;
  done?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-page/40 px-3 py-2">
      <span className="ledger text-xs text-foreground-subtle">{v}</span>
      <span
        className={cn(
          "text-sm",
          done ? "text-foreground-muted" : "text-foreground",
        )}
      >
        {status}
      </span>
      {done ? (
        <CheckDot />
      ) : (
        <span className="pill--accent rounded-md px-2.5 py-1 text-[11px] font-medium">
          Approve
        </span>
      )}
    </div>
  );
}

/* 04: obligations calculated and settlement routed over payment rails. */
function SettlementPreview() {
  return (
    <PreviewFrame title="Settlement" hint="Cycle 4271">
      <div className="flex items-center justify-between rounded-lg border border-border bg-page/40 px-3 py-2 text-sm">
        <span className="text-foreground-muted">Operator</span>
        <ArrowRight className="size-3.5 text-accent" aria-hidden />
        <span className="text-foreground-muted">Counterparty</span>
        <span className="ledger ml-auto text-foreground">$459,550</span>
      </div>
      <div className="my-3 flex items-end justify-between">
        <span className="eyebrow text-foreground-subtle">Net settlement</span>
        <span className="flex flex-col items-end gap-1.5">
          <span className="ledger text-lg font-medium tabular-nums text-foreground">
            $459,550
          </span>
          <span
            aria-hidden
            className="h-1.5 w-24 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in oklab, var(--accent) 25%, transparent), var(--accent))",
              boxShadow:
                "0 0 12px 1px color-mix(in oklab, var(--accent) 45%, transparent)",
            }}
          />
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <RailRow rail="Bank ••4291" amount="$333,250" />
        <RailRow rail="Crypto 0x9f4c" amount="$126,300" />
      </div>
    </PreviewFrame>
  );
}

function RailRow({ rail, amount }: { rail: string; amount: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-page/40 px-3 py-2">
      <span className="ledger text-xs text-foreground-muted">{rail}</span>
      <span className="flex items-center gap-2">
        <span className="text-[11px] text-accent">routed</span>
        <span className="ledger text-xs text-foreground">{amount}</span>
      </span>
    </div>
  );
}

/* 05: a single result traced back through the audit chain. */
function AuditPreview() {
  const trace = [
    { label: "Governing term", value: "Clause 4.2" },
    { label: "Source data", value: "meter read 99.3%" },
    { label: "Model version", value: "v4" },
    { label: "Approval", value: "Operator + Counterparty" },
  ];
  return (
    <PreviewFrame title="Audit trail" hint="traced">
      <div className="mb-3 flex items-center justify-between rounded-lg border border-border bg-page/40 px-3 py-2">
        <span className="text-sm text-foreground">Uptime true-up</span>
        <span className="ledger text-sm text-accent">+$18,400</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2.5">
        {trace.map((t) => (
          <div key={t.label} className="flex items-center gap-3">
            <CheckDot />
            <span className="text-sm text-foreground-subtle">{t.label}</span>
            <span className="ledger ml-auto text-xs text-foreground-muted">
              {t.value}
            </span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

const STEPS = [
  {
    step: "01",
    title: "Build the canonical model",
    body: "LineRate converts the agreement into a shared calculation model covering pricing, floors, caps, true-ups, fees, penalties, and settlement rules.",
    Preview: ModelPreview,
  },
  {
    step: "02",
    title: "Connect the live inputs",
    body: "Meter data, energy usage, infrastructure telemetry, payouts, invoices, market data, and other contract inputs flow into the model automatically.",
    Preview: InputsPreview,
  },
  {
    step: "03",
    title: "Review, amend & approve",
    body: "Both parties can inspect the logic, propose changes, approve new versions, and preserve a complete history.",
    Preview: ApprovalsPreview,
  },
  {
    step: "04",
    title: "Calculate & coordinate settlement",
    body: "The model continuously determines each party's obligations and routes approved settlement through connected bank accounts and crypto addresses.",
    Preview: SettlementPreview,
  },
  {
    step: "05",
    title: "Reconcile & audit",
    body: "Every result traces back to the governing term, source data, model version, and approval record.",
    Preview: AuditPreview,
  },
];

export function HowItWorks() {
  const [active, setActive] = React.useState(0);
  const items = React.useRef<(HTMLElement | null)[]>([]);
  const ol = React.useRef<HTMLOListElement>(null);
  const nodes = React.useRef<(HTMLElement | null)[]>([]);
  // Centre-Y of each numbered node relative to the list, so the amber rail can
  // grow to the active node. Measured (node spacing isn't uniform: the steps
  // are vertically centred and bodies differ in height) and kept fresh on
  // resize/reflow.
  const [nodeYs, setNodeYs] = React.useState<number[]>([]);

  React.useEffect(() => {
    const measure = () =>
      setNodeYs(
        nodes.current.map((n) => (n ? n.offsetTop + n.offsetHeight / 2 : 0)),
      );
    measure();
    const ro = new ResizeObserver(measure);
    if (ol.current) ro.observe(ol.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const railTop = nodeYs[0] ?? 0;
  const railEnd = nodeYs[nodeYs.length - 1] ?? 0;
  const railActive = nodeYs[active] ?? 0;

  React.useEffect(() => {
    // The step whose box the viewport centre line sits inside becomes active.
    //
    // The band must have real height: a rootMargin of -50%/-50% collapses the
    // root to zero height, and a zero-area root never reports an intersection,
    // which silently pinned the active step to the first item. So keep a short
    // band (10% of the viewport) straddling the centre, track what's currently
    // in it, and pick the one that actually contains the centre line.
    const inBand = new Set<HTMLElement>();
    const pick = () => {
      const mid = window.innerHeight / 2;
      for (const el of inBand) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          setActive(Number(el.dataset.index));
          return;
        }
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) inBand.add(el);
          else inBand.delete(el);
        }
        pick();
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: steps scroll on the left, the sticky example swaps on the
          right, angled like the hero. */}
      <div className="mt-16 hidden lg:grid lg:grid-cols-2 lg:gap-16">
        {/* Trailing bottom runway so the sticky panel can stay vertically
            centred through the final step instead of detaching and riding up
            (which clipped the last preview against the viewport top). */}
        <ol ref={ol} className="relative pb-[30vh] lg:order-1">
          {/* Progress rail: a dotted track threading the nodes, with an amber
              fill that advances to the active node in step with the preview
              swap. Positioned from the measured node centres. */}
          {nodeYs.length > 0 && (
            <>
              <span
                aria-hidden
                className="lr-hiw-rail pointer-events-none absolute left-5 w-px -translate-x-1/2"
                style={{ top: railTop, height: Math.max(0, railEnd - railTop) }}
              />
              <span
                aria-hidden
                className="lr-hiw-rail-fill pointer-events-none absolute left-5 w-px -translate-x-1/2"
                style={{ top: railTop, height: Math.max(0, railActive - railTop) }}
              />
            </>
          )}
          {STEPS.map((s, i) => (
            <li
              key={s.step}
              data-index={i}
              ref={(el) => {
                items.current[i] = el;
              }}
              className="flex min-h-[42vh] flex-col justify-center"
            >
              <div className="flex items-center gap-4">
                <span
                  ref={(el) => {
                    nodes.current[i] = el;
                  }}
                  className={cn(
                    "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border text-sm transition-colors duration-300",
                    i === active
                      ? "border-accent bg-accent text-neutral-950"
                      : "border-border bg-page text-foreground-subtle",
                  )}
                >
                  {s.step}
                </span>
                <h3
                  className={cn(
                    "text-xl font-medium transition-colors duration-300",
                    i === active ? "text-foreground" : "text-foreground-muted",
                  )}
                >
                  {s.title}
                </h3>
              </div>
              <p
                className={cn(
                  "mt-3 max-w-[46ch] pl-14 text-base leading-relaxed transition-colors duration-300",
                  i === active
                    ? "text-foreground-muted"
                    : "text-foreground-subtle",
                )}
              >
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="lg:order-2">
          <div className="sticky top-1/2 -translate-y-1/2">
            <div className="relative">
              <PreviewGlow parallax />
              <HeroPanelTilt>
                <div className="relative aspect-[4/3] w-full">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.step}
                      aria-hidden={i !== active}
                      className={cn(
                        "absolute inset-0 transition-[opacity,transform,filter] duration-[650ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                        i === active
                          ? "translate-y-0 scale-100 opacity-100 blur-0"
                          : "pointer-events-none translate-y-6 scale-[0.96] opacity-0 blur-[10px]",
                      )}
                    >
                      <s.Preview />
                    </div>
                  ))}
                </div>
              </HeroPanelTilt>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: no sticky panel. Each step's example renders inline beneath it
          and fades/blurs into place on scroll (lr-hiw-card). */}
      <div className="mt-12 space-y-14 lg:hidden">
        {STEPS.map((s) => (
          <div key={s.step}>
            <div className="flex items-center gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm text-neutral-950">
                {s.step}
              </span>
              <h3 className="text-lg font-medium text-foreground">{s.title}</h3>
            </div>
            <p className="mt-3 text-base leading-relaxed text-foreground-muted">
              {s.body}
            </p>
            <div className="lr-hiw-card relative mt-6 aspect-[4/3]">
              <PreviewGlow />
              <s.Preview />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
