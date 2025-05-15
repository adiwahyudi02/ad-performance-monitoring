import { formatThousandsSeparator } from "../separator.utils";

describe("formatThousandsSeparator", () => {
  it("formats 100000000 to '100.000.000'", () => {
    expect(formatThousandsSeparator(100000000)).toBe("100.000.000");
  });

  it("formats 1234567 to '1.234.567'", () => {
    expect(formatThousandsSeparator(1234567)).toBe("1.234.567");
  });

  it("formats 1000 to '1.000'", () => {
    expect(formatThousandsSeparator(1000)).toBe("1.000");
  });

  it("formats 0 to '0'", () => {
    expect(formatThousandsSeparator(0)).toBe("0");
  });

  it("formats negative numbers correctly", () => {
    expect(formatThousandsSeparator(-987654)).toBe("-987.654");
  });

  it("formats small numbers without separator correctly", () => {
    expect(formatThousandsSeparator(50)).toBe("50");
  });

  it("formats large numbers correctly", () => {
    expect(formatThousandsSeparator(1234567890)).toBe("1.234.567.890");
  });

  it("returns '0' for NaN input", () => {
    expect(formatThousandsSeparator(NaN)).toBe("0");
  });
});
