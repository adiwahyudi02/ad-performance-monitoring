"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  ChipOwnProps,
  Divider,
  Typography,
} from "@mui/material";
import { Summary } from "@/api/schemas/summary.schemas";
import { formatDate } from "@/utils/date.utils";
import { formatToRupiah } from "@/utils/currency.utils";

interface ContractDetailProps {
  data?: Summary;
}

export const ContractDetail: React.FC<ContractDetailProps> = ({ data }) => {
  let colorChipStatus = "";

  if (data?.contract.contractStatus === "Active") {
    colorChipStatus = "info";
  } else if (data?.contract.contractStatus === "Completed") {
    colorChipStatus = "success";
  } else if (data?.contract.contractStatus === "Pending") {
    colorChipStatus = "warning";
  } else if (data?.contract.contractStatus === "Cancelled") {
    colorChipStatus = "error";
  } else {
    colorChipStatus = "default";
  }

  return (
    <Card sx={{ borderRadius: 8, minWidth: "50%" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1" fontWeight="bold">
            Contract Detail
          </Typography>
          <Box>
            {data?.contract.contractStatus && (
              <Chip
                label={data?.contract.contractStatus}
                color={colorChipStatus as ChipOwnProps["color"]}
              />
            )}
          </Box>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {formatDate(data?.startDate ?? null, "DD MMMM YYYY")} -{" "}
            {formatDate(data?.endDate ?? null, "DD MMMM YYYY")}
          </Typography>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" fontWeight="bold">
            Contract ID
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.contract.contractId}
          </Typography>
        </Box>
        <Divider sx={{ my: 1.5 }} />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" fontWeight="bold">
            Total Budget
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatToRupiah(data?.contract.totalBudget ?? 0)}
          </Typography>
        </Box>
        <Divider sx={{ my: 1.5 }} />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" fontWeight="bold">
            Payment Terms
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.contract.paymentTerms}
          </Typography>
        </Box>
        <Divider sx={{ my: 1.5 }} />
      </CardContent>
    </Card>
  );
};
