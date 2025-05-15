/**
 * Converts a numeric value to a formatted Indonesian Rupiah (IDR) currency string.
 *
 * @param {number} amount - The numeric value to be formatted.
 * @returns {string} A string representing the amount in Rupiah, formatted as "RpXX.XXX.XXX".
 *
 * @example
 * const formattedAmount = formatToRupiah(50000000);
 * console.log(formattedAmount); // Output: "Rp50.000.000"
 *
 * The function uses the 'id-ID' locale for formatting, ensuring the correct thousand separators
 * and placing the "Rp" currency symbol at the beginning. No decimal places are included.
 */

export const formatToRupiah = (amount: number): string => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};
