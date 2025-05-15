"use client";

import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Summary } from "@/api/schemas/summary.schemas";
import Link from "next/link";

interface SummaryTableActionProps {
  row: Summary;
}

export default function SummaryTableAction({ row }: SummaryTableActionProps) {
  return (
    <Tooltip title="More Detail">
      <IconButton
        component={Link}
        href={`/ad-performance-summary/detail/${row.id}`}
      >
        <ArrowForwardIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
}
