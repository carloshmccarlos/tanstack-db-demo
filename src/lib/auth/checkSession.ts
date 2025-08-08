import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth/auth";

/**
 * Simple client-side session check function
 */
export const checkSession = createServerFn({
	method: "GET",
}).handler(async () => {
	const request = getWebRequest();

	const session = await auth.api.getSession({ headers: request.headers });

	if (!session) {
		throw redirect({
			to: "/auth",
			search: { type: "login" },
		});
	}

	return { userId: session?.user?.id };
});
