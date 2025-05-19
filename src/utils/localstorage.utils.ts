/**
 * Sets an item in localStorage
 * @param key - The key under which the value will be stored
 * @param value - The value to be stored
 */
export const setItem = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage`, error);
  }
};

/**
 * Gets an item from localStorage
 * @param key - The key of the item to retrieve
 * @returns The parsed value or null if not found
 */
export const getItem = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    const parsedValue = JSON.parse(serializedValue);
    if (typeof parsedValue !== "object" && typeof parsedValue !== "string") {
      return parsedValue as T;
    }
    return parsedValue as T;
  } catch {
    return null;
  }
};

/**
 * Removes an item from localStorage
 * @param key - The key of the item to remove
 */
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage`, error);
  }
};

/**
 * Clears all items from localStorage
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage", error);
  }
};
