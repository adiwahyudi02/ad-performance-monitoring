"use client";

import React from "react";
import { Box, BoxProps, Container } from "@mui/material";
import {
  DashboardProvider,
  useDashboardContext,
} from "@/contexts/dashboard.context";
import { SideBar } from "./sidebar";
import { NavBar } from "./navbar";

export const DashboardLayoutComponent: React.FC<BoxProps> = ({
  children,
  ...props
}) => {
  const { sidebarWidth } = useDashboardContext();

  return (
    <Box
      display="flex"
      flexGrow={1}
      width="100%"
      data-testid="content"
      {...props}
    >
      <SideBar />
      <Box
        width={{ md: `calc(100% - ${sidebarWidth})`, xs: "100%" }}
        display="flex"
        flexDirection="column"
        flexGrow={1}
      >
        <NavBar />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            width: "100%",
            py: 4,
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export const DasboardLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <DashboardProvider>
      <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
    </DashboardProvider>
  );
};
