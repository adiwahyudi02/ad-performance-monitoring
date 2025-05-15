import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { TextField } from ".";

describe("TextField Component", () => {
  const TestComponent = ({ defaultValue = "", ...props }) => {
    const { control } = useForm({
      defaultValues: { testField: defaultValue },
    });

    return (
      <TextField
        name="testField"
        label="Test Label"
        control={control}
        {...props}
      />
    );
  };

  it("renders the text field with label", () => {
    render(<TestComponent />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("updates the input value when changed", () => {
    render(<TestComponent />);

    const input = screen.getByLabelText("Test Label") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input).toHaveValue("Hello");
  });

  it("applies a prefix correctly", () => {
    render(<TestComponent prefix="$" />);

    const input = screen.getByLabelText("Test Label") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "100" } });
    expect(input).toHaveValue("$100");
  });

  it("removes invalid characters when regex is provided", () => {
    render(<TestComponent regex={/[^0-9]/g} />);

    const input = screen.getByLabelText("Test Label") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "ABC123" } });
    expect(input).toHaveValue("123");
  });

  it("shows an error when validation fails", () => {
    render(<TestComponent helperText="This field is required" />);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
