"use client";

import React from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ClearIcon } from "@mui/x-date-pickers";
import { SelectField } from "@/components/ui/select-field";
import { DateField } from "@/components/ui/date-field";
import { TextField } from "@/components/ui/text-field";
import { useSummaryContext } from "@/contexts/summary.context";
import { KpiTypes } from "@/types/kpi";

export const kpiTypes = [
  { value: "ctr", label: "CTR" },
  { value: "impression", label: "Impression" },
  { value: "conversionRate", label: "Conversion Rate" },
];

export const SummaryFilter: React.FC = () => {
  const {
    filterState: { search, kpi, startDate, endDate, status },
    onChangeFilter,
    onToggleStatus,
  } = useSummaryContext();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="start"
      flexWrap="wrap"
      gap={2}
    >
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        sx={{ justifyContent: { xs: "space-between", md: "start" } }}
      >
        {/* search */}
        <Box sx={{ width: { xs: "100%", md: "15rem" } }}>
          <TextField
            name="search"
            placeholder="Search by client name"
            value={search}
            onChange={(e) => onChangeFilter("search", e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <InputAdornment
                    position="end"
                    sx={{ cursor: "pointer" }}
                    onClick={() => onChangeFilter("search", "")}
                    data-testid="clear-icon"
                  >
                    <ClearIcon />
                  </InputAdornment>
                ) : null,
              },
            }}
            autoComplete="off"
            isGhostVariant
          />
        </Box>

        {/* kpi */}
        <Box sx={{ width: { xs: "100%", md: "12rem" } }}>
          <SelectField
            name="kpi"
            placeholder="All KPIs"
            options={[{ value: "", label: "All KPIs" }, ...kpiTypes]}
            value={kpi}
            onChange={(e) => onChangeFilter("kpi", e.target.value as KpiTypes)}
            required
            isGhostVariant
          />
        </Box>

        {/* date */}
        <Box
          display="flex"
          alignItems="center"
          flex={1}
          width={{ xs: "100%", md: "fit-content" }}
          justifyContent={{ xs: "space-between", md: "start" }}
          flexWrap={{ xs: "wrap", md: "nowrap" }}
          gap={{ xs: 0, md: 2 }}
        >
          <Box sx={{ width: { xs: "40%", md: "11rem" } }}>
            <DateField
              name="startDate"
              value={startDate}
              onChange={(newDate) => onChangeFilter("startDate", newDate)}
              isGhostVariant
              required
            />
          </Box>
          <Typography variant="h5" fontWeight="bold">
            -
          </Typography>
          <Box sx={{ width: { xs: "40%", md: "11rem" } }}>
            <DateField
              name="endDate"
              value={endDate}
              onChange={(newDate) => onChangeFilter("endDate", newDate)}
              isGhostVariant
              required
            />
          </Box>
        </Box>
      </Box>

      {/* status */}
      <Card
        sx={{
          mb: 2,
          borderRadius: "12rem",
          width: "fit-content",
          padding: 1,
          boxShadow: "none",
          border: "1px solid transparent",
          ":hover": {
            borderColor: "text.primary",
          },
        }}
      >
        <Box display="flex" gap={1}>
          <Button
            sx={{ borderRadius: "12rem", mx: 0 }}
            onClick={() => onToggleStatus("fulfilled")}
            data-testid="fulfilled-button"
          >
            <Chip
              label="Fulfilled"
              color={status.includes("fulfilled") ? "success" : "default"}
            />
          </Button>
          <Button
            sx={{ borderRadius: "12rem", mx: 0 }}
            onClick={() => onToggleStatus("not-fulfilled")}
            data-testid="not-fulfilled-button"
          >
            <Chip
              label="Not Fulfilled"
              color={status.includes("not-fulfilled") ? "error" : "default"}
            />
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
