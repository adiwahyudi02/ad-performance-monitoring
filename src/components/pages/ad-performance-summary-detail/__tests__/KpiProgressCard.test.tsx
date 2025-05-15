import React from "react";
import { render, screen } from "@testing-library/react";
import { KpiProgressCard } from "../KpiProgressCard";
import { AdHistories } from "@/api/schemas/summary.schemas";

jest.mock("../../ad-performance-summary/KpiColumn", () => ({
  KpiColumn: ({
    type,
    value,
  }: {
    type: string;
    value: string | number | null;
  }) => <div data-testid={`KpiColumn-${type}`}>{value}</div>,
}));

const mockHistory: AdHistories = [
  { date: "2024-05-01", actual: 10 },
  { date: "2024-05-02", actual: 15 },
  { date: "2024-05-03", actual: 20 },
];

describe("KpiProgressCard", () => {
  it("renders title, target, status, and chart", () => {
    render(
      <KpiProgressCard
        title="CTR Progress"
        target="25%"
        history={mockHistory}
        seriesLabel="CTR (%)"
        isFulfilled={true}
      />
    );

    expect(screen.getByText("CTR Progress")).toBeInTheDocument();
    expect(screen.getByTestId("KpiColumn-target")).toHaveTextContent("25%");
    expect(screen.getByText("Fulfilled")).toBeInTheDocument();
    expect(screen.getByText("CTR (%)")).toBeInTheDocument();
  });

  it("shows 'Not Fulfilled' when isFulfilled is false", () => {
    render(
      <KpiProgressCard
        title="CTR Progress"
        target="30%"
        history={mockHistory}
        seriesLabel="CTR (%)"
        isFulfilled={false}
      />
    );

    expect(screen.getByText("Not Fulfilled")).toBeInTheDocument();
  });
});
