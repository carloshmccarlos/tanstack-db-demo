import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { authClient } from "~/lib/auth/auth-client";
import {
	clearSessionCache,
	getSessionQuery,
	getUserIdQuery,
	invalidateSessionQueries,
	setSessionData,
	type SessionData,
	type SessionUser,
} from "~/lib/auth/session-queries";

export type UseSessionOptions = {
	/**
	 * Whether to use server-side compatible user ID query instead of full session
	 * Useful for SSR/SSG scenarios
	 */
	userIdOnly?: boolean;
	/**
	 * Whether to redirect to auth page when session is invalid
	 */
	redirectOnError?: boolean;
	/**
	 * Custom redirect path for authentication
	 */
	authRedirectPath?: string;
};

export type SessionState = {
	user: SessionUser | null;
	userId: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
};

export type SessionActions = {
	signOut: () => Promise<void>;
	refreshSession: () => Promise<void>;
	clearSession: () => void;
};

export type UseSessionReturn = SessionState & SessionActions;

/**
 * Hook for managing user session with TanStack Query
 * Provides reactive session state, authentication status, and session actions
 */
export function useSession(options: UseSessionOptions = {}): UseSessionReturn {
	const {
		userIdOnly = false,
		redirectOnError = false,
		authRedirectPath = "/auth?type=login",
	} = options;

	const queryClient = useQueryClient();
	const router = useRouter();

	// Choose query based on options
	const sessionQuery = useQuery(userIdOnly ? getUserIdQuery : getSessionQuery);

	// Extract session data
	const sessionData = sessionQuery.data as SessionData | null;
	const userId = userIdOnly 
		? (sessionQuery.data as string | null)
		: sessionData?.user?.id || null;
	const user = userIdOnly ? null : sessionData?.user || null;

	// Session state
	const isAuthenticated = Boolean(userId);
	const isLoading = sessionQuery.isLoading;
	const isError = sessionQuery.isError;
	const error = sessionQuery.error;

	// Handle authentication errors
	useEffect(() => {
		if (isError && redirectOnError && !isLoading) {
			// Only redirect if we're not already on the auth page
			const currentPath = window.location.pathname;
			if (!currentPath.startsWith("/auth")) {
				router.navigate({ to: authRedirectPath });
			}
		}
	}, [isError, redirectOnError, isLoading, router, authRedirectPath]);

	// Session actions
	const signOut = useCallback(async () => {
		try {
			await authClient.signOut();
			clearSessionCache(queryClient);
			toast.success("Signed out successfully");
			
			// Redirect to auth page
			router.navigate({ to: authRedirectPath });
		} catch (error) {
			console.error("Sign out error:", error);
			toast.error("Failed to sign out");
		}
	}, [queryClient, router, authRedirectPath]);

	const refreshSession = useCallback(async () => {
		try {
			await invalidateSessionQueries(queryClient);
		} catch (error) {
			console.error("Session refresh error:", error);
			toast.error("Failed to refresh session");
		}
	}, [queryClient]);

	const clearSession = useCallback(() => {
		clearSessionCache(queryClient);
	}, [queryClient]);

	return {
		// State
		user,
		userId,
		isAuthenticated,
		isLoading,
		isError,
		error,
		// Actions
		signOut,
		refreshSession,
		clearSession,
	};
}

/**
 * Hook for getting just the user ID (server-compatible)
 * Useful when you only need to check authentication status
 */
export function useUserId(): {
	userId: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
} {
	const { userId, isAuthenticated, isLoading } = useSession({ userIdOnly: true });
	return { userId, isAuthenticated, isLoading };
}

/**
 * Hook for protected routes that require authentication
 * Automatically redirects to auth page if not authenticated
 */
export function useAuthenticatedSession(): UseSessionReturn {
	return useSession({ redirectOnError: true });
}

/**
 * Hook for session management with custom error handling
 */
export function useSessionWithErrorHandling(
	onError?: (error: Error) => void
): UseSessionReturn {
	const session = useSession();

	useEffect(() => {
		if (session.isError && session.error && onError) {
			onError(session.error);
		}
	}, [session.isError, session.error, onError]);

	return session;
}
