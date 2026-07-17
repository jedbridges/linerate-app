"use client";

import * as React from "react";

import { cn, withBase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

/*
 * Line Screen lab — the interactive tuner around the <line-screen> custom
 * element (public/line-screen.js, loaded once by the route). Tuner state lives
 * in React and is passed to the element as string attributes; the element
 * re-renders itself via attributeChangedCallback, so there's no controlled
 * render loop on the React side (see HANDOFF state pattern).
 *
 * The embed code the Copy button emits references root-absolute asset paths
 * (/line-screen.js, /handshake.jpg) so it pastes cleanly into the marketing
 * app; the live preview here loads the same assets through withBase() so they
 * resolve under the GitHub Pages base path.
 */

type LineScreenEl = HTMLElement & { capture(): Promise<Blob | null> };

type ParamId = "frequency" | "contrast" | "exposure" | "bleed" | "focus" | "warp";

type Param = {
  id: ParamId;
  label: string;
  min: number;
  max: number;
  step: number;
  val: number;
  fmt: (v: number) => string;
};

const PARAMS: Param[] = [
  { id: "frequency", label: "Line frequency", min: 40, max: 400, step: 1, val: 170, fmt: (v) => v.toFixed(0) },
  { id: "contrast", label: "Contrast", min: 0.5, max: 4, step: 0.05, val: 1.7, fmt: (v) => v.toFixed(2) },
  { id: "exposure", label: "Exposure", min: -0.4, max: 0.4, step: 0.01, val: 0, fmt: (v) => v.toFixed(2) },
  { id: "bleed", label: "Amber bleed", min: 0, max: 1, step: 0.01, val: 0.85, fmt: (v) => v.toFixed(2) },
  { id: "focus", label: "Cursor focus", min: 0, max: 1, step: 0.01, val: 0.5, fmt: (v) => v.toFixed(2) },
  { id: "warp", label: "Cursor warp", min: 0, max: 0.3, step: 0.005, val: 0.04, fmt: (v) => v.toFixed(3) },
];

const ANGLES = [
  { label: "Horizontal", value: 0 },
  { label: "Vertical", value: 1.5708 },
  { label: "45°", value: 0.7854 },
];

const META = [
  { dt: "Element", dd: "<line-screen>" },
  { dt: "Runtime", dd: "WebGL 1 + OES_derivatives" },
  { dt: "Deps", dd: "none" },
  { dt: "Size", dd: "~5KB gz" },
  { dt: "Fallback", dd: "<img> via src" },
  { dt: "Motion", dd: "respects reduced" },
];

type Vals = Record<ParamId, number> & { angle: number };

const DEFAULTS: Vals = {
  frequency: 170,
  contrast: 1.7,
  exposure: 0,
  bleed: 0.85,
  focus: 0.5,
  warp: 0.04,
  angle: 0,
};

// Rounded, ordered attributes for the embed snippet. src is always the shipped
// default; the local "Load image" upload only affects this preview.
function toEmbed(v: Vals) {
  return {
    src: "/handshake.jpg",
    frequency: Math.round(v.frequency),
    contrast: +v.contrast.toFixed(2),
    exposure: +v.exposure.toFixed(2),
    bleed: +v.bleed.toFixed(2),
    focus: +v.focus.toFixed(2),
    warp: +v.warp.toFixed(3),
    angle: +v.angle.toFixed(4),
  };
}

function embedText(v: Vals) {
  const attrs = Object.entries(toEmbed(v))
    .map(([k, val]) => `  ${k}="${val}"`)
    .join("\n");
  return (
    `<line-screen\n${attrs}\n` +
    `  style="display:block; width:100%; aspect-ratio:32/9;"\n` +
    `></line-screen>\n` +
    `<script src="/line-screen.js" defer></script>`
  );
}

function EmbedCode({ vals }: { vals: Vals }) {
  const entries = Object.entries(toEmbed(vals));
  return (
    <code className="font-mono text-[13px] leading-relaxed">
      <span className="text-foreground-subtle italic">
        {"<!-- paste into any HTML/JSX -->"}
      </span>
      {"\n"}
      <span className="text-foreground-subtle">{"<line-screen"}</span>
      {"\n"}
      {entries.map(([k, v]) => (
        <React.Fragment key={k}>
          {"  "}
          <span className="text-foreground-muted">{k}</span>
          <span className="text-foreground-subtle">=</span>
          <span className="text-accent">{`"${v}"`}</span>
          {"\n"}
        </React.Fragment>
      ))}
      {"  "}
      <span className="text-foreground-muted">style</span>
      <span className="text-foreground-subtle">=</span>
      <span className="text-accent">{`"display:block; width:100%; aspect-ratio:32/9;"`}</span>
      {"\n"}
      <span className="text-foreground-subtle">{"></line-screen>"}</span>
      {"\n"}
      <span className="text-foreground-subtle">{"<script "}</span>
      <span className="text-foreground-muted">src</span>
      <span className="text-foreground-subtle">=</span>
      <span className="text-accent">{`"/line-screen.js"`}</span>
      <span className="text-foreground-subtle">{" defer></script>"}</span>
    </code>
  );
}

export function LineScreenLab() {
  const live = React.useRef<LineScreenEl>(null);
  const [vals, setVals] = React.useState<Vals>(DEFAULTS);
  const [src, setSrc] = React.useState(withBase("/handshake.jpg"));
  const [exportLabel, setExportLabel] = React.useState("Export PNG");
  const [copyEmbedLabel, setCopyEmbedLabel] = React.useState("Copy embed code");
  const [copyLiveLabel, setCopyLiveLabel] = React.useState("Copy");

  const set = React.useCallback(
    (id: keyof Vals, n: number) => setVals((v) => ({ ...v, [id]: n })),
    [],
  );

  const reset = React.useCallback(() => {
    setVals(DEFAULTS);
    setSrc(withBase("/handshake.jpg"));
  }, []);

  const onFile = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const fr = new FileReader();
    fr.onload = () => typeof fr.result === "string" && setSrc(fr.result);
    fr.readAsDataURL(f);
  }, []);

  const exportPng = React.useCallback(async () => {
    const el = live.current;
    if (!el) return;
    setExportLabel("Rendering");
    const blob = await el.capture();
    if (!blob) {
      setExportLabel("Failed");
      setTimeout(() => setExportLabel("Export PNG"), 1200);
      return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "linerate-line-screen.png";
    a.click();
    URL.revokeObjectURL(a.href);
    setExportLabel("Saved");
    setTimeout(() => setExportLabel("Export PNG"), 1200);
  }, []);

  const copy = React.useCallback(
    async (text: string, set: (s: string) => void, done: string, idle: string) => {
      try {
        await navigator.clipboard.writeText(text);
        set(done);
        setTimeout(() => set(idle), 1500);
      } catch (err) {
        console.error(err);
      }
    },
    [],
  );

  return (
    <div>
      {/* Preview */}
      <div className="overflow-hidden rounded-xl border border-border">
        <line-screen
          ref={live}
          src={src}
          frequency={String(vals.frequency)}
          contrast={String(vals.contrast)}
          exposure={String(vals.exposure)}
          bleed={String(vals.bleed)}
          focus={String(vals.focus)}
          warp={String(vals.warp)}
          angle={String(vals.angle)}
          style={{ display: "block", width: "100%", aspectRatio: "32 / 9" }}
        />
      </div>

      {/* 01 — Tune */}
      <div className="mt-16 mb-6 flex items-baseline gap-4 border-b border-border pb-3">
        <h2 className="text-lg font-medium text-foreground">
          <span className="mr-3 font-mono text-xs text-foreground-subtle">01</span>
          Tune
        </h2>
        <span className="ml-auto text-xs text-foreground-subtle">
          Move the cursor over the image above
        </span>
      </div>

      <div className="rounded-xl border border-border bg-raised">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">Parameters</h3>
          <span className="text-xs text-foreground-subtle">
            Changes stream to the preview in real time
          </span>
        </div>

        <div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2">
          {PARAMS.map((p) => (
            <div key={p.id}>
              <div className="mb-2.5 flex items-center justify-between">
                <label htmlFor={p.id} className="text-sm text-foreground-muted">
                  {p.label}
                </label>
                <output className="font-mono text-xs tabular-nums text-accent">
                  {p.fmt(vals[p.id])}
                </output>
              </div>
              <Slider
                id={p.id}
                min={p.min}
                max={p.max}
                step={p.step}
                value={[vals[p.id]]}
                onValueChange={([n]) => set(p.id, n)}
                aria-label={p.label}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-4">
          <ToggleGroup
            type="single"
            value={String(vals.angle)}
            onValueChange={(v) => v && set("angle", parseFloat(v))}
            aria-label="Line angle"
          >
            {ANGLES.map((a) => (
              <ToggleGroupItem key={a.value} value={String(a.value)}>
                {a.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <Button asChild variant="secondary" size="sm">
            <label className="cursor-pointer">
              Load image
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={onFile}
              />
            </label>
          </Button>
          <Button variant="secondary" size="sm" onClick={reset}>
            Reset
          </Button>

          <div className="flex-1" />

          <Button variant="secondary" size="sm" onClick={exportPng}>
            {exportLabel}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              copy(embedText(vals), setCopyEmbedLabel, "Copied", "Copy embed code")
            }
          >
            {copyEmbedLabel}
          </Button>
        </div>
      </div>

      {/* 02 — Embed */}
      <div className="mt-16 mb-6 flex items-baseline gap-4 border-b border-border pb-3">
        <h2 className="text-lg font-medium text-foreground">
          <span className="mr-3 font-mono text-xs text-foreground-subtle">02</span>
          Embed
        </h2>
        <span className="ml-auto text-xs text-foreground-subtle">
          One component, any page
        </span>
      </div>

      <p className="mb-6 max-w-[660px] text-sm leading-relaxed text-foreground-muted">
        The preview above and any production embed use the same custom element.
        Tune, click <b className="font-medium text-foreground">Copy embed code</b>,
        paste. Attributes stream through{" "}
        <code className="font-mono text-[13px] text-foreground">
          attributeChangedCallback
        </code>
        , so you can also bind them from any framework.
      </p>

      <div className="relative overflow-hidden rounded-xl border border-border bg-raised">
        <button
          type="button"
          onClick={() => copy(embedText(vals), setCopyLiveLabel, "Copied", "Copy")}
          className={cn(
            "absolute top-3 right-3 cursor-pointer rounded-md border border-border px-2.5 py-1 font-mono text-[11px] tracking-wide text-foreground-muted uppercase transition-colors hover:text-foreground",
            copyLiveLabel === "Copied" && "border-accent text-accent",
          )}
        >
          {copyLiveLabel}
        </button>
        <pre className="overflow-x-auto p-5">
          <EmbedCode vals={vals} />
        </pre>
      </div>

      <p className="mt-6 max-w-[660px] text-sm leading-relaxed text-foreground-muted">
        Ship <code className="font-mono text-[13px] text-foreground">line-screen.js</code>{" "}
        from your public assets (~5KB gzipped, zero dependencies). Works in React
        19, Vue, Svelte, or plain HTML. The component pauses rAF when off-screen,
        stops the loop when mouse easing settles, and respects{" "}
        <code className="font-mono text-[13px] text-foreground">
          prefers-reduced-motion
        </code>
        .
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-3">
        {META.map((m) => (
          <div key={m.dt} className="flex flex-col gap-1">
            <dt className="text-xs tracking-wide text-foreground-subtle uppercase">
              {m.dt}
            </dt>
            <dd className="font-mono text-sm text-foreground">{m.dd}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
