import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SummaryFilter } from "../SummaryFilter";

// Mock the context hook
const mockOnChangeFilter = jest.fn();
const mockOnToggleStatus = jest.fn();

jest.mock("@/contexts/summary.context", () => ({
  useSummaryContext: () => ({
    filterState: {
      search: "initial search",
      kpi: "ctr",
      startDate: "01/01/2023",
      endDate: "31/01/2023",
      status: ["fulfilled"],
    },
    onChangeFilter: mockOnChangeFilter,
    onToggleStatus: mockOnToggleStatus,
  }),
}));

describe("SummaryFilter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<SummaryFilter />);
  });

  it("renders search input with initial value", () => {
    const searchInput = screen.getByPlaceholderText("Search by client name");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("initial search");
  });

  it("calls onChangeFilter when typing in search input", () => {
    const searchInput = screen.getByPlaceholderText("Search by client name");
    fireEvent.change(searchInput, { target: { value: "new search" } });
    expect(mockOnChangeFilter).toHaveBeenCalledWith("search", "new search");
  });

  it("calls onChangeFilter with empty string when clear icon clicked", () => {
    const clearIcon = screen.getByTestId("clear-icon");
    fireEvent.click(clearIcon);
    expect(mockOnChangeFilter).toHaveBeenCalledWith("search", "");
  });

  it("renders select with initial KPI value", () => {
    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select); // Open the dropdown
    expect(select).toHaveTextContent("CTR");
  });

  it("calls onChangeFilter when KPI selection changes", () => {
    const select = screen.getByRole("combobox");

    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText("Impression"));

    expect(mockOnChangeFilter).toHaveBeenCalledWith("kpi", "impression");
  });

  it("renders date fields with initial values", () => {
    expect(screen.getByTestId("startDate")).toHaveValue("01/01/2023");
    expect(screen.getByTestId("endDate")).toHaveValue("31/01/2023");
  });

  it("calls onChangeFilter when start date changes", () => {
    const startDateInput = screen.getByTestId("startDate");
    fireEvent.change(startDateInput, { target: { value: "01/02/2023" } });
    expect(mockOnChangeFilter).toHaveBeenCalledWith("startDate", "01/02/2023");
  });

  it("calls onChangeFilter when end date changes", () => {
    const endDateInput = screen.getByTestId("endDate");
    fireEvent.change(endDateInput, { target: { value: "28/02/2023" } });
    expect(mockOnChangeFilter).toHaveBeenCalledWith("endDate", "28/02/2023");
  });

  it("toggles fulfilled status when fulfilled button clicked", () => {
    const fulfilledButton = screen.getByTestId("fulfilled-button");
    fireEvent.click(fulfilledButton);
    expect(mockOnToggleStatus).toHaveBeenCalledWith("fulfilled");
  });

  it("toggles not fulfilled status when not fulfilled button clicked", () => {
    const notFulfilledButton = screen.getByTestId("not-fulfilled-button");
    fireEvent.click(notFulfilledButton);
    expect(mockOnToggleStatus).toHaveBeenCalledWith("not-fulfilled");
  });
});
