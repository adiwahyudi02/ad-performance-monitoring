import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { DateField } from ".";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

describe("DateField Component", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TestForm = ({ defaultValues = {} }: { defaultValues?: any }) => {
    const methods = useForm({ defaultValues });

    return (
      <FormProvider {...methods}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            name="date"
            label="Select Date"
            control={methods.control}
          />
        </LocalizationProvider>
      </FormProvider>
    );
  };

  it("displays the label if provided", () => {
    render(<TestForm />);
    expect(screen.getByText("Select Date")).toBeInTheDocument();
  });

  it("handles date selection correctly", () => {
    render(<TestForm />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "25/12/2024" } });

    expect(input).toHaveValue("25/12/2024");
  });

  it("shows error message if validation fails", async () => {
    const TestFormWithValidation = () => {
      const methods = useForm({
        defaultValues: { date: "" },
        mode: "onTouched",
      });

      return (
        <FormProvider {...methods}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              name="date"
              label="Select Date"
              control={methods.control}
              required
              helperText="Date is required"
            />
          </LocalizationProvider>
        </FormProvider>
      );
    };

    render(<TestFormWithValidation />);

    const input = screen.getByRole("textbox");
    fireEvent.blur(input); // Simulate user leaving the field without input

    expect(await screen.findByText("Date is required")).toBeInTheDocument();
  });
});
