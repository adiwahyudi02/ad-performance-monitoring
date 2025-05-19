"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import { Column, Table } from "@/components/ui/table";
import { UserEvent } from "@/types/event-tracking";
import { useEventTrackingContext } from "@/contexts/event-tracking.context";
import { formatDate } from "@/utils/date.utils";

const columns: Column<UserEvent>[] = [
  {
    label: "Timestamp",
    key: "timestamp",
    align: "left",
    render: (row) => formatDate(row.timestamp, "MMM D, YYYY h:mm A"),
  },
  { label: "Type", key: "type" },
  {
    label: "Value",
    key: "value",
    render: (row) => (
      <Box sx={{ bgcolor: "divider", p: 1, borderRadius: 1 }}>
        <Typography variant="caption">
          <pre>{JSON.stringify(row.value, null, 2)}</pre>
        </Typography>
      </Box>
    ),
    align: "left",
  },
];

export const EventTrackingTable = () => {
  const { userEvents } = useEventTrackingContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const userEventsData =
    rowsPerPage > 0
      ? userEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : userEvents;

  return (
    <Box data-testid="event-tracking-table">
      <Card>
        <CardContent>
          <Table
            data={userEventsData || []}
            columns={columns}
            page={page}
            rowsPerPage={rowsPerPage}
            totalCount={userEvents.length || 0}
            onPageChange={(page) => setPage(page)}
            onRowsPerPageChange={(rowsPerPage) => setRowsPerPage(rowsPerPage)}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
