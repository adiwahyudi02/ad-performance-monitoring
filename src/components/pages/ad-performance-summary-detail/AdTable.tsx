"use client";

import { alpha, Box, Card, CardContent, Typography } from "@mui/material";
import { Ad, Ads } from "@/api/schemas/summary.schemas";
import React, { useState } from "react";
import { Column, Table } from "@/components/ui/table";
import { KpiColumn } from "../ad-performance-summary/KpiColumn";
import { formatPercentagePostfix } from "@/utils/percentage.utils";
import { formatThousandsSeparator } from "@/utils/separator.utils";
import AdTableAction from "./AdTableAction";

const columns: Column<Ad>[] = [
  { label: "Name", key: "name", align: "left" },
  {
    label: "CTR",
    children: [
      {
        label: "Actual",
        render: (row) => (
          <KpiColumn
            type="actual"
            value={
              row.ctrActual
                ? formatPercentagePostfix(row.ctrActual)
                : row.ctrActual
            }
            isNotFulfilled={
              !!row.ctrActual &&
              !!row.ctrTarget &&
              row.ctrTarget > row.ctrActual
            }
          />
        ),
      },
      {
        label: "Target",
        render: (row) => (
          <KpiColumn
            type="target"
            value={
              row.ctrTarget
                ? formatPercentagePostfix(row.ctrTarget)
                : row.ctrTarget
            }
          />
        ),
      },
    ],
  },
  {
    label: "Impression",
    children: [
      {
        label: "Actual",
        render: (row) => (
          <KpiColumn
            type="actual"
            value={
              row.impressionActual
                ? formatThousandsSeparator(row.impressionActual)
                : row.impressionActual
            }
            isNotFulfilled={
              !!row.impressionActual &&
              !!row.impressionTarget &&
              row.impressionTarget > row.impressionActual
            }
          />
        ),
      },
      {
        label: "Target",
        render: (row) => (
          <KpiColumn
            type="target"
            value={
              row.impressionTarget
                ? formatThousandsSeparator(row.impressionTarget)
                : row.impressionTarget
            }
          />
        ),
      },
    ],
  },
  {
    label: "Conversion Rate",
    children: [
      {
        label: "Actual",
        render: (row) => (
          <KpiColumn
            type="actual"
            value={
              row.conversionRateActual
                ? formatPercentagePostfix(row.conversionRateActual)
                : row.conversionRateActual
            }
            isNotFulfilled={
              !!row.conversionRateActual &&
              !!row.conversionRateTarget &&
              row.conversionRateTarget > row.conversionRateActual
            }
          />
        ),
      },
      {
        label: "Target",
        render: (row) => (
          <KpiColumn
            type="target"
            value={
              row.conversionRateTarget
                ? formatPercentagePostfix(row.conversionRateTarget)
                : row.conversionRateTarget
            }
          />
        ),
      },
    ],
  },
  {
    label: "Actions",
    align: "center",
    render: (row) => <AdTableAction row={row} />,
  },
];

interface AdTableProps {
  ads: Ads;
  isLoading?: boolean;
}

export const AdTable: React.FC<AdTableProps> = ({ ads, isLoading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const adsData =
    rowsPerPage > 0
      ? ads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : ads;

  return (
    <Box data-testid="ad-table">
      <Typography variant="body1" fontWeight="bold" mb={5} mt={7} mx={1}>
        Ad List
      </Typography>
      <Card>
        <CardContent>
          <Table
            data={adsData || []}
            columns={columns}
            page={page}
            rowsPerPage={rowsPerPage}
            totalCount={ads.length || 0}
            loading={isLoading}
            onPageChange={(page) => setPage(page)}
            onRowsPerPageChange={(rowsPerPage) => setRowsPerPage(rowsPerPage)}
            tableRowSx={(row, theme) => ({
              backgroundColor: row.isFulfilled
                ? alpha(theme.palette.success.main, 0.1)
                : alpha(theme.palette.error.main, 0.1),
            })}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
