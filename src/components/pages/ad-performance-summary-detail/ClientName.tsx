"use client";

import React from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";

interface ClientNameProps {
  name: string;
  isFulfilled?: boolean;
}

export const ClientName: React.FC<ClientNameProps> = ({
  name,
  isFulfilled,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 8,
        minWidth: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <ApartmentIcon fontSize="large" color="primary" />
            <Typography variant="h6" fontWeight="bold">
              {name}
            </Typography>
          </Box>

          <Box>
            <Chip
              label={isFulfilled ? "Fulfilled" : "Not Fulfilled"}
              color={isFulfilled ? "success" : "error"}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
