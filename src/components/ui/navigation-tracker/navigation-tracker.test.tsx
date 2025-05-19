import React from "react";
import { render } from "@testing-library/react";
import { NavigationTracker } from ".";

// Create variables to hold our mock implementations that we can update in tests
const mockUsePathname = jest.fn();
const mockAddEventTracking = jest.fn();

// Mock next/navigation module
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock event tracking context
jest.mock("@/contexts/event-tracking.context", () => ({
  useEventTrackingContext: () => ({
    addEventTracking: mockAddEventTracking,
  }),
}));

describe("NavigationTracker Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls addEventTracking on pathname change", () => {
    // Initial pathname
    mockUsePathname.mockReturnValueOnce("/page1");

    const { rerender } = render(<NavigationTracker />);
    // On first render, no event is tracked
    expect(mockAddEventTracking).not.toHaveBeenCalled();

    // Change pathname to simulate navigation
    mockUsePathname.mockReturnValueOnce("/page2");
    rerender(<NavigationTracker />);

    expect(mockAddEventTracking).toHaveBeenCalledTimes(1);
    const calledWith = mockAddEventTracking.mock.calls[0][0];

    expect(calledWith.type).toBe("navigation");
    expect(calledWith.value).toEqual({
      from: "/page1",
      to: "/page2",
    });
    expect(typeof calledWith.timestamp).toBe("number");
  });

  it("does not call addEventTracking if pathname does not change", () => {
    mockUsePathname.mockReturnValue("/same-page");

    const { rerender } = render(<NavigationTracker />);
    rerender(<NavigationTracker />);

    expect(mockAddEventTracking).not.toHaveBeenCalled();
  });
});
