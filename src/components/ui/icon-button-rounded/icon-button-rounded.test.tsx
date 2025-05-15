import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IconButtonRounded } from ".";
import { ThemeProvider, createTheme } from "@mui/material/styles";

describe("IconButtonRounded Component", () => {
  const theme = createTheme();

  const renderWithTheme = (ui: React.ReactElement) =>
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

  it("renders correctly", () => {
    renderWithTheme(<IconButtonRounded data-testid="icon-button" />);
    expect(screen.getByTestId("icon-button")).toBeInTheDocument();
  });

  it("applies custom styles from sx prop", () => {
    renderWithTheme(
      <IconButtonRounded data-testid="icon-button" sx={{ bgcolor: "red" }} />
    );
    const button = screen.getByTestId("icon-button");

    expect(button).toHaveStyle({ backgroundColor: "red" });
  });

  it("triggers onClick when clicked", () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <IconButtonRounded data-testid="icon-button" onClick={handleClick} />
    );
    const button = screen.getByTestId("icon-button");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
