"use client";

import * as React from "react";
import { Download } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MONOGRAM_PATH,
  MONOGRAM_VIEWBOX,
  WORDMARK_PATHS,
  WORDMARK_VIEWBOX,
  Wordmark,
} from "@/components/wordmark";

/*
 * Brand assets + downloads
 *
 * Downloadable wordmark (SVG, and PNG on a padded dark field) and avatars at
 * one social-standard size (400x400, the common profile size). All drawn from
 * the shared wordmark/monogram path data so the assets are exact.
 */

function trigger(href: string, name: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  a.click();
}

// Wordmark as a standalone vector (Onyx fill: the portable logo color,
// recolor as needed).
function downloadWordmarkSvg() {
  const { width, height } = WORDMARK_VIEWBOX;
  const body = WORDMARK_PATHS.map((d) => `<path d="${d}"/>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="#101010" role="img" aria-label="LineRate"><title>LineRate</title>${body}</svg>`;
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  trigger(url, "linerate-wordmark.svg");
  URL.revokeObjectURL(url);
}

// Wordmark PNG: white mark on an Onyx field with cap-height clear space.
function downloadWordmarkPng() {
  const { width: vbW, height: vbH } = WORDMARK_VIEWBOX;
  const markW = 1200;
  const scale = markW / vbW;
  const markH = vbH * scale;
  const pad = markH; // clear space = cap height
  const cw = Math.round(markW + pad * 2);
  const ch = Math.round(markH + pad * 2);

  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "#101010";
  ctx.fillRect(0, 0, cw, ch);
  ctx.save();
  ctx.translate(pad, pad);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#FFFFFF";
  for (const d of WORDMARK_PATHS) ctx.fill(new Path2D(d));
  ctx.restore();
  trigger(canvas.toDataURL("image/png"), "linerate-wordmark-dark.png");
}

// Social avatar: 400x400 square filled with the tone (platforms crop to a
// circle), monogram centered with the same optical nudge as the on-screen mark.
const AVATAR_PX = 400;
const RATIO = 0.38; // matches the on-screen Avatar (h-[38%])
const NUDGE_X = 0.05;
const NUDGE_Y = -0.04;

function downloadAvatar(bg: string, fg: string, toneKey: string) {
  const canvas = document.createElement("canvas");
  canvas.width = AVATAR_PX;
  canvas.height = AVATAR_PX;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, AVATAR_PX, AVATAR_PX);

  const targetH = AVATAR_PX * RATIO;
  const scale = targetH / MONOGRAM_VIEWBOX.height;
  const drawW = MONOGRAM_VIEWBOX.width * scale;
  ctx.save();
  ctx.translate(
    (AVATAR_PX - drawW) / 2 - MONOGRAM_VIEWBOX.minX * scale + drawW * NUDGE_X,
    (AVATAR_PX - targetH) / 2 - MONOGRAM_VIEWBOX.minY * scale + targetH * NUDGE_Y
  );
  ctx.scale(scale, scale);
  ctx.fillStyle = fg;
  ctx.fill(new Path2D(MONOGRAM_PATH));
  ctx.restore();
  trigger(canvas.toDataURL("image/png"), `linerate-avatar-${toneKey}-400.png`);
}

export function BrandAssets() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Wordmark */}
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="eyebrow mb-5">Wordmark</p>
        <div className="flex h-28 items-center justify-center rounded-md border border-border-subtle bg-page">
          <Wordmark className="h-5 w-auto text-foreground" />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" onClick={downloadWordmarkSvg}>
            <Download />
            SVG
          </Button>
          <Button variant="secondary" size="sm" onClick={downloadWordmarkPng}>
            <Download />
            PNG on dark
          </Button>
        </div>
      </div>

      {/* Avatars, one social size */}
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="eyebrow mb-5">Avatar, 400 &times; 400</p>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <Avatar tone="onyx" size="lg" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => downloadAvatar("#101010", "#FFFFFF", "onyx")}
            >
              <Download />
              PNG
            </Button>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Avatar tone="amber" size="lg" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => downloadAvatar("#DF8E2A", "#101010", "amber")}
            >
              <Download />
              PNG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
