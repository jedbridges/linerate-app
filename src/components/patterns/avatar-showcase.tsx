"use client";

import * as React from "react";
import { Download } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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

const INITIALS = "LR";
const SCALE = 4;

async function downloadAvatar(
  px: number,
  bg: string,
  fg: string,
  toneKey: string,
  sizeKey: string
) {
  try {
    await document.fonts.ready;
  } catch {
    /* fonts API unavailable; draw with fallback */
  }
  const canvas = document.createElement("canvas");
  canvas.width = px * SCALE;
  canvas.height = px * SCALE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const c = (px * SCALE) / 2;

  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.arc(c, c, c, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = fg;
  ctx.font = `500 ${px * SCALE * 0.4}px "JetBrains Mono", ui-monospace, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Mono caps sit a hair high; nudge down for optical centering.
  ctx.fillText(INITIALS, c, c + px * SCALE * 0.02);

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
                <Avatar
                  initials={INITIALS}
                  size={size.key}
                  tone={tone.key}
                />
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
