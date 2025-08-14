import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth/auth";

type SessionData = {
	userId: string | undefined;
};

export const fetchUserId = createServerFn({
	method: "GET",
}).handler(async (): Promise<SessionData> => {
	const request = getWebRequest();
	const session = await auth.api.getSession({ headers: request.headers });
	const userId = session?.user.id;

	return {
		userId,
	};
});
