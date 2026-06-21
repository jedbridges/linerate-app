import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

import { GridLines } from "@/components/grid-lines";
import { ConsoleStamp } from "@/components/console-stamp";
import { TooltipProvider } from "@/components/ui/tooltip";
import { withBase } from "@/lib/utils";
import "./globals.css";

/*
 * Fonts
 *
 * General Sans is self-hosted from Fontshare (OFL, free for commercial use).
 * Three weights: 400 regular, 500 medium, 600 semibold (display + wordmark
 * only). Files live in /public/fonts.
 *
 * JetBrains Mono stays on next/font/google as a variable font.
 */
const generalSans = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "Settlement infrastructure for nine-figure hosting agreements. Daily settlement, automated counterparty payments, real-time collateral, audit-ready reporting.";

// Absolute origin so crawlers resolve og:image to a full URL. The basePath is
// applied by Next on top of this; override via NEXT_PUBLIC_SITE_URL if the host
// changes (e.g. a custom domain).
const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jedbridges.github.io";

// Absolute URL to the committed share image. Built from origin + basePath so
// crawlers (which don't resolve relative paths or apply basePath) get a URL
// that resolves on the Pages project sub-path.
const OG_IMAGE = {
  url: `${SITE_ORIGIN}${withBase("/og.png")}`,
  width: 1200,
  height: 630,
  alt: "LineRate design system",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: "LineRate",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "LineRate design system",
    description: SITE_DESCRIPTION,
    siteName: "LineRate",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "LineRate design system",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*
   * .dark on <html> is the canonical brand surface (Onyx page, Paper text).
   * Light mode ships as the inverse and is opt-in via the ThemeToggle, which
   * removes the .dark class.
   */
  return (
    <html
      lang="en"
      className={`${generalSans.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-raised focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-foreground focus-visible:shadow-md"
        >
          Skip to content
        </a>
        <GridLines />
        <ConsoleStamp />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
