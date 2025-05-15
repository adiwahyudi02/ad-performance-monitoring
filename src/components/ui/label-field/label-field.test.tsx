import React from "react";
import { render, screen } from "@testing-library/react";
import LabelField from ".";

describe("LabelField Component", () => {
  it("renders the label text", () => {
    render(<LabelField label="Test Label" htmlFor="test-input" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("displays an asterisk when required is true", () => {
    render(<LabelField label="Required Label" htmlFor="test-input" required />);

    // Ensure the asterisk (*) is present
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveStyle({ color: "rgb(211, 47, 47)" }); // MUI error.main color
  });

  it("does not display an asterisk when required is false", () => {
    render(<LabelField label="Optional Label" htmlFor="test-input" />);

    // Ensure the asterisk (*) is not present
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });
});
