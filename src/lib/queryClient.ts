import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Create a session-aware query client with enhanced error handling
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Default stale time for all queries
			staleTime: 1000 * 60 * 5, // 5 minutes
			// Default garbage collection time
			gcTime: 1000 * 60 * 10, // 10 minutes
			// Retry configuration
			retry: (failureCount, error) => {
				// Don't retry on authentication errors
				if (error && typeof error === 'object' && 'status' in error) {
					const status = (error as any).status;
					if (status === 401 || status === 403) {
						return false;
					}
				}
				// Retry up to 2 times for other errors
				return failureCount < 2;
			},
			// Refetch on window focus for session-critical data
			refetchOnWindowFocus: (query) => {
				// Refetch session-related queries on window focus
				return query.queryKey[0] === 'session';
			},
			// Error handling
			throwOnError: false,
		},
		mutations: {
			// Global error handling for mutations
			onError: (error) => {
				console.error('Mutation error:', error);

				// Handle authentication errors
				if (error && typeof error === 'object' && 'status' in error) {
					const status = (error as any).status;
					if (status === 401) {
						toast.error('Authentication required. Please sign in.');
						return;
					}
					if (status === 403) {
						toast.error('Access denied. You do not have permission to perform this action.');
						return;
					}
				}

				// Generic error message
				const message = error instanceof Error ? error.message : 'An unexpected error occurred';
				toast.error(message);
			},
			// Retry configuration for mutations
			retry: (failureCount, error) => {
				// Don't retry authentication errors
				if (error && typeof error === 'object' && 'status' in error) {
					const status = (error as any).status;
					if (status === 401 || status === 403) {
						return false;
					}
				}
				// Retry once for other errors
				return failureCount < 1;
			},
		},
	},
});
