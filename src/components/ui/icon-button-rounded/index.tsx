import React from "react";
import { IconButton, IconButtonProps } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const IconButtonRounded = ({ sx, ...props }: IconButtonProps) => {
  return (
    <IconButton
      sx={[
        {
          bgcolor: "grey.200",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "divider",
          ...(sx as SystemStyleObject),
        },
        (theme) =>
          theme.applyStyles("dark", {
            bgcolor: "grey.800",
          }),
      ]}
      {...props}
    />
  );
};
