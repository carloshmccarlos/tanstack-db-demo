import { useSession } from "~/lib/auth/use-session";

/**
 * Example component showing how to use session management
 * Displays user information and session status
 */
export function UserProfile() {
	const { user, userId, isAuthenticated, isLoading, isError, signOut, refreshSession } = useSession();

	if (isLoading) {
		return (
			<div className="p-4 border rounded-lg">
				<div className="animate-pulse">
					<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-1/2"></div>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="p-4 border rounded-lg border-red-200 bg-red-50">
				<p className="text-red-600 mb-2">Failed to load user session</p>
				<button
					onClick={refreshSession}
					className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
				>
					Retry
				</button>
			</div>
		);
	}

	if (!isAuthenticated) {
		return (
			<div className="p-4 border rounded-lg border-gray-200">
				<p className="text-gray-600">Not authenticated</p>
			</div>
		);
	}

	return (
		<div className="p-4 border rounded-lg">
			<h3 className="font-semibold mb-3">User Profile</h3>
			
			{user ? (
				<div className="space-y-2">
					<div>
						<span className="font-medium">Name:</span> {user.name}
					</div>
					<div>
						<span className="font-medium">Email:</span> {user.email}
					</div>
					<div>
						<span className="font-medium">User ID:</span> {user.id}
					</div>
					<div>
						<span className="font-medium">Email Verified:</span>{" "}
						{user.emailVerified ? "Yes" : "No"}
					</div>
					<div>
						<span className="font-medium">Member Since:</span>{" "}
						{new Date(user.createdAt).toLocaleDateString()}
					</div>
				</div>
			) : (
				<div>
					<div>
						<span className="font-medium">User ID:</span> {userId}
					</div>
					<p className="text-sm text-gray-600 mt-2">
						Limited session data available
					</p>
				</div>
			)}

			<div className="flex gap-2 mt-4">
				<button
					onClick={refreshSession}
					className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
				>
					Refresh Session
				</button>
				<button
					onClick={signOut}
					className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
				>
					Sign Out
				</button>
			</div>
		</div>
	);
}
