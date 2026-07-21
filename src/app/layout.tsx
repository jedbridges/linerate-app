import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

import { GridLines } from "@/components/grid-lines";
import { ConsoleStamp } from "@/components/console-stamp";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
  openGraphFor,
  twitterFor,
} from "@/lib/site-metadata";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: "LineRate",
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: openGraphFor(),
  twitter: twitterFor(),
  appleWebApp: { title: SITE_NAME, capable: true, statusBarStyle: "black" },
};

/* Mobile browser chrome matches the page surface per scheme, so the address bar
   dissolves into the page instead of banding above it. Deliberately not Amber:
   the accent is rationed to one or two elements per screen, and spending it on
   OS chrome would put a permanent bright band over a dark-first product. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101010" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
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
