import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth/auth";

// Define the context type that this middleware provides
type UserIdContext = {
	userId: string | undefined;
};

export const getUserIdMiddleWare = createMiddleware({
	type: "function",
}).server<UserIdContext>(async ({ next }) => {
	const request = getWebRequest();
	const session = await auth.api.getSession({ headers: request.headers });
	const userId = session?.user.id;

	return next({
		context: {
			userId,
		},
	});
});
