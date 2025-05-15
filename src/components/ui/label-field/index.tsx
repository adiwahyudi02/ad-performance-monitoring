import React from "react";
import { FormLabel, Typography, FormLabelProps } from "@mui/material";

interface LabelFieldProps extends FormLabelProps {
  label: string;
  htmlFor: string;
  required?: boolean;
}

const LabelField = ({
  label,
  required,
  htmlFor,
  ...props
}: LabelFieldProps) => {
  return (
    <FormLabel htmlFor={htmlFor} {...props}>
      <Typography variant="body2" fontWeight="600" display="block" mb={1.5}>
        {label}
        {required && (
          <Typography component="span" color="error.main" ml={0.5}>
            *
          </Typography>
        )}
      </Typography>
    </FormLabel>
  );
};

export default LabelField;
