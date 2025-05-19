import React from "react";
import { render, screen, act } from "@testing-library/react";

import { getItem, setItem } from "@/utils/localstorage.utils";
import {
  EventTrackingProvider,
  useEventTrackingContext,
} from "../event-tracking.context";

jest.mock("@/utils/localstorage.utils", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockedGetItem = getItem as jest.Mock;
const mockedSetItem = setItem as jest.Mock;

const TestComponent = () => {
  const { userEvents, addEventTracking } = useEventTrackingContext();

  return (
    <div>
      <div data-testid="events-count">{userEvents.length}</div>
      <button
        data-testid="add-event-btn"
        onClick={() =>
          addEventTracking({
            type: "filter",
            value: { value: "test" },
            timestamp: new Date("2025-01-01T12:00:00Z").getTime(),
          })
        }
      >
        Add Event
      </button>
      <div data-testid="first-event-timestamp">
        {userEvents.length > 0 ? userEvents[0].timestamp : ""}
      </div>
    </div>
  );
};

describe("EventTrackingProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("loads and sorts events from localStorage on mount", () => {
    mockedGetItem.mockReturnValue([
      { type: "click", value: "older", timestamp: "2024-01-01T12:00:00Z" },
      { type: "click", value: "newer", timestamp: "2025-01-01T12:00:00Z" },
    ]);

    render(
      <EventTrackingProvider>
        <TestComponent />
      </EventTrackingProvider>
    );

    expect(screen.getByTestId("events-count").textContent).toBe("2");
    // Check if first event is the newer one (sorted descending)
    expect(screen.getByTestId("first-event-timestamp").textContent).toBe(
      "2025-01-01T12:00:00Z"
    );
  });

  test("adds a new event and saves to localStorage", () => {
    mockedGetItem.mockReturnValue([]);

    render(
      <EventTrackingProvider>
        <TestComponent />
      </EventTrackingProvider>
    );

    expect(screen.getByTestId("events-count").textContent).toBe("0");

    act(() => {
      screen.getByTestId("add-event-btn").click();
    });

    expect(screen.getByTestId("events-count").textContent).toBe("1");

    expect(mockedSetItem).toHaveBeenCalledTimes(1);
    const savedEvents = mockedSetItem.mock.calls[0][1];
    expect(savedEvents.length).toBe(1);
    expect(savedEvents[0].value).toStrictEqual({ value: "test" });
  });

  test("throws error when useEventTrackingContext used outside provider", () => {
    const consoleError = console.error;
    console.error = jest.fn(); // suppress error output

    const BrokenComponent = () => {
      useEventTrackingContext();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      "useEventTrackingContext must be used within an EventTrackingProvider"
    );

    console.error = consoleError;
  });
});
