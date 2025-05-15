import React from "react";
import { render, screen } from "@testing-library/react";
import { DasboardLayout } from "..";
import { useToast } from "@/contexts/toast.context";

// Mocking the context used in DashboardLayoutComponent
jest.mock("@/contexts/dashboard.context", () => ({
  useDashboardContext: jest.fn().mockReturnValue({
    sidebarWidth: "17rem",
  }),
  DashboardProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/contexts/toast.context", () => ({
  useToast: jest.fn(),
  ToastProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("DasboardLayout", () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      showToast: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("wraps DashboardLayoutComponent with DashboardProvider", () => {
    render(
      <DasboardLayout>
        <div>Wrapped Content</div>
      </DasboardLayout>
    );

    // Check if SideBar is present
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();

    // Check if NavBar is present
    expect(screen.getByTestId("navbar")).toBeInTheDocument();

    // Check if children are rendered in the container
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
});
