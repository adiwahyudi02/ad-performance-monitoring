"use client";

import React, { useState, createContext, useContext } from "react";
import { Summaries } from "@/api/schemas/summary.schemas";
import { useGetSummariesQuery } from "@/hooks/queries/useGetSummariesQuery";
import { formatDate } from "@/utils/date.utils";
import { KpiTypes } from "@/types/kpi";
import { useEventTrackingContext } from "./event-tracking.context";

interface FilterState {
  search: string;
  kpi: KpiTypes;
  startDate: string;
  endDate: string;
  status: string[];
  page: number;
  rowsPerPage: number;
}

interface SummaryContextType {
  filterState: FilterState;
  summaries: Summaries;
  totalCount: number;
  isLoading: boolean;
  onChangeFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  onToggleStatus: (status: string) => void;
}

const SummaryContext = createContext<SummaryContextType | undefined>(undefined);

export const SummaryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    search: "",
    kpi: "",
    startDate: "",
    endDate: "",
    status: ["fulfilled", "not-fulfilled"],
    page: 0,
    rowsPerPage: 5,
  });

  const { addEventTracking } = useEventTrackingContext();

  const mapStatusToIsFulfilled = (status: string[]): boolean | undefined => {
    if (status.length === 0 || status.length === 2) return undefined;
    return status.includes("fulfilled") ? true : false;
  };

  const { data: response, isLoading } = useGetSummariesQuery({
    _page: filterState.page + 1,
    _limit: filterState.rowsPerPage,
    name_like: filterState.search,
    startDate_gte: formatDate(
      filterState.startDate,
      "YYYY-MM-DD",
      "DD/MM/YYYY"
    ),
    endDate_lte: formatDate(filterState.endDate, "YYYY-MM-DD", "DD/MM/YYYY"),
    isFulfilled: mapStatusToIsFulfilled(filterState.status),
    [`${filterState.kpi}Target_ne`]: "null",
  });

  const summaries = response?.data || [];
  const totalCount = response?.meta.totalCount || 0;

  const onChangeFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilterState((prev) => {
      const newState = {
        ...prev,
        page: key === "page" || key === "rowsPerPage" ? prev.page : 0,
        [key]: value,
      };

      // Track event
      addEventTracking({
        type: "filter",
        timestamp: Date.now(),
        value: {
          key,
          value,
          previousValue: prev[key],
        },
      });

      return newState;
    });
  };

  const onToggleStatus = (statusValue: string) => {
    setFilterState((prev) => {
      const updatedStatus = prev.status.includes(statusValue)
        ? prev.status.filter((s) => s !== statusValue)
        : [...prev.status, statusValue];

      // Track event
      addEventTracking({
        type: "filter",
        timestamp: Date.now(),
        value: {
          key: "status",
          value: updatedStatus,
          previousValue: prev.status,
        },
      });

      return {
        ...prev,
        page: 0,
        status: updatedStatus,
      };
    });
  };

  return (
    <SummaryContext.Provider
      value={{
        filterState,
        summaries,
        totalCount,
        isLoading,
        onChangeFilter,
        onToggleStatus,
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};

export const useSummaryContext = () => {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error("useSummaryContext must be used within a SummaryProvider");
  }
  return context;
};
