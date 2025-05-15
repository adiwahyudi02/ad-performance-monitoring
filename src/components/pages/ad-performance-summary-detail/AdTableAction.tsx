"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Tooltip,
} from "@mui/material";
import { Ad } from "@/api/schemas/summary.schemas";
import TimelineIcon from "@mui/icons-material/Timeline";
import { AdPerformancesCharts } from "./AdPerformancesCharts";
import CloseIcon from "@mui/icons-material/Close";

interface AdTableActionProps {
  row: Ad;
}

export default function AdTableAction({ row }: AdTableActionProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="See Performance">
        <IconButton onClick={handleOpen}>
          <TimelineIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", md: "70%" },
          }}
        >
          <CardHeader
            title={row.name}
            action={
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent
            sx={{
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <AdPerformancesCharts
              ctrActual={row.ctrActual}
              ctrTarget={row.ctrTarget}
              impressionActual={row.impressionActual}
              impressionTarget={row.impressionTarget}
              conversionRateActual={row.conversionRateActual}
              conversionRateTarget={row.conversionRateTarget}
              ctrHistory={row.history.ctr}
              impressionHistory={row.history.impression}
              conversionRateHistory={row.history.conversionRate}
            />
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
