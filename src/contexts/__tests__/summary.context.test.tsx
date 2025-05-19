import React from "react";
import { render, screen, act } from "@testing-library/react";

import { SummaryProvider, useSummaryContext } from "@/contexts/summary.context";

// Mock the useGetSummariesQuery hook
jest.mock("@/hooks/queries/useGetSummariesQuery", () => ({
  useGetSummariesQuery: jest.fn(),
}));

import { useGetSummariesQuery } from "@/hooks/queries/useGetSummariesQuery";
import { EventTrackingProvider } from "../event-tracking.context";

const mockUseGetSummariesQuery = useGetSummariesQuery as jest.Mock;

// Test component to consume context values
const TestComponent = () => {
  const { filterState, totalCount, isLoading, onChangeFilter, onToggleStatus } =
    useSummaryContext();

  return (
    <div>
      <div data-testid="search">{filterState.search}</div>
      <div data-testid="kpi">{filterState.kpi}</div>
      <div data-testid="page">{filterState.page}</div>
      <div data-testid="status">{filterState.status.join(",")}</div>
      <div data-testid="totalCount">{totalCount}</div>
      <div data-testid="loading">{isLoading ? "loading" : "loaded"}</div>

      <button
        onClick={() => onChangeFilter("search", "hello")}
        data-testid="change-search-btn"
      >
        Change Search
      </button>

      <button
        onClick={() => onToggleStatus("fulfilled")}
        data-testid="toggle-fulfilled-btn"
      >
        Toggle Fulfilled
      </button>
    </div>
  );
};

describe("SummaryProvider", () => {
  beforeEach(() => {
    // Default mock return
    mockUseGetSummariesQuery.mockReturnValue({
      data: {
        data: [{ id: "1", name: "Test Summary" }],
        meta: { totalCount: 42 },
      },
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("provides default context values and renders children", () => {
    render(
      <EventTrackingProvider>
        <SummaryProvider>
          <TestComponent />
        </SummaryProvider>
      </EventTrackingProvider>
    );

    expect(screen.getByTestId("search")).toHaveTextContent("");
    expect(screen.getByTestId("kpi")).toHaveTextContent("");
    expect(screen.getByTestId("page")).toHaveTextContent("0");
    expect(screen.getByTestId("status")).toHaveTextContent(
      "fulfilled,not-fulfilled"
    );
    expect(screen.getByTestId("totalCount")).toHaveTextContent("42");
    expect(screen.getByTestId("loading")).toHaveTextContent("loaded");
    expect(screen.getByText("Change Search")).toBeInTheDocument();
  });

  test("onChangeFilter updates filter and resets page if key !== page or rowsPerPage", () => {
    render(
      <EventTrackingProvider>
        <SummaryProvider>
          <TestComponent />
        </SummaryProvider>
      </EventTrackingProvider>
    );

    // Initially page is 0
    expect(screen.getByTestId("page")).toHaveTextContent("0");

    // Change search, which should reset page to 0 and update search string
    act(() => {
      screen.getByTestId("change-search-btn").click();
    });

    expect(screen.getByTestId("search")).toHaveTextContent("hello");
    expect(screen.getByTestId("page")).toHaveTextContent("0");
  });

  test("onToggleStatus toggles status and resets page", () => {
    render(
      <EventTrackingProvider>
        <SummaryProvider>
          <TestComponent />
        </SummaryProvider>
      </EventTrackingProvider>
    );

    // Status initially includes "fulfilled"
    expect(screen.getByTestId("status")).toHaveTextContent(
      "fulfilled,not-fulfilled"
    );

    act(() => {
      screen.getByTestId("toggle-fulfilled-btn").click();
    });

    // "fulfilled" should be removed
    expect(screen.getByTestId("status")).toHaveTextContent("not-fulfilled");
    expect(screen.getByTestId("page")).toHaveTextContent("0");

    act(() => {
      screen.getByTestId("toggle-fulfilled-btn").click();
    });

    // "fulfilled" should be added back
    expect(screen.getByTestId("status")).toHaveTextContent(
      "not-fulfilled,fulfilled"
    );
  });
});
