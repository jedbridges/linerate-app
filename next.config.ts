import type { NextConfig } from "next";

// Pin Turbopack's workspace root to the project directory so Next doesn't
// climb to an ancestor lockfile (e.g. a stray ~/package-lock.json). The dev
// server is always launched from the project root, so process.cwd() is
// reliable here without ESM gymnastics.
const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
