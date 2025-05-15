/**
 * Formats a number by adding thousands separators to make it easier to read.
 *
 * This function formats the number by inserting a period (`.`) as the thousand separator
 * for readability. This is typically used in Indonesia and other regions that use the period
 * as a thousand separator instead of the comma.
 *
 * @param {number} amount - The numeric value to be formatted.
 * @returns {string} The formatted string with the thousand separator.
 *
 * @example
 * const formattedAmount = formatWithThousandsSeparator(100000000);
 * console.log(formattedAmount); // Output: "100.000.000"
 *
 * const formattedAmount2 = formatWithThousandsSeparator(1234567);
 * console.log(formattedAmount2); // Output: "1.234.567"
 */
export const formatThousandsSeparator = (amount: number): string => {
  // Ensure that the amount is a valid number
  if (isNaN(amount)) {
    return "0";
  }

  // Convert the number into a string with the thousands separator
  return amount.toLocaleString("id-ID"); // "id-ID" locale uses period as thousands separator
};
