"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/*
 * LineRate charts
 *
 * Audit-grade data viz built on Recharts via the shadcn Chart wrapper.
 * Restrained on purpose: Paper stroke, a faint area wash, hairline
 * horizontal grid (border-subtle), mono axis ticks in foreground-subtle,
 * no gradients-as-decoration. One amber accent reserved for emphasis.
 * Tooltips render figures in mono. Draw-in animation respects reduced
 * motion. Numbers are sample data.
 */

const VOLUME = [
  { cycle: "4260", volume: 88.4 },
  { cycle: "4261", volume: 102.1 },
  { cycle: "4262", volume: 79.6 },
  { cycle: "4263", volume: 114.3 },
  { cycle: "4264", volume: 96.8 },
  { cycle: "4265", volume: 121.0 },
  { cycle: "4266", volume: 108.7 },
  { cycle: "4267", volume: 133.2 },
  { cycle: "4268", volume: 117.5 },
  { cycle: "4269", volume: 124.9 },
  { cycle: "4270", volume: 94.2 },
  { cycle: "4271", volume: 127.5 },
];

const CLEARED = [
  { cycle: "4266", pct: 99.1 },
  { cycle: "4267", pct: 99.6 },
  { cycle: "4268", pct: 98.9 },
  { cycle: "4269", pct: 99.8 },
  { cycle: "4270", pct: 97.4 },
  { cycle: "4271", pct: 99.4 },
];

const axisTick = {
  fill: "var(--color-foreground-subtle)",
  fontFamily: "var(--font-mono)",
  fontSize: 11,
} as const;

const volumeConfig = {
  volume: { label: "Settled ($M)", color: "var(--color-foreground)" },
} satisfies ChartConfig;

export function SettlementVolumeChart() {
  const reduce = useReducedMotion();
  return (
    <ChartContainer config={volumeConfig} className="h-56 w-full">
      <AreaChart data={VOLUME} margin={{ left: 4, right: 4, top: 8 }}>
        <defs>
          <linearGradient id="lr-volume-fill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-foreground)"
              stopOpacity={0.16}
            />
            <stop
              offset="100%"
              stopColor="var(--color-foreground)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          stroke="var(--color-border-subtle)"
          strokeDasharray="0"
        />
        <XAxis
          dataKey="cycle"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={axisTick}
          interval="preserveStartEnd"
        />
        <YAxis
          width={36}
          tickLine={false}
          axisLine={false}
          tick={axisTick}
          tickCount={4}
        />
        <ChartTooltip
          cursor={{ stroke: "var(--color-foreground-subtle)", strokeWidth: 1 }}
          content={<ChartTooltipContent className="font-mono" />}
        />
        <Area
          dataKey="volume"
          type="monotone"
          stroke="var(--color-volume)"
          strokeWidth={1.5}
          fill="url(#lr-volume-fill)"
          dot={false}
          activeDot={{ r: 3, fill: "var(--color-accent)", strokeWidth: 0 }}
          isAnimationActive={!reduce}
          animationDuration={600}
        />
      </AreaChart>
    </ChartContainer>
  );
}

const clearedConfig = {
  pct: { label: "Cleared (%)", color: "var(--color-foreground)" },
} satisfies ChartConfig;

export function ClearedRateChart() {
  const reduce = useReducedMotion();
  return (
    <ChartContainer config={clearedConfig} className="h-56 w-full">
      <BarChart data={CLEARED} margin={{ left: 4, right: 4, top: 8 }}>
        <CartesianGrid
          vertical={false}
          stroke="var(--color-border-subtle)"
        />
        <XAxis
          dataKey="cycle"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={axisTick}
        />
        <YAxis
          width={36}
          domain={[96, 100]}
          tickLine={false}
          axisLine={false}
          tick={axisTick}
          tickCount={3}
        />
        <ChartTooltip
          cursor={{ fill: "var(--color-muted)" }}
          content={<ChartTooltipContent className="font-mono" />}
        />
        <Bar
          dataKey="pct"
          fill="var(--color-pct)"
          radius={2}
          maxBarSize={28}
          isAnimationActive={!reduce}
          animationDuration={600}
        />
      </BarChart>
    </ChartContainer>
  );
}
