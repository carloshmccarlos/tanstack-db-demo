import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { getUserIdQuery, type SessionData } from "~/lib/auth/session-queries";
import { useSession } from "~/lib/auth/use-session";

// Session context for providing session data throughout the app
type SessionContextType = {
	userId: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	isError: boolean;
	refreshSession: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | null>(null);

type SessionProviderProps = {
	children: ReactNode;
	/**
	 * Initial user ID from server-side rendering
	 */
	initialUserId?: string;
};

/**
 * Session provider that manages authentication state across the app
 * Uses TanStack Query for reactive session management
 */
export function SessionProvider({ children, initialUserId }: SessionProviderProps) {
	const { userId, isAuthenticated, isLoading, isError, refreshSession } = useSession({
		userIdOnly: true,
	});

	// Initialize session cache with server-side data if available
	const userIdQuery = useQuery(getUserIdQuery);
	
	useEffect(() => {
		if (initialUserId && !userIdQuery.data) {
			// Set initial data in cache to prevent unnecessary refetch
			userIdQuery.refetch();
		}
	}, [initialUserId, userIdQuery]);

	const contextValue: SessionContextType = {
		userId: userId || initialUserId || null,
		isAuthenticated: isAuthenticated || Boolean(initialUserId),
		isLoading,
		isError,
		refreshSession,
	};

	return (
		<SessionContext.Provider value={contextValue}>
			{children}
		</SessionContext.Provider>
	);
}

/**
 * Hook to access session context
 * Throws error if used outside SessionProvider
 */
export function useSessionContext(): SessionContextType {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useSessionContext must be used within a SessionProvider");
	}
	return context;
}

/**
 * Hook to check if user is authenticated
 * Returns boolean and loading state
 */
export function useIsAuthenticated(): {
	isAuthenticated: boolean;
	isLoading: boolean;
} {
	const { isAuthenticated, isLoading } = useSessionContext();
	return { isAuthenticated, isLoading };
}

/**
 * Hook to get current user ID
 * Returns user ID or null if not authenticated
 */
export function useCurrentUserId(): string | null {
	const { userId } = useSessionContext();
	return userId;
}
