import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, Control, FieldValues } from "react-hook-form";
import { SelectField, SelectFieldProps } from ".";

interface FormData extends FieldValues {
  testSelect: string;
}

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const TestForm = (props: Partial<SelectFieldProps<FormData>>) => {
  const { control } = useForm<FormData>({
    defaultValues: {
      testSelect: "",
    },
  });

  return (
    <SelectField
      name="testSelect"
      label="Test Select"
      control={control as Control<FormData>}
      options={options}
      {...props}
    />
  );
};

const renderComponent = (props: Partial<SelectFieldProps<FormData>> = {}) => {
  return render(<TestForm {...props} />);
};

describe("SelectField", () => {
  it("renders the SelectField component", () => {
    renderComponent();
    expect(screen.getByText("Test Select")).toBeInTheDocument();
  });

  it("displays the options correctly", () => {
    renderComponent();
    const selectInput = screen.getByRole("combobox");
    fireEvent.mouseDown(selectInput); // Open the dropdown

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("selects an option correctly", () => {
    renderComponent();
    const selectInput = screen.getByRole("combobox");
    fireEvent.mouseDown(selectInput); // Open the dropdown
    fireEvent.click(screen.getByText("Option 2"));

    // MUI updates the display value in the role="combobox" element
    expect(selectInput).toHaveTextContent("Option 2");
  });

  it("displays the label correctly", () => {
    renderComponent({ label: "Custom Label" });
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("handles required prop correctly", () => {
    renderComponent({ required: true });
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
