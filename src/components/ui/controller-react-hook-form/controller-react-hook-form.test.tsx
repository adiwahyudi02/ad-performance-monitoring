import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { ControllerReactHookForm } from ".";

describe("ControllerReactHookForm Component", () => {
  const TestComponent = () => {
    const { control, handleSubmit } = useForm<{ testField: string }>({
      defaultValues: { testField: "" },
    });

    return (
      <form onSubmit={handleSubmit(() => {})}>
        <ControllerReactHookForm
          name="testField"
          control={control}
          render={({ onChange, value, inputRef }) => (
            <input
              data-testid="test-input"
              ref={inputRef}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <button type="submit">Submit</button>
      </form>
    );
  };

  it("renders the input field correctly", () => {
    render(<TestComponent />);

    const input = screen.getByTestId("test-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("updates the input value when changed", () => {
    render(<TestComponent />);

    const input = screen.getByTestId("test-input");

    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input).toHaveValue("Hello");
  });

  it("renders without control and calls render function", () => {
    const renderMock = jest.fn().mockReturnValue(<div>Rendered</div>);

    render(
      <ControllerReactHookForm
        name="testField"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control={undefined as any}
        render={renderMock}
      />
    );

    expect(renderMock).toHaveBeenCalled();
    expect(screen.getByText("Rendered")).toBeInTheDocument();
  });
});
