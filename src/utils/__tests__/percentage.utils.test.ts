import { formatPercentage, formatPercentagePostfix } from "../percentage.utils";

describe("formatPercentage", () => {
  it("formats 0.2578 to '25.78%'", () => {
    expect(formatPercentage(0.2578)).toBe("25.78%");
  });

  it("formats 0.2578 with 1 decimal place to '25.8%'", () => {
    expect(formatPercentage(0.2578, 1)).toBe("25.8%");
  });

  it("formats 1 to '100.00%'", () => {
    expect(formatPercentage(1)).toBe("100.00%");
  });

  it("formats 0 to '0.00%'", () => {
    expect(formatPercentage(0)).toBe("0.00%");
  });

  it("formats negative values correctly", () => {
    expect(formatPercentage(-0.1234)).toBe("-12.34%");
  });

  it("returns '0%' for NaN input", () => {
    expect(formatPercentage(NaN)).toBe("0%");
  });

  it("formats large numbers correctly", () => {
    expect(formatPercentage(12.3456)).toBe("1234.56%");
  });

  it("formats with no decimal places", () => {
    expect(formatPercentage(0.9876, 0)).toBe("99%");
  });
});

describe("formatPercentagePostfix", () => {
  it("appends '%' to a valid number", () => {
    expect(formatPercentagePostfix(25.78)).toBe("25.78%");
  });

  it("formats 0 to '0%'", () => {
    expect(formatPercentagePostfix(0)).toBe("0%");
  });

  it("formats negative numbers correctly", () => {
    expect(formatPercentagePostfix(-12.5)).toBe("-12.5%");
  });

  it("formats large numbers correctly", () => {
    expect(formatPercentagePostfix(12345.6789)).toBe("12345.6789%");
  });

  it("returns '0%' for NaN input", () => {
    expect(formatPercentagePostfix(NaN)).toBe("0%");
  });
});
