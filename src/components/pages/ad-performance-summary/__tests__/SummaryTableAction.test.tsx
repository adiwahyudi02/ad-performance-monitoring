import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SummaryTableAction from "../SummaryTableAction";
import { summariesMock } from "@/api/__mocks__/summary.mocks";

const mockRow = summariesMock[0];

describe("SummaryTableAction", () => {
  it("renders the IconButton with correct link", () => {
    render(<SummaryTableAction row={mockRow} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `/ad-performance-summary/detail/${mockRow.id}`
    );
  });

  it("renders the tooltip with correct title on hover", async () => {
    render(<SummaryTableAction row={mockRow} />);
    const link = screen.getByRole("link");
    fireEvent.mouseOver(link);
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("More Detail");
    });
    fireEvent.mouseOut(link);
  });
});
