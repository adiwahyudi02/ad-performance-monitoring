"use client";

import { APP_SIDEBAR_WIDTH } from "@/constants/app.constants";
import { useColorScheme, useMediaQuery, useTheme } from "@mui/material";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface DashboardContextType {
  sidebarWidth: string;
  isSidebarOpen: boolean;
  isMobile: boolean;
  isDarkMode: boolean;
  toggleSidebar: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarWidth = APP_SIDEBAR_WIDTH;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });

  const { mode } = useColorScheme();
  const isDarkMode = mode === "dark";

  // Toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <DashboardContext.Provider
      value={{
        isSidebarOpen,
        sidebarWidth,
        isMobile,
        isDarkMode,
        toggleSidebar,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to access the dashboard context
export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
};
