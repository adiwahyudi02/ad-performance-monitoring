import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { ToastProvider, useToast } from "../toast.context";

const TestComponent = () => {
  const { showToast } = useToast();
  return (
    <button onClick={() => showToast("Test message", "success")}>
      Show Toast
    </button>
  );
};

describe("ToastProvider", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("displays and hides toast message", async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    // Wrap interaction in act()
    act(() => {
      fireEvent.click(screen.getByText("Show Toast"));
    });

    // Expect toast to appear
    expect(screen.getByText("Test message")).toBeInTheDocument();

    // Fast-forward time to trigger auto-hide
    act(() => {
      jest.advanceTimersByTime(3500);
    });

    // Ensure toast disappears after duration
    await waitFor(() => {
      expect(screen.queryByText("Test message")).not.toBeInTheDocument();
    });
  });
});
