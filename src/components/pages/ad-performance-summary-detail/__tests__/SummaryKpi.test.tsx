import React from "react";
import { render, screen } from "@testing-library/react";
import { SummaryKpi } from "../SummaryKpi";
import { KpiColumnProps } from "../../ad-performance-summary/KpiColumn";

// Mock KpiColumn to focus tests on SummaryKpi rendering logic
jest.mock("../../ad-performance-summary/KpiColumn", () => ({
  KpiColumn: ({
    type,
    value,
    isNotFulfilled,
  }: Pick<KpiColumnProps, "type" | "value" | "isNotFulfilled">) => (
    <div data-testid={`kpi-column-${type}`}>
      <span>{value}</span>
      {isNotFulfilled !== undefined && (
        <span>{isNotFulfilled ? "Not Fulfilled" : "Fulfilled"}</span>
      )}
    </div>
  ),
}));

describe("SummaryKpi", () => {
  it("renders title", () => {
    render(<SummaryKpi title="CTR" actual={0.5} target={0.7} />);
    expect(screen.getByText("CTR")).toBeInTheDocument();
  });

  it("shows CancelIcon with tooltip when target > actual (not fulfilled)", () => {
    render(<SummaryKpi title="CTR" actual={0.5} target={0.7} />);
    expect(screen.getByTestId("CTR-notFulfilled-icon")).toBeInTheDocument();
  });

  it("shows CheckCircleIcon with tooltip when actual >= target (fulfilled)", () => {
    render(<SummaryKpi title="CTR" actual={0.7} target={0.5} />);
    expect(screen.getByTestId("CTR-fulfilled-icon")).toBeInTheDocument();
  });
});
