import type { Metadata } from "next";

import { withBase } from "@/lib/utils";

/*
 * Shared site metadata.
 *
 * Exists because Next.js merges the metadata object SHALLOWLY: a page that
 * declares `openGraph` replaces the parent's whole openGraph block rather than
 * merging into it. Two concept pages set only an openGraph title and silently
 * dropped og:image, so sharing them produced a preview with no image at all.
 *
 * Use openGraphFor()/twitterFor() instead of hand-writing those blocks, so the
 * share image cannot be lost by overriding a sibling field.
 */

export const SITE_DESCRIPTION =
  "Settlement infrastructure for nine-figure hosting agreements. Daily settlement, automated counterparty payments, real-time collateral, audit-ready reporting.";

// Absolute origin so crawlers resolve og:image to a full URL. The basePath is
// applied by Next on top of this; override via NEXT_PUBLIC_SITE_URL if the host
// changes (e.g. a custom domain).
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jedbridges.github.io";

// Absolute URL to the committed share image. Built from origin + basePath so
// crawlers (which don't resolve relative paths or apply basePath) get a URL
// that resolves on the Pages project sub-path.
export const OG_IMAGE = {
  url: `${SITE_ORIGIN}${withBase("/og.png")}`,
  width: 1200,
  height: 630,
  alt: "LineRate, amber field with the LineRate wordmark",
};

export const SITE_NAME = "LineRate";

/** Open Graph block carrying the share image. Pass a title to override it. */
export function openGraphFor(
  title?: string,
  description?: string,
): Metadata["openGraph"] {
  return {
    title: title ?? "LineRate design system",
    description: description ?? SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    images: [OG_IMAGE],
  };
}

/** Twitter block, kept in step with the Open Graph one. */
export function twitterFor(
  title?: string,
  description?: string,
): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: title ?? "LineRate design system",
    description: description ?? SITE_DESCRIPTION,
    images: [OG_IMAGE],
  };
}
