import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * LineRate wordmark.
 *
 * The official LINERATE wordmark as inline SVG. Paths are filled with
 * currentColor so the mark themes automatically: Paper on dark, Onyx on
 * light. Size it with a height utility (`h-4 w-auto`) or `font-size`.
 *
 * Path data is exported so other surfaces (e.g. canvas avatar export) can
 * draw the same glyphs without duplicating the geometry.
 *
 * Body copy and accessibility text use the legal name "LineRate".
 */

export const WORDMARK_VIEWBOX = { width: 803, height: 91 } as const;

export const WORDMARK_PATHS = [
  "M92.1312 67.2025V91H0V1.4384H28.1547V67.2165H92.1312V67.2025Z",
  "M129.713 91H101.558V1.42444H129.713V91Z",
  "M258.504 1.42444V91H230.363V60.3594L170.381 25.8224V91H142.226V1.42444H179.724L230.363 32.9867V1.42444H258.504Z",
  "M300.331 23.3086V36.6178H345.537V55.8066H300.331V69.1158H366.877V91H272.19V1.42444H366.877V23.3086H300.331Z",
  "M468.058 64.8982L484.188 91H450.922L437.613 68.5991H409.081V91H380.926V1.4384H451.299C471.647 1.4384 485.599 14.999 485.599 34.9699C485.599 48.7958 478.951 59.6751 468.072 64.9122L468.058 64.8982ZM409.067 44.8156H444.903C450.154 44.8156 457.444 44.8156 457.444 34.9559C457.444 25.0962 450.154 25.2358 444.903 25.2358H409.067V44.8156Z",
  "M566.446 73.4591H520.247L512.566 90.986H481.465L523.194 1.42444H563.499L605.089 91H574.127L566.446 73.4731V73.4591ZM557.48 53.2509L543.402 21.1299L529.199 53.2509H557.48Z",
  "M695.823 25.2219H654.876V91H626.721V25.2219H585.774V1.42444H695.823V25.2219Z",
  "M735.904 23.3086V36.6178H781.111V55.8066H735.904V69.1158H802.451V91H707.764V1.42444H802.451V23.3086H735.904Z",
] as const;

function Wordmark({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox={`0 0 ${WORDMARK_VIEWBOX.width} ${WORDMARK_VIEWBOX.height}`}
      role="img"
      aria-label="LineRate"
      fill="currentColor"
      className={cn("inline-block h-[1em] w-auto text-foreground", className)}
      {...props}
    >
      {WORDMARK_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export { Wordmark };
