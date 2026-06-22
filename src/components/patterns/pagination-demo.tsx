"use client";

import * as React from "react";

import { Pagination } from "@/components/ui/pagination";

/*
 * Interactive Pagination for the showcase. Holds page state so the control is
 * live; real usage drives `page` from the data layer (URL, query, etc.).
 */
export function PaginationDemo() {
  const [page, setPage] = React.useState(1);
  return (
    <Pagination page={page} pageSize={25} total={412} onPageChange={setPage} />
  );
}
