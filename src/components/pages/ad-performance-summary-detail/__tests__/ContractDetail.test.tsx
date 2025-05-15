import React from "react";
import { render, screen } from "@testing-library/react";
import { ContractDetail } from "../ContractDetail";
import { formatDate } from "@/utils/date.utils";
import { formatToRupiah } from "@/utils/currency.utils";
import { summariesMock } from "@/api/__mocks__/summary.mocks";

describe("ContractDetail", () => {
  const mockData = summariesMock[0];

  it("renders contract details correctly with summariesMock[0]", () => {
    render(<ContractDetail data={mockData} />);

    // Header
    expect(screen.getByText("Contract Detail")).toBeInTheDocument();

    // Contract Status Chip
    expect(
      screen.getByText(mockData.contract.contractStatus)
    ).toBeInTheDocument();

    // Date Range
    const formattedStart = formatDate(mockData.startDate, "DD MMMM YYYY");
    const formattedEnd = formatDate(mockData.endDate, "DD MMMM YYYY");

    expect(
      screen.getByText(`${formattedStart} - ${formattedEnd}`)
    ).toBeInTheDocument();

    // Contract ID
    expect(screen.getByText("Contract ID")).toBeInTheDocument();
    expect(screen.getByText(mockData.contract.contractId)).toBeInTheDocument();

    // Total Budget
    expect(screen.getByText("Total Budget")).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          element?.textContent?.replace(/\s/g, "") ===
          formatToRupiah(mockData.contract.totalBudget).replace(/\s/g, "")
      )
    ).toBeInTheDocument();

    // Payment Terms
    expect(screen.getByText("Payment Terms")).toBeInTheDocument();
    expect(
      screen.getByText(mockData.contract.paymentTerms)
    ).toBeInTheDocument();
  });
});
