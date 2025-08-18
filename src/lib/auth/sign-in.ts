import { toast } from "sonner";
import { authClient } from "~/lib/auth/auth-client";
import type { UserLogin } from "~/validation/types";

export async function signInWithEmail({ email, password }: UserLogin) {
	await authClient.signIn.email(
		{
			email,
			password,

			callbackURL: "/",

			rememberMe: true,
		},
		{
			onSuccess: async () => {
				toast.success("Login successfully");
			},
			onError: async (ctx) => {
				if (ctx.error.status === 403) {
					toast.error("Please verified your email.");
				}

				toast.error(ctx.error.message);
			},
		},
	);
}
