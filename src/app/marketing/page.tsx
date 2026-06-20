import type { Metadata } from "next";

import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { PricingTable } from "@/components/marketing/pricing-table";
import { StatRow } from "@/components/marketing/stat-row";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";

export const metadata: Metadata = {
  title: "LineRate, treasury and settlement",
  description:
    "Daily settlement, automated counterparty payments, and audit-ready reporting for nine-figure hosting agreements.",
};

export default function MarketingPage() {
  return (
    <>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Wordmark className="text-base" />
        <ThemeToggle />
      </header>

      <Hero
        eyebrow="Treasury and settlement"
        headline={
          <>
            Settle nine-figure obligations the same day, every day.
          </>
        }
        subhead="Automated counterparty payments, real-time collateral, and an audit pack ready before close. Built for hosting infrastructure at the scale where late settlement is a board-level event."
        primaryCta="Talk to settlement"
        secondaryCta="Read the spec"
      />

      <LogoCloud
        eyebrow="Settling for"
        logos={[
          "Acme Hosting",
          "Northwind",
          "Cascade DC",
          "Helix",
          "Meridian",
          "Solway",
        ]}
      />

      <StatRow
        eyebrow="Past quarter"
        stats={[
          { value: "$48.2B", label: "Settled across cycles" },
          { value: "99.4%", label: "Cleared on first attempt" },
          { value: "T+0", label: "Standard settlement window" },
        ]}
      />

      <FeatureGrid
        eyebrow="What you get"
        headline="A treasury surface that closes the day on time."
        features={[
          {
            title: "Cycle-based settlement",
            body: "Cleared, reconciled, and exported in three named windows a day. No batch jobs at midnight, no manual sweeps the next morning.",
          },
          {
            title: "Audit pack on close",
            body: "Every cycle produces a signed, hash-chained export. Hand it to your auditor without spreadsheet stitching.",
          },
          {
            title: "Counterparty SLAs",
            body: "Track acknowledgement times per counterparty. Surface drift before it becomes an exception.",
          },
          {
            title: "Real-time collateral",
            body: "Posted and held positions update with each settled cycle. Reserve thresholds are enforced before the next window opens.",
          },
        ]}
      />

      <PricingTable
        eyebrow="Plans"
        headline="Pricing scales with cycle volume, not seats."
        tiers={[
          {
            name: "Operator",
            price: "$8K",
            cadence: "month",
            description:
              "For treasury teams running one settlement cycle per day.",
            features: [
              "One cycle per day",
              "Signed audit pack",
              "Up to 25 counterparties",
              "Email support",
            ],
            cta: "Start with Operator",
          },
          {
            name: "Operator+",
            price: "$24K",
            cadence: "month",
            description:
              "Three cycles per day. Suitable for teams settling across regions.",
            features: [
              "Three cycles per day",
              "Real-time collateral",
              "Up to 100 counterparties",
              "Shared Slack channel",
            ],
            cta: "Choose Operator+",
            highlight: true,
          },
          {
            name: "Treasury",
            price: "Custom",
            cadence: "year",
            description:
              "For nine-figure books with bespoke clearing and custody requirements.",
            features: [
              "Unlimited cycles",
              "Dedicated reconciler",
              "Custom clearing rules",
              "On-call response",
            ],
            cta: "Talk to settlement",
          },
        ]}
      />
    </>
  );
}
