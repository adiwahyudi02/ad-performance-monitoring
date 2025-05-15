"use client";

import React from "react";
import { Box, Card, Tooltip, Typography } from "@mui/material";
import { KpiColumn } from "../ad-performance-summary/KpiColumn";
import { formatPercentagePostfix } from "@/utils/percentage.utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface SummaryKpiProps {
  title: string;
  actual: number | null | undefined;
  target: number | null | undefined;
}

export const SummaryKpi: React.FC<SummaryKpiProps> = ({
  title,
  actual,
  target,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        padding: 2,
        width: "100%",
      }}
    >
      <Box display="flex" justifyContent="space-between" px={1}>
        <Typography variant="body2" fontWeight="bold">
          {title}
        </Typography>

        {!!actual && !!target && target > actual ? (
          <Tooltip title="Not Fulfilled">
            <CancelIcon
              color="error"
              data-testid={`${title}-notFulfilled-icon`}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Fulfilled">
            <CheckCircleIcon
              color="success"
              data-testid={`${title}-fulfilled-icon`}
            />
          </Tooltip>
        )}
      </Box>

      <Box display="flex" gap={1} px={1}>
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="caption">Actual</Typography>
          <KpiColumn
            type="actual"
            value={actual ? formatPercentagePostfix(actual) : actual}
            isNotFulfilled={!!actual && !!target && target > actual}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="caption">Target</Typography>
          <KpiColumn
            type="target"
            value={target ? formatPercentagePostfix(target) : target}
          />
        </Box>
      </Box>
    </Card>
  );
};
