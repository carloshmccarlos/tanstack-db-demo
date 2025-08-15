import { queryOptions } from "@tanstack/react-query";
import { authClient } from "~/lib/auth/auth-client";
import { fetchUserId } from "~/lib/auth/fetchUserId";

// Query keys for session management
export const sessionKeys = {
	all: ["session"] as const,
	user: () => [...sessionKeys.all, "user"] as const,
	userId: () => [...sessionKeys.all, "userId"] as const,
} as const;

// Session data type
export type SessionUser = {
	id: string;
	email: string;
	name: string;
	emailVerified: boolean;
	image?: string;
	createdAt: Date;
	updatedAt: Date;
};

export type SessionData = {
	user: SessionUser | null;
	session: {
		id: string;
		userId: string;
		expiresAt: Date;
		token: string;
		ipAddress?: string;
		userAgent?: string;
	} | null;
};

// Query function to get full session data
export const getSessionQuery = queryOptions({
	queryKey: sessionKeys.user(),
	queryFn: async (): Promise<SessionData | null> => {
		try {
			const session = await authClient.getSession();
			return session.data || null;
		} catch (error) {
			console.error("Failed to fetch session:", error);
			return null;
		}
	},
	staleTime: 5 * 60 * 1000, // 5 minutes
	gcTime: 10 * 60 * 1000, // 10 minutes
	retry: (failureCount, error) => {
		// Don't retry on authentication errors
		if (error && typeof error === 'object' && 'status' in error) {
			const status = (error as any).status;
			if (status === 401 || status === 403) {
				return false;
			}
		}
		return failureCount < 2;
	},
});

// Simplified query for just user ID (for server-side compatibility)
export const getUserIdQuery = queryOptions({
	queryKey: sessionKeys.userId(),
	queryFn: async (): Promise<string | null> => {
		try {
			const { userId } = await fetchUserId();
			return userId || null;
		} catch (error) {
			console.error("Failed to fetch user ID:", error);
			return null;
		}
	},
	staleTime: 5 * 60 * 1000, // 5 minutes
	gcTime: 10 * 60 * 1000, // 10 minutes
	retry: (failureCount, error) => {
		// Don't retry on authentication errors
		if (error && typeof error === 'object' && 'status' in error) {
			const status = (error as any).status;
			if (status === 401 || status === 403) {
				return false;
			}
		}
		return failureCount < 2;
	},
});

// Helper function to invalidate all session queries
export const invalidateSessionQueries = (queryClient: any) => {
	return queryClient.invalidateQueries({
		queryKey: sessionKeys.all,
	});
};

// Helper function to clear session cache
export const clearSessionCache = (queryClient: any) => {
	queryClient.removeQueries({
		queryKey: sessionKeys.all,
	});
};

// Helper function to set session data in cache
export const setSessionData = (queryClient: any, sessionData: SessionData | null) => {
	queryClient.setQueryData(sessionKeys.user(), sessionData);
	queryClient.setQueryData(sessionKeys.userId(), sessionData?.user?.id || null);
};
