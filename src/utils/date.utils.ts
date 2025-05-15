import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

/**
 * Formats a date string or Date object into a human-readable format.
 *
 * @param date - The date value to format (can be string, Date, or null).
 * @param format - The desired output format.
 * @param inputFormat - Optional input format to parse correctly.
 * @returns The formatted date string. Returns an empty string if input is null/invalid.
 */
export const formatDate = (
  date: string | Date | null,
  format = "MMM D, YYYY",
  inputFormat?: string
): string => {
  if (!date) return "";

  const parsedDate = inputFormat ? dayjs(date, inputFormat) : dayjs(date);

  return parsedDate.format(format);
};
