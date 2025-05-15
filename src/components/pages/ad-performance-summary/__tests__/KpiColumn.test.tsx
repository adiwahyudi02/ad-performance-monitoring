import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { KpiColumn } from "../KpiColumn";

describe("KpiColumn", () => {
  test("renders '-' inside Tooltip when value is null", async () => {
    render(<KpiColumn type="actual" value={null} />);
    const trigger = screen.getByText("-");
    expect(trigger).toBeInTheDocument();

    fireEvent.mouseOver(trigger);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent(
        "This KPI is not defined"
      );
    });

    fireEvent.mouseOut(trigger);
  });

  test("renders '-' inside Tooltip when value is undefined", async () => {
    render(<KpiColumn type="actual" value={undefined} />);
    const trigger = screen.getByText("-");
    expect(trigger).toBeInTheDocument();

    fireEvent.mouseOver(trigger);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent(
        "This KPI is not defined"
      );
    });

    fireEvent.mouseOut(trigger);
  });

  test("renders a Chip with 'info' color and 'Target' tooltip when type is 'target'", async () => {
    render(<KpiColumn type="target" value={123} />);
    const chip = screen.getByText("123");
    expect(chip).toBeInTheDocument();

    fireEvent.mouseOver(chip);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("Target");
    });

    fireEvent.mouseOut(chip);
  });

  test("renders a Chip with 'error' color and 'Not Fulfilled' tooltip when isNotFulfilled is true", async () => {
    render(<KpiColumn type="actual" value={456} isNotFulfilled />);
    const chip = screen.getByText("456");
    expect(chip).toBeInTheDocument();

    fireEvent.mouseOver(chip);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("Not Fulfilled");
    });

    fireEvent.mouseOut(chip);
  });

  test("renders a Chip with 'success' color and 'Fulfiled' tooltip when isNotFulfilled is false or undefined", async () => {
    render(<KpiColumn type="actual" value={789} />);
    const chip = screen.getByText("789");
    expect(chip).toBeInTheDocument();

    fireEvent.mouseOver(chip);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("Fulfiled");
    });

    fireEvent.mouseOut(chip);
  });
});
