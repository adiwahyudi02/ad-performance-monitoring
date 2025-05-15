import React from "react";
import { TitlePage } from "@/components/ui/title-page";
import { SummaryTable } from "@/components/pages/ad-performance-summary/SummaryTable";
import { SummaryFilter } from "@/components/pages/ad-performance-summary/SummaryFilter";
import { SummaryProvider } from "@/contexts/summary.context";

export default function SummariesPage() {
  return (
    <SummaryProvider>
      <TitlePage>Ad Performance Summary</TitlePage>
      <SummaryFilter />
      <SummaryTable />
    </SummaryProvider>
  );
}
