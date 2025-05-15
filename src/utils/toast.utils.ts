/**
 * Utility for globally showing toasts without relying on React hooks directly.
 * Useful for calling toasts from non-React contexts (e.g., React Query, API interceptors).
 */

// Define the type for the toast handler function
type ToastHandler = (
  message: string,
  severity: "success" | "error" | "info" | "warning"
) => void;

// Internal variable to hold the current toast handler function from <ToastProvider>
let toastHandler: ToastHandler | null = null;

/**
 * toastUtil: Provides methods to set and trigger toast notifications imperatively.
 *
 * Why use this?
 * - React hooks (like useToast) can't be used outside React components.
 * - This util allows you to show toasts from anywhere (e.g., global error handlers).
 */
export const toastUtils = {
  /**
   * Sets the current toast handler function.
   * Usually called by <ToastProvider> when it mounts.
   *
   * @param handler - The function to show a toast (from ToastProvider)
   */
  setHandler: (handler: ToastHandler) => {
    toastHandler = handler;
  },

  /**
   * Triggers a toast notification using the currently set handler.
   * Safe to call from anywhere in the app.
   *
   * @param message - The message to display in the toast.
   * @param severity - The type of toast ("success", "error", "info", "warning").
   */
  showToast: (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    if (toastHandler) {
      toastHandler(message, severity);
    } else {
      console.warn(
        "Toast handler not set. Did you forget to wrap your app with <ToastProvider>?"
      );
    }
  },
};
