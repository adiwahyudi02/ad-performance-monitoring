import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { EventTrackingTable } from "../event-tracking-table";

jest.mock("@/contexts/event-tracking.context", () => ({
  useEventTrackingContext: () => ({
    userEvents: [
      {
        timestamp: "2023-05-01T12:00:00Z",
        type: "navigation",
        value: { page: "home" },
      },
      {
        timestamp: "2023-05-02T15:30:00Z",
        type: "filter",
        value: { category: "books" },
      },
    ],
  }),
}));

describe("EventTrackingTable Component", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((msg) => {
      if (
        typeof msg === "string" &&
        msg.includes("<div> cannot contain a nested <td>")
      ) {
        return;
      }
    });
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("renders table headers correctly", () => {
    render(<EventTrackingTable />);

    // Check table header labels
    expect(screen.getByText("Timestamp")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });

  it("renders rows with types 'navigation' or 'filter'", async () => {
    render(<EventTrackingTable />);

    await waitFor(() => {
      expect(screen.getByText("navigation")).toBeInTheDocument();
      expect(screen.getByText("filter")).toBeInTheDocument();
    });
  });
});
