import React from "react";
import { MenuItem } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { TextField, TextFieldProps } from "../text-field";

export interface SelectFieldProps<T extends FieldValues>
  extends TextFieldProps<T> {
  options: { value: string | number; label: string }[];
}

export const SelectField = <T extends FieldValues>({
  options,
  ...props
}: SelectFieldProps<T>) => {
  return (
    <TextField<T> {...props} select>
      {options.map(({ value, label }, index) => (
        <MenuItem key={`${value}-${index}`} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};
