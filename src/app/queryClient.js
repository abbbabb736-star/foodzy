import { QueryClient } from '@tanstack/react-query';

// Centralized React Query configuration for the entire app.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
