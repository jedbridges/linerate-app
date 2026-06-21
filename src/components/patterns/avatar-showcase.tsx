"use client";

import * as React from "react";
import { Download } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { WORDMARK_PATHS, WORDMARK_VIEWBOX } from "@/components/wordmark";

/*
 * Avatar showcase + downloader
 *
 * Renders the monogram avatar in three sizes and both brand tones, and
 * exports any of them as a transparent PNG drawn on a canvas (circle fill +
 * mono initials), at 4x for crisp output. The brand font is awaited via
 * document.fonts before drawing so the initials render in JetBrains Mono.
 */

const SIZES = [
  { key: "sm", px: 32, label: "32" },
  { key: "md", px: 40, label: "40" },
  { key: "lg", px: 56, label: "56" },
] as const;

const TONES = [
  { key: "onyx", bg: "#101010", fg: "#FFFFFF", label: "Onyx" },
  { key: "amber", bg: "#DF8E2A", fg: "#101010", label: "Amber" },
] as const;

const SCALE = 4;
const WORDMARK_WIDTH_RATIO = 0.64; // matches the on-screen Avatar (w-[64%])

function downloadAvatar(
  px: number,
  bg: string,
  fg: string,
  toneKey: string,
  sizeKey: string
) {
  const size = px * SCALE;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const c = size / 2;

  // Circle fill
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.arc(c, c, c, 0, Math.PI * 2);
  ctx.fill();

  // Wordmark, scaled to a fraction of the diameter and centered.
  const targetW = size * WORDMARK_WIDTH_RATIO;
  const scale = targetW / WORDMARK_VIEWBOX.width;
  const drawH = WORDMARK_VIEWBOX.height * scale;
  ctx.save();
  ctx.translate((size - targetW) / 2, (size - drawH) / 2);
  ctx.scale(scale, scale);
  ctx.fillStyle = fg;
  for (const d of WORDMARK_PATHS) ctx.fill(new Path2D(d));
  ctx.restore();

  const a = document.createElement("a");
  a.download = `linerate-avatar-${toneKey}-${sizeKey}.png`;
  a.href = canvas.toDataURL("image/png");
  a.click();
}

export function AvatarShowcase() {
  return (
    <div className="space-y-8">
      {TONES.map((tone) => (
        <div key={tone.key}>
          <p className="eyebrow mb-4">{tone.label}</p>
          <div className="flex flex-wrap items-end gap-8">
            {SIZES.map((size) => (
              <div key={size.key} className="flex flex-col items-center gap-3">
                <Avatar size={size.key} tone={tone.key} />
                <span className="font-mono text-xs text-foreground-subtle">
                  {size.label}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    downloadAvatar(
                      size.px,
                      tone.bg,
                      tone.fg,
                      tone.key,
                      size.key
                    )
                  }
                >
                  <Download />
                  PNG
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
