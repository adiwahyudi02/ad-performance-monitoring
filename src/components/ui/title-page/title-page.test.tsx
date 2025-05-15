import React from "react";
import { render, screen } from "@testing-library/react";
import { TitlePage } from ".";

describe("TitlePage Component", () => {
  it("renders the TitlePage component with provided text", () => {
    render(<TitlePage>Test TitlePage</TitlePage>);

    const titlePageElement = screen.getByText("Test TitlePage");
    expect(titlePageElement).toBeInTheDocument();
  });

  it("applies the default typography styles", () => {
    render(<TitlePage>Styled TitlePage</TitlePage>);

    const titlePageElement = screen.getByText("Styled TitlePage");

    expect(titlePageElement).toHaveStyle({
      fontSize: "1.625rem",
      fontWeight: "700",
    });
  });
});
