import type { NextConfig } from "next";

// Static export so the design system can be hosted on any static file host
// (GitHub Pages here). No server features are used: a single client-rendered
// route, self-hosted fonts, SVG/canvas marks. `next build` emits ./out.
//
// basePath/assetPrefix are driven by NEXT_PUBLIC_BASE_PATH so the same build
// works at a root domain (empty) or under a GitHub Pages project sub-path
// (e.g. "/linerate-app"). The CI workflow sets it; local dev leaves it unset.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // Pages serves /foo/ -> /foo/index.html; trailing slashes keep deep links
  // and asset paths resolving on a plain static host.
  trailingSlash: true,
  // Static export can't run the default image optimizer.
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Pin Turbopack's workspace root to the project directory so Next doesn't
  // climb to an ancestor lockfile (e.g. a stray ~/package-lock.json). The dev
  // server is always launched from the project root, so process.cwd() is
  // reliable here without ESM gymnastics.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
