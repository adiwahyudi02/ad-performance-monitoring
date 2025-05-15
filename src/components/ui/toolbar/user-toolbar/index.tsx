import React, { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Avatar, Box, Typography, Menu, MenuItem, Button } from "@mui/material";
import { useToast } from "@/contexts/toast.context";

export const UserToolbar: React.FC = () => {
  const { showToast } = useToast();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotImplemented = () => {
    handleClose();
    showToast(
      "We hear you! This feature is on the way. Stay tuned! 🚀",
      "warning"
    );
  };

  return (
    <>
      <Box display="flex" alignItems="center" data-testid="user-toolbar">
        <Button onClick={handleClick} sx={{ p: 0 }}>
          <Avatar
            src="/profile.webp"
            alt="Employee image profile"
            sx={{ width: 46, height: 46, mr: 1 }}
          />
          <Box textAlign="left" display={{ sm: "block", xs: "none" }}>
            <Typography fontWeight="600" marginBottom="-0.45rem">
              Adi Wahyudi
            </Typography>
            <Typography
              variant="caption"
              fontWeight="600"
              color="text.secondary"
            >
              Operational Team
            </Typography>
          </Box>
          <KeyboardArrowDown color="inherit" />
        </Button>
      </Box>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              width: "12rem",
              mt: 1,
            },
          },
        }}
      >
        <MenuItem onClick={handleNotImplemented}>Profile</MenuItem>
        <MenuItem onClick={handleNotImplemented}>Settings</MenuItem>
        <MenuItem sx={{ color: "error.main" }} onClick={handleNotImplemented}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
