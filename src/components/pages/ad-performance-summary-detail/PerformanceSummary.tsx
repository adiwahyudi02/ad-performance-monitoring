"use client";

import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { Summary } from "@/api/schemas/summary.schemas";
import { SummaryKpi } from "./SummaryKpi";

interface PerformanceSummaryProps {
  data?: Summary;
}

export const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({
  data,
}) => {
  return (
    <Box>
      <Typography variant="body1" fontWeight="bold" mb={5} mt={4} mx={1}>
        Performance Summary
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        <Grid size={{ xs: 12, md: 6 }}>
          {data?.ads && (
            <Card
              sx={{
                borderRadius: 4,
                padding: 2,
                textAlign: "center",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                <Typography variant="h3" fontWeight="bold">
                  {data?.ads.length}
                </Typography>
                <Typography variant="body2" fontWeight="bold" mt={1}>
                  Total Ads
                </Typography>
              </Box>
            </Card>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {data?.ctrTarget && (
            <SummaryKpi
              title="CTR"
              actual={data?.ctrActual}
              target={data?.ctrTarget}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {data?.conversionRateTarget && (
            <SummaryKpi
              title="Conversion Rate"
              actual={data?.conversionRateActual}
              target={data?.conversionRateTarget}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {data?.impressionTarget && (
            <SummaryKpi
              title="Impression"
              actual={data?.impressionActual}
              target={data?.impressionTarget}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
