import { QueryClient } from "@tanstack/react-query";

// Global config for react query
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
        queries: {
            retry: shouldRetryRequest,
            retryDelay: (attemptIndex) =>
                Math.min(1000 * 2 ** attemptIndex, 30000),
            staleTime: 1000 * 60,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            refetchOnMount: "always",
            },
            mutations: {
                // Mutations can have side effects, so avoid automatic retries.
                retry: false,
            },
        },
    })
}

function shouldRetryRequest(failureCount: number, _error: unknown) {
  return failureCount < 1;
}