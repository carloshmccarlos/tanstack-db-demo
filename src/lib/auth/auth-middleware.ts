import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth/auth";

export const authMiddleware = createMiddleware({ type: "function" }).server(
	async ({ next }) => {
		const request = getWebRequest();
		const session = await auth.api.getSession({
			headers: request.headers,
		});

		return await next({
			context: {
				user: {
					id: session?.user.id,
					name: session?.user.name,
					image: session?.user.image,
				},
				isAuthenticated: !!session?.user.id,
			},
		});
	},
);
