import React from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import { SummaryTable } from "../SummaryTable";
import { useSummaryContext } from "@/contexts/summary.context";
import { summariesMock } from "@/api/__mocks__/summary.mocks";
import { Summary } from "@/api/schemas/summary.schemas";

// Mock SummaryTableAction
jest.mock("../SummaryTableAction", () => ({
  __esModule: true,
  default: ({ row }: { row: Summary }) => (
    <button data-testid={`action-${row.id}`}>Action</button>
  ),
}));

// Mock useSummaryContext
jest.mock("@/contexts/summary.context", () => ({
  useSummaryContext: jest.fn(),
}));

describe("SummaryTable", () => {
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

  const mockOnChangeFilter = jest.fn();

  beforeEach(() => {
    (useSummaryContext as jest.Mock).mockReturnValue({
      summaries: summariesMock,
      filterState: { kpi: "", page: 0, rowsPerPage: 10 },
      totalCount: summariesMock.length,
      isLoading: false,
      onChangeFilter: mockOnChangeFilter,
    });
  });

  it("renders summary table with correct columns and rows", async () => {
    render(<SummaryTable />);

    // Check headers
    expect(screen.getByText("Client")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("CTR")).toBeInTheDocument();
    expect(screen.getByText("Impression")).toBeInTheDocument();
    expect(screen.getByText("Conversion Rate")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    await waitFor(() => {
      // Check rows for clients
      expect(screen.getByText("Andrews Corp")).toBeInTheDocument();
      expect(screen.getByText("Murphy Inc")).toBeInTheDocument();

      // Check SummaryTableAction rendered
      expect(screen.getByTestId("action-CLNT001")).toBeInTheDocument();
      expect(screen.getByTestId("action-CLNT002")).toBeInTheDocument();
    });
  });

  it("highlights rows based on isFulfilled", async () => {
    render(<SummaryTable />);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");

      const andrewsRow = rows.find((row) =>
        within(row).queryByText("Andrews Corp")
      );
      const murphyRow = rows.find((row) =>
        within(row).queryByText("Murphy Inc")
      );

      expect(andrewsRow).toHaveStyle({
        backgroundColor: expect.stringContaining("rgba"),
      });

      expect(murphyRow).toHaveStyle({
        backgroundColor: expect.stringContaining("rgba"),
      });
    });
  });
});
