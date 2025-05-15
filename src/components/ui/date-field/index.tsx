import React from "react";
import { FormControl, IconButton, InputAdornment } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Control, FieldValues, Path } from "react-hook-form";
import LabelField from "../label-field";
import dayjs, { Dayjs } from "dayjs";
import { ControllerReactHookForm } from "../controller-react-hook-form";
import { ClearIcon, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateFieldProps<T extends FieldValues> {
  name: Path<T>;
  control?: Control<T>;
  label?: string;
  required?: boolean;
  format?: string;
  helperText?: string;
  value?: string;
  isGhostVariant?: boolean;
  onChange?: (value: string) => void;
}

export const DateField = <T extends FieldValues>({
  name,
  label,
  control,
  required,
  format = "DD/MM/YYYY",
  helperText,
  value: propValue,
  isGhostVariant,
  onChange: propOnChange,
}: DateFieldProps<T>) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ControllerReactHookForm
      name={name}
      control={control}
      render={(
        { onChange: rhfOnChange, value: rhfValue, ...fieldProps },
        { fieldState }
      ) => {
        const handleChange = (date: Dayjs | null) => {
          const formattedDate = date?.format(format) || "";
          if (rhfOnChange) rhfOnChange(formattedDate); // react-hook-form onChange
          if (propOnChange) propOnChange(formattedDate); // prop onChange
        };

        const currentValue = propValue ?? rhfValue ?? ""; // Priority: propValue > rhfValue > ""

        return (
          <FormControl fullWidth error={!!fieldState?.error}>
            {label && (
              <LabelField label={label} htmlFor={name} required={required} />
            )}
            <DatePicker
              value={currentValue ? dayjs(currentValue, format) : null}
              onChange={handleChange}
              slotProps={{
                textField: {
                  variant: "outlined",
                  error: !!fieldState?.error,
                  helperText: fieldState?.error?.message || helperText,
                  fullWidth: true,
                  inputProps: {
                    "data-testid": name,
                  },
                  InputProps: {
                    ...(currentValue && {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => handleChange(null)}
                            edge="end"
                            sx={{ marginRight: "-0.75rem", padding: "0.5rem" }}
                          >
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }),
                  },
                  id: name,
                  sx: {
                    "& .MuiPickersSectionList-root": {
                      width: "100%",
                    },
                    ...(isGhostVariant && {
                      "& .MuiInputBase-root": {
                        borderRadius: "0.625rem",
                        backgroundColor: "background.paper",
                        backgroundImage: "var(--mui-overlays-4)",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                    }),
                  },
                  ...fieldProps,
                },
              }}
              format={format}
            />
          </FormControl>
        );
      }}
    />
  </LocalizationProvider>
);
