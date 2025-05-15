import { toastUtils } from "@/utils/toast.utils";
import { QueryClient, QueryCache } from "@tanstack/react-query";

// Function to display the toast message
export const showErrorToast = (message: string) => {
  toastUtils.showToast(message, "error");
};

// Create a new QueryClient with global error handling
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Set stale time to 60 seconds
      retry: 2, // Retry failed queries up to 2 times
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      showErrorToast(errorMessage);
    },
  }),
});
