import { authClient } from "~/lib/auth/auth-client";
import { clearSessionCache } from "~/lib/auth/session-queries";
import { queryClient } from "~/lib/queryClient";

export default async function signOut() {
	try {
		await authClient.signOut({});

		// Clear all session-related cache
		clearSessionCache(queryClient);

		return { success: true };
	} catch (error) {
		console.error("Sign out error:", error);
		throw error;
	}
}
