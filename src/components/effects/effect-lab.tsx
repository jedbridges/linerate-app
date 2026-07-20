"use client";

import * as React from "react";

import { cn, withBase } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  COLORS,
  COLOR_DEFAULTS,
  decimals,
  type Colors,
  type EffectConfig,
} from "./effects";

/*
 * Effect lab: the interactive tuner around a shippable custom element (see
 * effects.ts for the per-effect config, public/<tag>.js for the element itself,
 * loaded once by the route). Tuner state lives in React and is passed to the
 * element as string attributes; the element re-renders itself via
 * attributeChangedCallback, so there's no controlled render loop on the React
 * side (see HANDOFF state pattern).
 *
 * The embed code the Copy button emits references root-absolute asset paths
 * (the element script, /handshake.jpg) so it pastes cleanly into the marketing
 * app; the live preview here loads the same assets through withBase() so they
 * resolve under the GitHub Pages base path.
 */

type CaptureEl = HTMLElement & { capture(): Promise<Blob | null> };

type Vals = Record<string, number>;

// Rounded, ordered attributes for the embed snippet. src is always the shipped
// default; the local "Load image" upload only affects this preview.
function toEmbed(cfg: EffectConfig, v: Vals, c: Colors) {
  const out: Record<string, string | number> = { src: "/handshake.jpg" };
  for (const p of cfg.params) out[p.id] = +v[p.id].toFixed(decimals(p.step));
  out[cfg.toggle.id] = +v[cfg.toggle.id].toFixed(cfg.toggle.decimals);
  out.ink = c.ink;
  out.paper = c.paper;
  out.accent = c.accent;
  return out;
}

function styleAttr(cfg: EffectConfig) {
  return `display:block; width:100%; aspect-ratio:${cfg.aspect.replace(/\s/g, "")};`;
}

function embedText(cfg: EffectConfig, v: Vals, c: Colors) {
  const attrs = Object.entries(toEmbed(cfg, v, c))
    .map(([k, val]) => `  ${k}="${val}"`)
    .join("\n");
  return (
    `<${cfg.tag}\n${attrs}\n` +
    `  style="${styleAttr(cfg)}"\n` +
    `></${cfg.tag}>\n` +
    `<script src="${cfg.script}" defer></script>`
  );
}

function EmbedCode({
  cfg,
  vals,
  colors,
}: {
  cfg: EffectConfig;
  vals: Vals;
  colors: Colors;
}) {
  const entries = Object.entries(toEmbed(cfg, vals, colors));
  return (
    <code className="font-mono text-[13px] leading-relaxed">
      <span className="text-foreground-subtle italic">
        {"<!-- paste into any HTML/JSX -->"}
      </span>
      {"\n"}
      <span className="text-foreground-subtle">{`<${cfg.tag}`}</span>
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
      <span className="text-accent">{`"${styleAttr(cfg)}"`}</span>
      {"\n"}
      <span className="text-foreground-subtle">{`></${cfg.tag}>`}</span>
      {"\n"}
      <span className="text-foreground-subtle">{"<script "}</span>
      <span className="text-foreground-muted">src</span>
      <span className="text-foreground-subtle">=</span>
      <span className="text-accent">{`"${cfg.script}"`}</span>
      <span className="text-foreground-subtle">{" defer></script>"}</span>
    </code>
  );
}

