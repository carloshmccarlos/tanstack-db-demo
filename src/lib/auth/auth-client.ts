import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	// Point to the auth API endpoint
	baseURL:
		typeof window !== "undefined"
			? `${window.location.origin}/api/auth`
			: "http://localhost:3000/api/auth",
	// Ensure cookie-based session handling is enabled
	cookieOptions: {
		name: "auth.session",
		path: "/",
	},
});
