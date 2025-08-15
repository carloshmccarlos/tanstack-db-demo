import { toast } from "sonner";
import { authClient } from "~/lib/auth/auth-client";
import { invalidateSessionQueries, setSessionData } from "~/lib/auth/session-queries";
import { queryClient } from "~/lib/queryClient";
import type { UserRegister } from "~/validation/types";

export async function signUpWithEmail({ email, password, name }: UserRegister) {
	try {
		const { data, error } = await authClient.signUp.email(
			{
				email,
				password,
				name,
				callbackURL: "/jokes",
			},
			{
				onRequest: () => {
					// Show loading state if needed
				},
				onSuccess: async (ctx) => {
					toast.success("Account created successfully");

					// Update session cache with new session data
					if (ctx.data) {
						setSessionData(queryClient, ctx.data);
					}

					// Invalidate and refetch session queries
					await invalidateSessionQueries(queryClient);
				},
				onError: (ctx) => {
					toast.error(ctx.error.message || "Failed to create account");
				},
			},
		);

		return { data, error };
	} catch (error) {
		console.error("Sign up error:", error);
		toast.error("An unexpected error occurred during sign up");
		throw error;
	}
}