export function EffectLab({ config }: { config: EffectConfig }) {
  const live = React.useRef<CaptureEl>(null);

  const defaults = React.useMemo<Vals>(() => {
    const d: Vals = { [config.toggle.id]: config.toggle.val };
    for (const p of config.params) d[p.id] = p.val;
    return d;
  }, [config]);

  const [vals, setVals] = React.useState<Vals>(defaults);
  const [colors, setColors] = React.useState<Colors>(COLOR_DEFAULTS);
  const [src, setSrc] = React.useState(withBase("/handshake.jpg"));
  const [exportLabel, setExportLabel] = React.useState("Export PNG");
  const [copyEmbedLabel, setCopyEmbedLabel] = React.useState("Copy embed code");
  const [copyLiveLabel, setCopyLiveLabel] = React.useState("Copy");

  const set = React.useCallback(
    (id: string, n: number) => setVals((v) => ({ ...v, [id]: n })),
    [],
  );

  const reset = React.useCallback(() => {
    setVals(defaults);
    setColors(COLOR_DEFAULTS);
    setSrc(withBase("/handshake.jpg"));
  }, [defaults]);

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
    a.download = config.download;
    a.click();
    URL.revokeObjectURL(a.href);
    setExportLabel("Saved");
    setTimeout(() => setExportLabel("Export PNG"), 1200);
  }, [config.download]);

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

  /* The element is chosen per effect, so it's created by tag name rather than
     written as JSX. React 19 passes unknown props straight through as string
     attributes, which is exactly the element's contract. */
  const preview = React.createElement(config.tag, {
    ref: live,
    role: "img",
    "aria-label": config.previewLabel,
    src,
    ...Object.fromEntries(
      Object.keys(vals).map((k) => [k, String(vals[k])]),
    ),
    ink: colors.ink,
    paper: colors.paper,
    accent: colors.accent,
    style: { display: "block", width: "100%", aspectRatio: config.aspect },
  });

  return (
    <div>
      {/* Preview */}
      <div className="overflow-hidden rounded-xl border border-border">
        {preview}
      </div>

      {/* 01: Tune */}
      <div className="mt-16 mb-6 flex items-baseline gap-4 border-b border-border pb-3">
        <h2 className="text-lg font-medium text-foreground">
          <span className="mr-3 font-mono text-xs text-foreground-subtle">01</span>
          Tune
        </h2>
        <span className="ml-auto text-xs text-foreground-subtle">
          {config.hint}
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
          {config.params.map((p) => (
            <div key={p.id}>
              <div className="mb-2.5 flex items-center justify-between">
                <label htmlFor={p.id} className="text-sm text-foreground-muted">
                  {p.label}
                </label>
                <output className="font-mono text-xs tabular-nums text-accent">
                  {vals[p.id].toFixed(decimals(p.step))}
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

        {/* Colours: a swatch that shows the current value with the native
            colour input laid invisibly over it, so the control matches the
            panel instead of rendering an OS-styled picker. */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border px-5 py-4">
          {COLORS.map((c) => (
            <div key={c.id} className="flex items-center gap-3">
              <label
                htmlFor={`color-${c.id}`}
                className="text-sm text-foreground-muted"
              >
                {c.label}
              </label>
              <output className="font-mono text-xs tracking-wide text-foreground-muted">
                {colors[c.id].toUpperCase()}
              </output>
              <span
                className="relative block size-6 overflow-hidden rounded-md border border-border has-[:focus-visible]:shadow-[0_0_0_2px_var(--page),0_0_0_4px_var(--foreground)]"
                style={{ backgroundColor: colors[c.id] }}
              >
                <input
                  id={`color-${c.id}`}
                  type="color"
                  value={colors[c.id].toLowerCase()}
                  onChange={(e) =>
                    setColors((prev) => ({ ...prev, [c.id]: e.target.value }))
                  }
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                />
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-4">
          <ToggleGroup
            type="single"
            value={String(vals[config.toggle.id])}
            onValueChange={(v) => v && set(config.toggle.id, parseFloat(v))}
            aria-label={config.toggle.label}
          >
            {config.toggle.options.map((a) => (
              <ToggleGroupItem key={a.value} value={String(a.value)}>
                {a.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <Button asChild variant="secondary" size="sm">
            {/* File input is visually hidden, so surface its keyboard focus on
                the label (which is the styled control). */}
            <label className="cursor-pointer has-[:focus-visible]:shadow-[0_0_0_2px_var(--page),0_0_0_4px_var(--foreground)]">
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
              copy(
                embedText(config, vals, colors),
                setCopyEmbedLabel,
                "Copied",
                "Copy embed code",
              )
            }
          >
            {copyEmbedLabel}
          </Button>
        </div>
      </div>

      {/* 02: Embed */}
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
          onClick={() =>
            copy(
              embedText(config, vals, colors),
              setCopyLiveLabel,
              "Copied",
              "Copy",
            )
          }
          className={cn(
            "absolute top-3 right-3 cursor-pointer rounded-md border border-border px-2.5 py-1 font-mono text-[11px] tracking-wide text-foreground-muted uppercase transition-colors hover:text-foreground",
            copyLiveLabel === "Copied" && "border-accent text-accent",
          )}
        >
          {copyLiveLabel}
        </button>
        <pre className="overflow-x-auto p-5">
          <EmbedCode cfg={config} vals={vals} colors={colors} />
        </pre>
      </div>

      <p className="mt-6 max-w-[660px] text-sm leading-relaxed text-foreground-muted">
        Ship{" "}
        <code className="font-mono text-[13px] text-foreground">
          {config.script.replace("/", "")}
        </code>{" "}
        from your public assets ({config.sizeLong}, zero dependencies). Works in
        React 19, Vue, Svelte, or plain HTML. The component pauses rAF when
        off-screen, stops the loop when mouse easing settles, and respects{" "}
        <code className="font-mono text-[13px] text-foreground">
          prefers-reduced-motion
        </code>
        .
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-3">
        {config.meta.map((m) => (
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
