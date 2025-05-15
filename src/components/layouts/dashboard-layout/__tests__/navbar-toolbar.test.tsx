import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDashboardContext } from "@/contexts/dashboard.context";
import { NavbarToolbar } from "../navbar-toolbar";
import { useToast } from "@/contexts/toast.context";

// Mock the Dashboard Context
jest.mock("@/contexts/dashboard.context", () => ({
  useDashboardContext: jest.fn(),
}));

jest.mock("@/contexts/toast.context", () => ({
  useToast: jest.fn(),
  ToastProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("NavbarToolbar", () => {
  const mockToggleSidebar = jest.fn();

  beforeEach(() => {
    (useDashboardContext as jest.Mock).mockReturnValue({
      toggleSidebar: mockToggleSidebar,
      isMobile: false,
    });

    (useToast as jest.Mock).mockReturnValue({
      showToast: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders ThemeModeSwitch and UserToolbar", () => {
    render(<NavbarToolbar />);
    expect(screen.getByTestId("user-toolbar")).toBeInTheDocument();
  });

  it("renders IconButtonRounded when isMobile is true", () => {
    (useDashboardContext as jest.Mock).mockReturnValue({
      toggleSidebar: mockToggleSidebar,
      isMobile: true,
    });

    render(<NavbarToolbar />);

    expect(
      screen.getByRole("button", { name: "Toggle side navigation" })
    ).toBeInTheDocument();
  });

  it("does not render IconButtonRounded when isMobile is false", () => {
    render(<NavbarToolbar />);

    expect(
      screen.queryByRole("button", { name: "Toggle side navigation" })
    ).not.toBeInTheDocument();
  });

  it("calls toggleSidebar when IconButtonRounded is clicked", () => {
    (useDashboardContext as jest.Mock).mockReturnValue({
      toggleSidebar: mockToggleSidebar,
      isMobile: true,
    });

    render(<NavbarToolbar />);

    const button = screen.getByRole("button", {
      name: "Toggle side navigation",
    });
    fireEvent.click(button);

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });
});
