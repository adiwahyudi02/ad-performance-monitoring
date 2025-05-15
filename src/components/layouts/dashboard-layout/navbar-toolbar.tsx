import React from "react";
import { Box } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { IconButtonRounded } from "@/components/ui/icon-button-rounded";
import { useDashboardContext } from "@/contexts/dashboard.context";
import { ThemeSwitchToolbar } from "@/components/ui/toolbar/theme-switch-toolbar";
import { UserToolbar } from "@/components/ui/toolbar/user-toolbar";

export const NavbarToolbar: React.FC = () => {
  const { toggleSidebar, isMobile } = useDashboardContext();

  return (
    <>
      {isMobile && (
        <IconButtonRounded
          color="inherit"
          aria-label="Toggle side navigation"
          onClick={toggleSidebar}
        >
          <Menu />
        </IconButtonRounded>
      )}

      <Box ml="auto" display="flex" alignItems="center">
        <ThemeSwitchToolbar sx={{ mr: 1 }} />
        <UserToolbar />
      </Box>
    </>
  );
};
