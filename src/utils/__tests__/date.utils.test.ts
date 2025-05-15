import { formatDate } from "../date.utils";

describe("formatDate", () => {
  it("formats a Date object to 'MMM D, YYYY'", () => {
    const date = new Date("2023-05-15");
    expect(formatDate(date)).toBe("May 15, 2023");
  });

  it("formats a date string to 'MMM D, YYYY'", () => {
    expect(formatDate("2023-12-01")).toBe("Dec 1, 2023");
  });

  it("formats a date string with a custom output format", () => {
    expect(formatDate("2023-12-01", "DD/MM/YYYY")).toBe("01/12/2023");
  });

  it("formats a date string with a custom input format", () => {
    expect(formatDate("15-05-2023", "MMMM D, YYYY", "DD-MM-YYYY")).toBe(
      "May 15, 2023"
    );
  });

  it("returns empty string if date is null", () => {
    expect(formatDate(null)).toBe("");
  });

  it("returns 'Invalid Date' if date string is invalid", () => {
    expect(formatDate("not-a-date")).toBe("Invalid Date");
  });

  it("formats a date string with custom input and output formats", () => {
    expect(formatDate("2023/05/15", "D MMM YYYY", "YYYY/MM/DD")).toBe(
      "15 May 2023"
    );
  });
});
