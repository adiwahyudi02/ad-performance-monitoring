/**
 * Formats a number as a percentage with a '%' sign at the end.
 * Optionally, you can control the number of decimal places.
 *
 * @param {number} value - The numeric value to be converted into a percentage.
 * @param {number} [decimalPlaces=2] - The number of decimal places to display in the percentage (default is 2).
 * @returns {string} The formatted percentage string with the '%' sign.
 *
 * @example
 * const percentage1 = formatPercentage(0.2578);
 * console.log(percentage1); // Output: "25.78%"
 *
 * const percentage2 = formatPercentage(0.2578, 1);
 * console.log(percentage2); // Output: "25.8%"
 *
 * const percentage3 = formatPercentage(1);
 * console.log(percentage3); // Output: "100%"
 */
export const formatPercentage = (
  value: number,
  decimalPlaces: number = 2
): string => {
  // Ensure that the value is a valid number
  if (isNaN(value)) {
    return "0%";
  }

  // Multiply by 100 to convert the number into a percentage and then format it with the specified decimal places
  return `${(value * 100).toFixed(decimalPlaces)}%`;
};

/**
 * Adds a '%' postfix to the given number to represent a percentage.
 * This function assumes that the number is already in percentage form (e.g., 25.78 should remain 25.78%).
 *
 * @param {number} value - The numeric value to be converted into a percentage.
 * @returns {string} The value with the '%' postfix.
 *
 * @example
 * const percentage = formatPercentagePostfix(25.78);
 * console.log(percentage); // Output: "25.78%"
 */
export const formatPercentagePostfix = (value: number): string => {
  // Ensure that the value is a valid number
  if (isNaN(value)) {
    return "0%";
  }

  // Return the value with the '%' symbol added
  return `${value}%`;
};
