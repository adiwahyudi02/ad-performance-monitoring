import React from "react";
import { render, screen } from "@testing-library/react";
import { ClientName } from "../ClientName";

describe("ClientName", () => {
  it("renders client name and fulfilled chip", () => {
    render(<ClientName name="Andrews Corp" isFulfilled={true} />);

    expect(screen.getByText("Andrews Corp")).toBeInTheDocument();
    expect(screen.getByText("Fulfilled")).toBeInTheDocument();
  });

  it("renders client name and not fulfilled chip", () => {
    render(<ClientName name="Murphy Inc" isFulfilled={false} />);

    expect(screen.getByText("Murphy Inc")).toBeInTheDocument();
    expect(screen.getByText("Not Fulfilled")).toBeInTheDocument();
  });

  it("renders with default not fulfilled chip when isFulfilled is undefined", () => {
    render(<ClientName name="Default Client" />);

    expect(screen.getByText("Default Client")).toBeInTheDocument();
    expect(screen.getByText("Not Fulfilled")).toBeInTheDocument();
  });
});
