import React from "react";
import { ChipProps, Tooltip, Chip, Typography } from "@mui/material";

export interface KpiColumnProps extends ChipProps {
  type: "actual" | "target";
  value: string | number | null | undefined;
  isNotFulfilled?: boolean;
}

export const KpiColumn: React.FC<KpiColumnProps> = ({
  type,
  value,
  isNotFulfilled,
  ...props
}) => {
  if (value === null || value === undefined) {
    return (
      <Tooltip title="This KPI is not defined">
        <Typography>-</Typography>
      </Tooltip>
    );
  }

  return (
    <Tooltip
      title={
        type === "target"
          ? "Target"
          : isNotFulfilled
          ? "Not Fulfilled"
          : "Fulfiled"
      }
    >
      <Chip
        label={value}
        color={
          type === "target" ? "info" : isNotFulfilled ? "error" : "success"
        }
        {...props}
      />
    </Tooltip>
  );
};
