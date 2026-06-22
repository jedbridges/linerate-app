"use client";

import * as React from "react";

import { useView } from "@/components/view-store";
import { DashboardShell } from "@/components/patterns/dashboard-shell";

/*
 * Swaps the main column between the system content (passed as children) and the
 * dashboard demo as its own view. Children are server-rendered and passed
 * through; only the choice of what to show is client-side.
 */
export function MainView({ children }: { children: React.ReactNode }) {
  const view = useView();
  if (view === "shell") {
    return (
      <div className="py-8">
        <DashboardShell />
      </div>
    );
  }
  return <>{children}</>;
}
