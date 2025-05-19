import {
  clearStorage,
  getItem,
  removeItem,
  setItem,
} from "../localstorage.utils";

describe("localStorage Utilities", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should set and get an item correctly", () => {
    const key = "testKey";
    const value = { name: "Test User", age: 25 };

    setItem(key, value);
    const retrievedValue = getItem<typeof value>(key);

    expect(retrievedValue).toEqual(value);
  });

  it("should return null for a non-existing key", () => {
    expect(getItem("nonExistingKey")).toBeNull();
  });

  it("should remove an item correctly", () => {
    const key = "testKey";
    setItem(key, "testValue");

    removeItem(key);
    expect(getItem(key)).toBeNull();
  });

  it("should clear all storage", () => {
    setItem("key1", "value1");
    setItem("key2", "value2");

    clearStorage();
    expect(getItem("key1")).toBeNull();
    expect(getItem("key2")).toBeNull();
  });

  it("should return null for invalid JSON data", () => {
    const key = "invalidJSON";
    localStorage.setItem(key, "invalid");
    expect(getItem(key)).toBeNull();
  });
});
