import { ProtectedRoute } from "~/components/ProtectedRoute";
import { UserProfile } from "~/components/UserProfile";
import { useAuthenticatedSession, useSession, useUserId } from "~/lib/auth/use-session";

/**
 * Demo component showing different ways to use session management
 */
export function SessionDemo() {
	return (
		<div className="container mx-auto py-8 px-4 space-y-8">
			<h1 className="text-3xl font-bold mb-8">Session Management Demo</h1>
			
			{/* Basic session usage */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Basic Session Hook</h2>
				<BasicSessionExample />
			</section>

			{/* User ID only hook */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">User ID Hook</h2>
				<UserIdExample />
			</section>

			{/* Protected content */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Protected Content</h2>
				<ProtectedRoute
					fallbackComponent={
						<div className="p-4 border rounded-lg border-yellow-200 bg-yellow-50">
							<p className="text-yellow-800">
								This content is only available to authenticated users.
							</p>
						</div>
					}
				>
					<div className="p-4 border rounded-lg border-green-200 bg-green-50">
						<p className="text-green-800">
							🎉 You can see this because you're authenticated!
						</p>
					</div>
				</ProtectedRoute>
			</section>

			{/* Authenticated session hook */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">Authenticated Session Hook</h2>
				<AuthenticatedSessionExample />
			</section>

			{/* User profile component */}
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">User Profile</h2>
				<UserProfile />
			</section>
		</div>
	);
}

function BasicSessionExample() {
	const { user, userId, isAuthenticated, isLoading, isError } = useSession();

	return (
		<div className="p-4 border rounded-lg">
			<h3 className="font-semibold mb-2">Session Status</h3>
			<div className="space-y-1 text-sm">
				<div>Loading: {isLoading ? "Yes" : "No"}</div>
				<div>Error: {isError ? "Yes" : "No"}</div>
				<div>Authenticated: {isAuthenticated ? "Yes" : "No"}</div>
				<div>User ID: {userId || "None"}</div>
				<div>User Name: {user?.name || "Not available"}</div>
			</div>
		</div>
	);
}

function UserIdExample() {
	const { userId, isAuthenticated, isLoading } = useUserId();

	return (
		<div className="p-4 border rounded-lg">
			<h3 className="font-semibold mb-2">User ID Only</h3>
			<div className="space-y-1 text-sm">
				<div>Loading: {isLoading ? "Yes" : "No"}</div>
				<div>Authenticated: {isAuthenticated ? "Yes" : "No"}</div>
				<div>User ID: {userId || "None"}</div>
			</div>
		</div>
	);
}

function AuthenticatedSessionExample() {
	// This hook will automatically redirect to auth page if not authenticated
	const { user, isLoading } = useAuthenticatedSession();

	if (isLoading) {
		return (
			<div className="p-4 border rounded-lg">
				<p>Checking authentication...</p>
			</div>
		);
	}

	return (
		<div className="p-4 border rounded-lg border-blue-200 bg-blue-50">
			<h3 className="font-semibold mb-2">Authenticated User</h3>
			<p className="text-blue-800">
				Welcome, {user?.name || "User"}! This component uses the authenticated session hook.
			</p>
		</div>
	);
}
