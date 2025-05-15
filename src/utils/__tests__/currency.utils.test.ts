import { formatToRupiah } from "../currency.utils";

const formattedRupiahUtilTest = (input: number) => {
  return formatToRupiah(input).replace(/\u00A0/g, " ");
};

describe("formatToRupiah", () => {
  const testCases = [
    { input: 50000000, expected: "Rp 50.000.000" },
    { input: 1000, expected: "Rp 1.000" },
    { input: 0, expected: "Rp 0" },
    { input: -1500000, expected: "-Rp 1.500.000" },
    { input: 1234567890, expected: "Rp 1.234.567.890" },
    { input: 50, expected: "Rp 50" },
  ];

  it.each(testCases)("formats $input to $expected", ({ input, expected }) => {
    const formatted = formattedRupiahUtilTest(input);
    expect(formatted).toBe(expected);
  });
});
