import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface TitlePageProps extends TypographyProps {
  children: React.ReactNode;
}

export const TitlePage: React.FC<TitlePageProps> = ({ children, ...props }) => {
  return (
    <Typography
      variant="h1"
      fontSize="1.625rem"
      fontWeight="700"
      mb={5}
      {...props}
    >
      {children}
    </Typography>
  );
};
