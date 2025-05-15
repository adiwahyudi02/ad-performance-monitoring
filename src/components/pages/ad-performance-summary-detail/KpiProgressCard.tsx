import React from "react";
import {
  alpha,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { KpiColumn } from "../ad-performance-summary/KpiColumn";
import { AdHistories } from "@/api/schemas/summary.schemas";

interface KpiProgressCardProps {
  title: string;
  target: string | number | null;
  history: AdHistories;
  seriesLabel: string;
  isFulfilled: boolean;
}

export const KpiProgressCard: React.FC<KpiProgressCardProps> = ({
  title,
  target,
  history,
  isFulfilled,
  seriesLabel,
}) => {
  const theme = useTheme();

  const lineChartColor = isFulfilled
    ? theme.palette.success.main
    : theme.palette.error.main;

  return (
    <Card
      sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          mb={4}
        >
          <Typography
            variant="subtitle1"
            textAlign="center"
            mb={2}
            fontWeight="bold"
          >
            {title}
          </Typography>
          <Box
            sx={(theme) => ({
              boxShadow: "none",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 4,
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              p: 1,
            })}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="caption" fontWeight={600} ml={1}>
                  Target
                </Typography>
                <KpiColumn type="target" value={target} />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="caption" fontWeight={600} ml={1}>
                  Status
                </Typography>
                <Chip
                  label={isFulfilled ? "Fulfilled" : "Not Fulfilled"}
                  color={isFulfilled ? "success" : "error"}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <LineChart
          xAxis={[{ scaleType: "point", data: history.map((h) => h.date) }]}
          series={[
            {
              data: history.map((h) => h.actual),
              color: lineChartColor,
              label: seriesLabel,
            },
          ]}
          height={250}
        />
      </CardContent>
    </Card>
  );
};
