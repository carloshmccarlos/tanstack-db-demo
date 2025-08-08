import { redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { authClient } from "~/lib/auth/auth-client";
import type { UserRegister } from "~/validation/types";

export async function signUpWithEmail({ email, password, name }: UserRegister) {
	const { data, error } = await authClient.signUp.email(
		{
			email,
			password,
			name,
			callbackURL: "/auth/result",
		},
		{
			onRequest: () => {
				//show loading
			},
			onSuccess: () => {
				redirect({
					to: "/auth",
					search: { type: "login" },
				});
			},
			onError: (ctx) => {
				toast.error(ctx.error.message);
			},
		},
	);

	return { data, error };
}
