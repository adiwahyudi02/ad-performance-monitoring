import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { useDashboardContext } from "@/contexts/dashboard.context";
import { navigationItems } from "@/constants/navigations.constants";
import { SideBar } from "../sidebar";
import { useToast } from "@/contexts/toast.context";

// Mocking dependencies
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/contexts/dashboard.context", () => ({
  useDashboardContext: jest.fn(),
}));

jest.mock("@/contexts/toast.context", () => ({
  useToast: jest.fn(),
  ToastProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("SideBar", () => {
  beforeEach(() => {
    (useDashboardContext as jest.Mock).mockReturnValue({
      sidebarWidth: 240,
      isMobile: false,
      isSidebarOpen: true,
      toggleSidebar: jest.fn(),
    });

    (useToast as jest.Mock).mockReturnValue({
      showToast: jest.fn(),
    });

    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("renders the logo and title", () => {
    render(<SideBar />);
    expect(screen.getByAltText("logo of the app")).toBeInTheDocument();
    expect(screen.getByText("Ad Performance Monitoring")).toBeInTheDocument();
  });

  it("renders the navigation items", () => {
    render(<SideBar />);
    navigationItems.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("toggles sidebar on menu item click in mobile view", () => {
    const toggleSidebar = jest.fn();
    (useDashboardContext as jest.Mock).mockReturnValue({
      sidebarWidth: 240,
      isMobile: true,
      isSidebarOpen: true,
      toggleSidebar,
    });

    render(<SideBar />);
    const firstNavItem = screen.getByText(navigationItems[0].label);
    fireEvent.click(firstNavItem);
    expect(toggleSidebar).toHaveBeenCalled();
  });

  it("closes the sidebar when close button is clicked in mobile view", () => {
    const toggleSidebar = jest.fn();
    (useDashboardContext as jest.Mock).mockReturnValue({
      sidebarWidth: 240,
      isMobile: true,
      isSidebarOpen: true,
      toggleSidebar,
    });

    render(<SideBar />);
    const closeButton = screen.getByTestId("close-sidebar");
    fireEvent.click(closeButton);
    expect(toggleSidebar).toHaveBeenCalled();
  });
});
