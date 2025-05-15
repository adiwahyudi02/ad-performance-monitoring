import React from "react";
import { render, screen } from "@testing-library/react";
import { PerformanceSummary } from "../PerformanceSummary";
import { summariesMock } from "@/api/__mocks__/summary.mocks";

// Mock the SummaryKpi component to simplify test focus on PerformanceSummary layout
jest.mock("../SummaryKpi", () => ({
  SummaryKpi: ({
    title,
    actual,
    target,
  }: {
    title: string;
    actual: number;
    target: number;
  }) => (
    <div data-testid={`summary-kpi-${title.toLowerCase()}`}>
      <span>{title}</span>
      <span>Actual: {actual}</span>
      <span>Target: {target}</span>
    </div>
  ),
}));

describe("PerformanceSummary", () => {
  it("renders Performance Summary heading", () => {
    render(<PerformanceSummary data={summariesMock[0]} />);
    expect(screen.getByText("Performance Summary")).toBeInTheDocument();
  });

  it("renders total ads count correctly", () => {
    render(<PerformanceSummary data={summariesMock[0]} />);
    expect(
      screen.getByText(summariesMock[0].ads.length.toString())
    ).toBeInTheDocument();
    expect(screen.getByText("Total Ads")).toBeInTheDocument();
  });

  it("renders SummaryKpi components with correct props", () => {
    render(<PerformanceSummary data={summariesMock[0]} />);

    const ctrKpi = screen.getByTestId("summary-kpi-ctr");
    expect(ctrKpi).toHaveTextContent("CTR");
    expect(ctrKpi).toHaveTextContent(`Actual: ${summariesMock[0].ctrActual}`);
    expect(ctrKpi).toHaveTextContent(`Target: ${summariesMock[0].ctrTarget}`);

    const conversionRateKpi = screen.getByTestId("summary-kpi-conversion rate");
    expect(conversionRateKpi).toHaveTextContent("Conversion Rate");
    expect(conversionRateKpi).toHaveTextContent(
      `Actual: ${summariesMock[0].conversionRateActual}`
    );
    expect(conversionRateKpi).toHaveTextContent(
      `Target: ${summariesMock[0].conversionRateTarget}`
    );

    const impressionKpi = screen.getByTestId("summary-kpi-impression");
    expect(impressionKpi).toHaveTextContent("Impression");
    expect(impressionKpi).toHaveTextContent(
      `Actual: ${summariesMock[0].impressionActual}`
    );
    expect(impressionKpi).toHaveTextContent(
      `Target: ${summariesMock[0].impressionTarget}`
    );
  });

  it("does not render SummaryKpi for missing targets", () => {
    // Using mock with null ctrTarget to test conditionals
    render(<PerformanceSummary data={summariesMock[1]} />);
    expect(screen.queryByTestId("summary-kpi-ctr")).not.toBeInTheDocument();
  });
});
