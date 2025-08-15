import { useRouter } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useSession } from "~/lib/auth/use-session";

type ProtectedRouteProps = {
	children: ReactNode;
	/**
	 * Path to redirect to when not authenticated
	 */
	redirectTo?: string;
	/**
	 * Loading component to show while checking authentication
	 */
	loadingComponent?: ReactNode;
	/**
	 * Component to show when not authenticated (instead of redirecting)
	 */
	fallbackComponent?: ReactNode;
};

/**
 * Component that protects routes by checking authentication status
 * Redirects to auth page or shows fallback when not authenticated
 */
export function ProtectedRoute({
	children,
	redirectTo = "/auth?type=login",
	loadingComponent,
	fallbackComponent,
}: ProtectedRouteProps) {
	const router = useRouter();
	const { isAuthenticated, isLoading, isError } = useSession();

	// Redirect to auth page if not authenticated
	useEffect(() => {
		if (!isLoading && !isAuthenticated && !fallbackComponent) {
			router.navigate({ to: redirectTo });
		}
	}, [isAuthenticated, isLoading, router, redirectTo, fallbackComponent]);

	// Show loading state
	if (isLoading) {
		return (
			loadingComponent || (
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
						<p className="text-muted-foreground">Checking authentication...</p>
					</div>
				</div>
			)
		);
	}

	// Show error state
	if (isError) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<p className="text-red-500 mb-4">Authentication error occurred</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	// Show fallback component if not authenticated
	if (!isAuthenticated && fallbackComponent) {
		return <>{fallbackComponent}</>;
	}

	// Show children if authenticated
	if (isAuthenticated) {
		return <>{children}</>;
	}

	// Return null while redirecting
	return null;
}

/**
 * Higher-order component for protecting routes
 */
export function withProtectedRoute<P extends object>(
	Component: React.ComponentType<P>,
	options?: Omit<ProtectedRouteProps, 'children'>
) {
	return function ProtectedComponent(props: P) {
		return (
			<ProtectedRoute {...options}>
				<Component {...props} />
			</ProtectedRoute>
		);
	};
}
