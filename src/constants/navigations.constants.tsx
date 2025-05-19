import React from "react";
import TableChartIcon from "@mui/icons-material/TableChart";
import BugReportIcon from "@mui/icons-material/BugReport";

export const navigationItems = [
  {
    label: "Ad Summary",
    href: "/ad-performance-summary",
    icon: <TableChartIcon />,
  },
  {
    label: "Event Tracking",
    href: "/event-tracking",
    icon: <BugReportIcon />,
  },
];
