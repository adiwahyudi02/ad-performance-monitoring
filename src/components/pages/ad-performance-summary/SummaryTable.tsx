"use client";

import { alpha, Card, CardContent } from "@mui/material";
import { Summary } from "@/api/schemas/summary.schemas";
import React, { useMemo } from "react";
import { Column, Table } from "@/components/ui/table";
import { KpiColumn } from "../ad-performance-summary/KpiColumn";
import { formatPercentagePostfix } from "@/utils/percentage.utils";
import { formatThousandsSeparator } from "@/utils/separator.utils";
import { formatDate } from "@/utils/date.utils";
import SummaryTableAction from "./SummaryTableAction";
import { useSummaryContext } from "@/contexts/summary.context";
import { KpiTypes } from "@/types/kpi";

const generateColumns = (kpi: KpiTypes): Column<Summary>[] => {
  const baseColumns: Column<Summary>[] = [
    { label: "Client", key: "name" },
    {
      label: "Date",
      children: [
        {
          label: "Start",
          render: (row) =>
            formatDate(row.startDate, "DD/MM/YYYY", "YYYY-MM-DD"),
        },
        {
          label: "End",
          render: (row) => formatDate(row.endDate, "DD/MM/YYYY", "YYYY-MM-DD"),
        },
      ],
    },
  ];

  const kpiColumns: Column<Summary>[] = [];

  if (kpi === "ctr" || kpi === "") {
    kpiColumns.push({
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
    });
  }

  if (kpi === "impression" || kpi === "") {
    kpiColumns.push({
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
    });
  }

  if (kpi === "conversionRate" || kpi === "") {
    kpiColumns.push({
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
    });
  }

  const actionColumn: Column<Summary> = {
    label: "Actions",
    align: "center",
    render: (row) => <SummaryTableAction row={row} />,
  };

  return [...baseColumns, ...kpiColumns, actionColumn];
};

export const SummaryTable: React.FC = () => {
  const {
    summaries,
    filterState: { kpi, page, rowsPerPage },
    totalCount,
    isLoading,
    onChangeFilter,
  } = useSummaryContext();

  const columns = useMemo(() => generateColumns(kpi), [kpi]);

  return (
    <Card>
      <CardContent>
        <Table
          data={summaries}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          onPageChange={(newPage) => onChangeFilter("page", newPage)}
          onRowsPerPageChange={(newRowsPerPage) =>
            onChangeFilter("rowsPerPage", newRowsPerPage)
          }
          loading={isLoading}
          tableRowSx={(row, theme) => ({
            backgroundColor: row.isFulfilled
              ? alpha(theme.palette.success.main, 0.1)
              : alpha(theme.palette.error.main, 0.1),
          })}
        />
      </CardContent>
    </Card>
  );
};
