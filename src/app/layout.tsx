import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";
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
  title: "LineRate",
  description:
    "Settlement infrastructure for nine-figure hosting agreements. Daily settlement, automated counterparty payments, real-time collateral, audit-ready reporting.",
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
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
