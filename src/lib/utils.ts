import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/*
 * tailwind-merge doesn't know our custom fluid font sizes (text-display-sm/md/
 * lg), so left to guess it treats them as text colors and silently drops them
 * when a real color like `text-foreground` is present in the same cn() call,
 * which collapsed the marketing hero headlines to the base 16px. Register them
 * as font-size utilities so they merge correctly.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-sm", "display-md", "display-lg"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/*
 * Deploy base path. Empty in local dev and on a root-domain host; set to the
 * repo sub-path (e.g. "/linerate-app") when served from a GitHub Pages project
 * site. next/link and next/router prefix this automatically, but raw <a> hrefs
 * to files in /public (and full-page navigations) do not, so prefix those with
 * withBase(). Inlined at build time from NEXT_PUBLIC_BASE_PATH.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string) {
  return `${BASE_PATH}${path}`;
}

/* Stable slug from a label, so section ids and nav anchors always match. */
export function slugify(label: string) {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
