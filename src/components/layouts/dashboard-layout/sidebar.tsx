"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboardContext } from "@/contexts/dashboard.context";
import { navigationItems } from "@/constants/navigations.constants";
import { passionOne } from "@/constants/fonts.constants";
import { APP_NAME } from "@/constants/app.constants";

export const SideBar: React.FC = () => {
  const { sidebarWidth, isMobile, isSidebarOpen, isDarkMode, toggleSidebar } =
    useDashboardContext();

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box sx={{ width: { xs: 0, md: sidebarWidth } }} data-testid="sidebar">
        <Drawer
          open={true}
          sx={{
            "& .MuiDrawer-paper": {
              width: { xs: 0, md: sidebarWidth },
              ...(!isDarkMode && { bgcolor: "background.paper" }),
              color: "white",
            },
          }}
          variant="permanent"
        />
      </Box>
    );
  }

  return (
    <Box width={{ md: sidebarWidth }} data-testid="sidebar">
      {isSidebarOpen && isMobile && (
        <IconButton
          size="small"
          sx={{
            position: "fixed",
            top: "0.5rem",
            right: "0.5rem",
            zIndex: "tooltip",
            color: "white",
          }}
        >
          <Close
            fontSize="large"
            onClick={toggleSidebar}
            data-testid="close-sidebar"
          />
        </IconButton>
      )}
      <Drawer
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: { sm: sidebarWidth, xs: "100%" },
            bgcolor: isDarkMode ? "background.paper" : "primary.main",
            color: "white",
          },
        }}
        variant={isMobile ? "temporary" : "permanent"}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
          <Box component={Link} href="/">
            <Image
              src="/logo.webp"
              alt="logo of the app"
              height={44}
              width={96}
            />
          </Box>
          <Typography fontSize="1rem" className={passionOne.className}>
            {APP_NAME}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          px={4}
          fontWeight="bold"
          textTransform="uppercase"
          mb={1}
          mt={10}
        >
          Menu
        </Typography>
        <List sx={{ display: "grid", gap: 1, px: 2 }}>
          {navigationItems.map(({ label, href, icon }) => (
            <ListItem
              key={href}
              component={Link}
              href={href}
              disablePadding
              sx={{
                borderRadius: "0.5rem",
                transition: "0.3s",
                ":hover": {
                  bgcolor: "background.paper",
                  color: "primary.main",
                },
                bgcolor: isActive(href) ? "background.paper" : "primary.main",
                color: isActive(href) ? "primary.main" : "background.paper",
                ...(isDarkMode && {
                  ":hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                  bgcolor: isActive(href) ? "primary.main" : "background.paper",
                  color: isActive(href) ? "white" : "primary.main",
                }),
              }}
              onClick={() => isMobile && toggleSidebar()}
            >
              <ListItemButton sx={{ px: 3 }}>
                <ListItemIcon
                  sx={{ minWidth: "unset", mr: 1.5, color: "inherit" }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: "600",
                        fontSize: "0.875rem",
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
