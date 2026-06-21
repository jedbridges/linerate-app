"use client";

import * as React from "react";
import { Download } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from "@/components/wordmark";

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
const MONOGRAM_HEIGHT_RATIO = 0.44; // matches the on-screen Avatar (h-[44%])

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

  // Monogram, scaled to a fraction of the diameter and optically centered.
  const targetH = size * MONOGRAM_HEIGHT_RATIO;
  const scale = targetH / MONOGRAM_VIEWBOX.height;
  const drawW = MONOGRAM_VIEWBOX.width * scale;
  ctx.save();
  ctx.translate(
    (size - drawW) / 2 - MONOGRAM_VIEWBOX.minX * scale,
    (size - targetH) / 2 - MONOGRAM_VIEWBOX.minY * scale
  );
  ctx.scale(scale, scale);
  ctx.fillStyle = fg;
  ctx.fill(new Path2D(MONOGRAM_PATH));
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
