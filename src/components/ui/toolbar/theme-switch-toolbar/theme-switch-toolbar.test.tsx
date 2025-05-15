import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useColorScheme } from "@mui/material";
import { ThemeSwitchToolbar } from ".";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useColorScheme: jest.fn(),
}));

describe("ThemeSwitchToolbar", () => {
  it("renders and toggles from light to dark mode", () => {
    const setMode = jest.fn();
    (useColorScheme as jest.Mock).mockReturnValue({
      mode: "light",
      setMode,
    });

    render(<ThemeSwitchToolbar />);

    const switchInput = screen.getByRole("checkbox");
    expect(switchInput).not.toBeChecked();

    // Simulate a toggle
    fireEvent.click(switchInput);

    expect(setMode).toHaveBeenCalledWith("dark");
  });

  it("renders and toggles from dark to light mode", () => {
    const setMode = jest.fn();
    (useColorScheme as jest.Mock).mockReturnValue({
      mode: "dark",
      setMode,
    });

    render(<ThemeSwitchToolbar />);

    const switchInput = screen.getByRole("checkbox");
    expect(switchInput).toBeChecked();

    // Simulate a toggle
    fireEvent.click(switchInput);

    expect(setMode).toHaveBeenCalledWith("light");
  });

  it("returns null if mode is not available", () => {
    (useColorScheme as jest.Mock).mockReturnValue({
      mode: undefined,
      setMode: jest.fn(),
    });

    const { container } = render(<ThemeSwitchToolbar />);

    expect(container.firstChild).toBeNull();
  });
});
