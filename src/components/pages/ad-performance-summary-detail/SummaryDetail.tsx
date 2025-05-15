"use client";

import React from "react";
import { useGetSummaryQuery } from "@/hooks/queries/useGetSummaryQuery";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { ContractDetail } from "./ContractDetail";
import { AdTable } from "./AdTable";
import { PerformanceSummary } from "./PerformanceSummary";
import { ClientName } from "./ClientName";
import { TitlePage } from "@/components/ui/title-page";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

interface SummaryDetailProps {
  id: string;
}

export const SummaryDetail: React.FC<SummaryDetailProps> = ({ id }) => {
  const { data, isLoading } = useGetSummaryQuery(id);

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="70vh"
        gap={2}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" color="primary" fontWeight="bold">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Button component={Link} href="/ad-performance-summary" sx={{ mb: 3 }}>
        <ArrowBackIcon sx={{ mr: 2 }} />
        Back To Ad Summary
      </Button>
      <TitlePage mb={4}>Summary Detail</TitlePage>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <ClientName
              name={data?.name || ""}
              isFulfilled={data?.isFulfilled}
            />
            <ContractDetail data={data} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <PerformanceSummary data={data} />
        </Grid>
      </Grid>
      <AdTable ads={data?.ads || []} isLoading={isLoading} />
    </Box>
  );
};
