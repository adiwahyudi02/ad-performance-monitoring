import { toastUtils } from "../toast.utils";

describe("toastUtils", () => {
  beforeEach(() => {
    // Reset the internal handler before each test
    // Since toastHandler is internal and private, we reset by calling setHandler(null)
    // But setHandler expects a function, so we simulate by setting to null via casting
    // Alternatively, jest.resetModules() can be used to reload the module, but here we do a workaround:

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    toastUtils.setHandler(null);
  });

  it("calls the handler when showToast is called", () => {
    const mockHandler = jest.fn();

    toastUtils.setHandler(mockHandler);

    toastUtils.showToast("Test message", "success");

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith("Test message", "success");
  });

  it("does not throw when showToast is called without a handler set", () => {
    // Spy on console.warn to verify the warning message
    const consoleWarnSpy = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    toastUtils.showToast("Test without handler", "error");

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Toast handler not set. Did you forget to wrap your app with <ToastProvider>?"
    );

    consoleWarnSpy.mockRestore();
  });

  it("allows replacing the handler", () => {
    const firstHandler = jest.fn();
    const secondHandler = jest.fn();

    toastUtils.setHandler(firstHandler);
    toastUtils.showToast("First", "info");

    toastUtils.setHandler(secondHandler);
    toastUtils.showToast("Second", "warning");

    expect(firstHandler).toHaveBeenCalledWith("First", "info");
    expect(secondHandler).toHaveBeenCalledWith("Second", "warning");
  });
});
