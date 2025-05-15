import React from "react";
import { Stack } from "@mui/material";
import { AdHistories } from "@/api/schemas/summary.schemas";
import { KpiProgressCard } from "./KpiProgressCard";
import { formatPercentagePostfix } from "@/utils/percentage.utils";
import { formatThousandsSeparator } from "@/utils/separator.utils";

interface AdPerformancesChartsProps {
  ctrActual: number | null;
  ctrTarget: number | null;
  impressionActual: number | null;
  impressionTarget: number | null;
  conversionRateActual: number | null;
  conversionRateTarget: number | null;
  ctrHistory: AdHistories;
  impressionHistory: AdHistories;
  conversionRateHistory: AdHistories;
}

export const AdPerformancesCharts: React.FC<AdPerformancesChartsProps> = ({
  ctrActual,
  ctrTarget,
  impressionActual,
  impressionTarget,
  conversionRateActual,
  conversionRateTarget,
  ctrHistory,
  impressionHistory,
  conversionRateHistory,
}) => {
  return (
    <Stack spacing={3}>
      <KpiProgressCard
        title="CTR Progress"
        target={ctrTarget ? formatPercentagePostfix(ctrTarget) : ctrTarget}
        history={ctrHistory}
        isFulfilled={!!ctrActual && !!ctrTarget && ctrActual >= ctrTarget}
        seriesLabel="CTR (%)"
      />

      <KpiProgressCard
        title="Impressions Progress"
        target={
          impressionTarget
            ? formatThousandsSeparator(impressionTarget)
            : impressionTarget
        }
        history={impressionHistory}
        isFulfilled={
          !!impressionActual &&
          !!impressionTarget &&
          impressionActual >= impressionTarget
        }
        seriesLabel="Impressions (M)"
      />

      <KpiProgressCard
        title="Conversion Rate Progress"
        target={
          conversionRateTarget
            ? formatPercentagePostfix(conversionRateTarget)
            : conversionRateTarget
        }
        history={conversionRateHistory}
        isFulfilled={
          !!conversionRateActual &&
          !!conversionRateTarget &&
          conversionRateActual >= conversionRateTarget
        }
        seriesLabel="Conversion Rate (%)"
      />
    </Stack>
  );
};
