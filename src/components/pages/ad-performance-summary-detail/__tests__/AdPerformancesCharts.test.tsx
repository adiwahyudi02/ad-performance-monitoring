import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdHistories } from "@/api/schemas/summary.schemas";
import { formatPercentagePostfix } from "@/utils/percentage.utils";
import { formatThousandsSeparator } from "@/utils/separator.utils";
import { AdPerformancesCharts } from "../AdPerformancesCharts";

jest.mock("../KpiProgressCard", () => ({
  KpiProgressCard: ({
    title,
    target,
    isFulfilled,
    seriesLabel,
  }: {
    title: string;
    target: string | number | null;
    isFulfilled: boolean;
    seriesLabel: string;
  }) => (
    <div data-testid="KpiProgressCard">
      <div>{title}</div>
      <div>{target}</div>
      <div>{isFulfilled ? "Fulfilled" : "Not Fulfilled"}</div>
      <div>{seriesLabel}</div>
    </div>
  ),
}));

const mockHistory: AdHistories = [
  { date: "2024-05-01", actual: 10 },
  { date: "2024-05-02", actual: 15 },
  { date: "2024-05-03", actual: 20 },
];

describe("AdPerformancesCharts", () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  it("renders three KpiProgressCard components with correct props", () => {
    renderWithTheme(
      <AdPerformancesCharts
        ctrActual={25}
        ctrTarget={20}
        impressionActual={1000}
        impressionTarget={1500}
        conversionRateActual={5}
        conversionRateTarget={5}
        ctrHistory={mockHistory}
        impressionHistory={mockHistory}
        conversionRateHistory={mockHistory}
      />
    );

    const cards = screen.getAllByTestId("KpiProgressCard");
    expect(cards).toHaveLength(3);

    expect(screen.getByText("CTR Progress")).toBeInTheDocument();
    expect(screen.getByText(formatPercentagePostfix(20))).toBeInTheDocument();
    expect(screen.getByText("CTR (%)")).toBeInTheDocument();

    expect(screen.getByText("Impressions Progress")).toBeInTheDocument();
    expect(
      screen.getByText(formatThousandsSeparator(1500))
    ).toBeInTheDocument();
    expect(screen.getByText("Impressions (M)")).toBeInTheDocument();

    expect(screen.getByText("Conversion Rate Progress")).toBeInTheDocument();
    expect(screen.getByText(formatPercentagePostfix(5))).toBeInTheDocument();
    expect(screen.getAllByText("Fulfilled")).toHaveLength(2);
    expect(screen.getAllByText("Not Fulfilled")).toHaveLength(1);
    expect(screen.getByText("Conversion Rate (%)")).toBeInTheDocument();
  });
});
