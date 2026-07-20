/*
 * Effect definitions. Each entry fully describes one shippable custom element
 * to the generic tuner in effect-lab.tsx: which tag and script to load, which
 * sliders to show, and what the copy-paste embed should say. Adding an effect
 * is a config entry plus the element in public/, not another lab component.
 *
 * `val` doubles as the slider default and the element's own default, so the two
 * can't drift; keep them in step with the DEFAULTS block in the element file.
 *
 * Config is handed from a server route to the client lab, so it has to stay
 * plain serializable data. Notably there's no per-param format function: how
 * many decimals to show follows from `step` (see decimals()), which also keeps
 * the readout and the embed snippet agreeing on precision for free.
 */

export type EffectParam = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  val: number;
};

/* Decimal places implied by a slider step: 0.005 -> 3, 0.05 -> 2, 1 -> 0. */
export function decimals(step: number) {
  const s = String(step);
  const dot = s.indexOf(".");
  return dot === -1 ? 0 : s.length - dot - 1;
}

export type EffectToggle = {
  id: string;
  label: string;
  val: number;
  /* Radian angles need more precision in the embed than the step implies. */
  decimals: number;
  options: { label: string; value: number }[];
};

export type EffectConfig = {
  tag: string;
  script: string;
  download: string;
  previewLabel: string;
  aspect: string;
  hint: string;
  /* Short form for the meta table, long form for the prose below the embed. */
  size: string;
  sizeLong: string;
  params: EffectParam[];
  toggle: EffectToggle;
  meta: { dt: string; dd: string }[];
};

/* The element's three colour attributes, shared by every effect. "paper" is the
 * light field the marks sit on (background) and "ink" is the mark colour itself
 * (foreground); "accent" is what the cursor pools into, so it's what the Amber
 * bleed slider actually blends toward. */
export type ColorId = "paper" | "ink" | "accent";
export type Colors = Record<ColorId, string>;

export const COLORS: { id: ColorId; label: string }[] = [
  { id: "paper", label: "Background" },
  { id: "ink", label: "Foreground" },
  { id: "accent", label: "Accent" },
];

export const COLOR_DEFAULTS: Colors = {
  paper: "#EFEBDD",
  ink: "#0A0A0A",
  accent: "#DF8E2A",
};

export const LINE_SCREEN: EffectConfig = {
  tag: "line-screen",
  script: "/line-screen.js",
  download: "linerate-line-screen.png",
  previewLabel:
    "Live preview: the sample photograph rendered as a line halftone",
  aspect: "32 / 9",
  hint: "Move the cursor over the image above",
  size: "~5KB gz",
  sizeLong: "~5KB gzipped",
  params: [
    { id: "frequency", label: "Line frequency", min: 40, max: 400, step: 1, val: 170 },
    { id: "contrast", label: "Contrast", min: 0.5, max: 4, step: 0.05, val: 1.7 },
    { id: "exposure", label: "Exposure", min: -0.4, max: 0.4, step: 0.01, val: 0 },
    { id: "bleed", label: "Amber bleed", min: 0, max: 1, step: 0.01, val: 0.85 },
    { id: "focus", label: "Cursor focus", min: 0, max: 1, step: 0.01, val: 0.5 },
    { id: "warp", label: "Cursor warp", min: 0, max: 0.3, step: 0.005, val: 0.04 },
  ],
  toggle: {
    id: "angle",
    label: "Line angle",
    val: 0,
    decimals: 4,
    options: [
      { label: "Horizontal", value: 0 },
      { label: "Vertical", value: 1.5708 },
      { label: "45°", value: 0.7854 },
    ],
  },
  meta: [
    { dt: "Element", dd: "<line-screen>" },
    { dt: "Runtime", dd: "WebGL 1 + OES_derivatives" },
    { dt: "Deps", dd: "none" },
    { dt: "Size", dd: "~5KB gz" },
    { dt: "Fallback", dd: "<img> via src" },
    { dt: "Motion", dd: "respects reduced" },
  ],
};

/*
 * Cross hatch. "Grid" sets the lattice tone is sampled on and is the control
 * that decides how constructed the result reads: coarse grids give the blocky,
 * drawn look, fine grids resolve back toward the photograph. "Hatch passes" is
 * how many line sets stack up in the shadows: each one alternates between the
 * two perpendicular directions and lays its rules between the previous set's.
 */
export const CROSS_HATCH: EffectConfig = {
  tag: "cross-hatch",
  script: "/cross-hatch.js",
  download: "linerate-cross-hatch.png",
  previewLabel:
    "Live preview: the sample photograph rendered as geometric cross-hatching",
  aspect: "32 / 9",
  hint: "Move the cursor over the image above",
  size: "~5KB gz",
  sizeLong: "~5KB gzipped",
  params: [
    { id: "grid", label: "Grid", min: 20, max: 240, step: 1, val: 32 },
    { id: "levels", label: "Hatch passes", min: 1, max: 6, step: 1, val: 4 },
    { id: "weight", label: "Stroke weight", min: 0.05, max: 0.5, step: 0.01, val: 0.22 },
    { id: "contrast", label: "Contrast", min: 0.5, max: 4, step: 0.05, val: 1.05 },
    { id: "exposure", label: "Exposure", min: -0.4, max: 0.4, step: 0.01, val: 0.16 },
    { id: "bleed", label: "Amber bleed", min: 0, max: 1, step: 0.01, val: 0.85 },
    { id: "focus", label: "Cursor focus", min: 0, max: 1, step: 0.01, val: 0.5 },
  ],
  /* Rotates the whole lattice. The construction is always two perpendicular
     line families, so 0 is horizontal + vertical and 45° is the same grid
     turned on its corner. It never introduces a third direction. */
  toggle: {
    id: "angle",
    label: "Lattice rotation",
    val: 0,
    decimals: 4,
    options: [
      { label: "Horizontal & vertical", value: 0 },
      { label: "45°", value: 0.7854 },
    ],
  },
  meta: [
    { dt: "Element", dd: "<cross-hatch>" },
    { dt: "Runtime", dd: "WebGL 1 + OES_derivatives" },
    { dt: "Deps", dd: "none" },
    { dt: "Size", dd: "~5KB gz" },
    { dt: "Fallback", dd: "<img> via src" },
    { dt: "Motion", dd: "respects reduced" },
  ],
};
