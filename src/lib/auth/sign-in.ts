import { toast } from "sonner";
import { authClient } from "~/lib/auth/auth-client";
import { invalidateSessionQueries, setSessionData } from "~/lib/auth/session-queries";
import { queryClient } from "~/lib/queryClient";
import type { UserLogin } from "~/validation/types";

export async function signInWithEmail({ email, password }: UserLogin) {
	try {
		const result = await authClient.signIn.email(
			{
				email,
				password,
				callbackURL: "/jokes",
				rememberMe: true,
			},
			{
				onSuccess: async (ctx) => {
					toast.success("Login successfully");

					// Update session cache with new session data
					if (ctx.data) {
						setSessionData(queryClient, ctx.data);
					}

					// Invalidate and refetch session queries
					await invalidateSessionQueries(queryClient);
				},
				onError: async (ctx) => {
					if (ctx.error.status === 403) {
						toast.error("Please verify your email.");
					} else {
						toast.error(ctx.error.message || "Login failed");
					}
				},
			},
		);

		return result;
	} catch (error) {
		console.error("Sign in error:", error);
		toast.error("An unexpected error occurred during sign in");
		throw error;
	}
}
