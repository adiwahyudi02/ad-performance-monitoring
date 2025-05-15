import React from "react";
import { render, screen } from "@testing-library/react";
import { SummaryDetail } from "../SummaryDetail";
import { useGetSummaryQuery } from "@/hooks/queries/useGetSummaryQuery";
import { summariesMock } from "@/api/__mocks__/summary.mocks";
import { formatDate } from "@/utils/date.utils";
import { formatPercentagePostfix } from "@/utils/percentage.utils";

// Mock hook
jest.mock("@/hooks/queries/useGetSummaryQuery");

const mockUseGetSummaryQuery = useGetSummaryQuery as jest.Mock;

const id = summariesMock[0].id;

describe("SummaryDetail Component", () => {
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

  it("renders loading state correctly", () => {
    mockUseGetSummaryQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<SummaryDetail id={id} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders data correctly", () => {
    const mockData = summariesMock[0];
    mockUseGetSummaryQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<SummaryDetail id={id} />);

    // Back button
    expect(
      screen.getByRole("link", { name: /Back To Ad Summary/i })
    ).toBeInTheDocument();

    // TitlePage
    expect(screen.getByText("Summary Detail")).toBeInTheDocument();

    // Client Name
    expect(screen.getByText(mockData.name)).toBeInTheDocument();

    // ContractDetail - e.g. assuming it shows startDate & endDate
    if (mockData.startDate && mockData.endDate) {
      expect(
        screen.getByText(
          `${formatDate(mockData.startDate, "DD MMMM YYYY")} - ${formatDate(
            mockData.endDate,
            "DD MMMM YYYY"
          )}`
        )
      ).toBeInTheDocument();
    }

    // PerformanceSummary - e.g. check for one KPI value
    if (mockData.ctrActual) {
      expect(
        screen.getAllByText(formatPercentagePostfix(mockData.ctrActual))
      ).not.toHaveLength(0);
    }

    // Ad Table
    expect(screen.getByTestId("ad-table")).toBeInTheDocument();
  });
});
