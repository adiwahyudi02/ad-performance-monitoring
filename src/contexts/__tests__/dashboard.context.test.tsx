import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { DashboardProvider, useDashboardContext } from "../dashboard.context";
import { APP_SIDEBAR_WIDTH } from "@/constants/app.constants";

// A test component to consume the context
const TestComponent = () => {
  const { isSidebarOpen, sidebarWidth, isMobile, toggleSidebar } =
    useDashboardContext();

  return (
    <div>
      <p data-testid="sidebar-status">
        Sidebar is {isSidebarOpen ? "open" : "closed"}
      </p>
      <p data-testid="sidebar-width">{sidebarWidth}</p>
      <p data-testid="is-mobile">{isMobile ? "true" : "false"}</p>
      <button data-testid="toggle-button" onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
    </div>
  );
};

describe("DashboardProvider", () => {
  it("provides default values", () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    expect(screen.getByTestId("sidebar-status")).toHaveTextContent(
      "Sidebar is closed"
    );
    expect(screen.getByTestId("sidebar-width")).toHaveTextContent(
      APP_SIDEBAR_WIDTH
    );
  });

  it("toggles sidebar state when button is clicked", () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    const button = screen.getByTestId("toggle-button");

    // Click the button to open sidebar
    fireEvent.click(button);
    expect(screen.getByTestId("sidebar-status")).toHaveTextContent(
      "Sidebar is open"
    );

    // Click again to close sidebar
    fireEvent.click(button);
    expect(screen.getByTestId("sidebar-status")).toHaveTextContent(
      "Sidebar is closed"
    );
  });
});
