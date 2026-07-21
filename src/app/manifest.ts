import type { MetadataRoute } from "next";

import { withBase } from "@/lib/utils";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-metadata";

/*
 * Web app manifest. Without one, an Android "add to home screen" falls back to
 * scaling whatever icon it can find (the 32px favicon), which lands a blurry
 * mark on the home screen. iOS uses apple-icon.png and ignores this.
 *
 * Icons are declared "any maskable": the touch icon is already a full-bleed
 * Amber field, so Android's adaptive mask has solid colour to crop into rather
 * than cutting a transparent circle out of a floating mark.
 *
 * Paths go through withBase so they resolve under the Pages project sub-path;
 * manifest icon URLs are resolved against the manifest's own location, but the
 * explicit prefix keeps them correct regardless of where it is served from.
 */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: withBase("/"),
    display: "standalone",
    // Both Onyx: the canonical surface is the dark page, so the splash and the
    // standalone status bar continue it rather than interrupting with Amber.
    background_color: "#101010",
    theme_color: "#101010",
    icons: [
      {
        src: withBase("/apple-icon.png"),
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: withBase("/apple-icon.png"),
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: withBase("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
