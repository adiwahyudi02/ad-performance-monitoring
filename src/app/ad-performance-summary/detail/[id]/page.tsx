import { SummaryDetail } from "@/components/pages/ad-performance-summary-detail/SummaryDetail";

interface AdPerformanceSummaryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdPerformanceSummaryDetail({
  params,
}: AdPerformanceSummaryDetailPageProps) {
  const id = (await params).id;

  return <SummaryDetail id={id} />;
}
