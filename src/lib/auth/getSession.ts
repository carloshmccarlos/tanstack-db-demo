import { createServerFn } from "@tanstack/react-start";
import { getUserIdMiddleWare } from "~/lib/middlewares";

type SessionData = {
	userId: string | undefined;
};

export const getSession = createServerFn({
	method: "GET",
})
	.middleware([getUserIdMiddleWare])
	.handler(async ({ context }): Promise<SessionData> => {
		const userId = context.userId;

		return { userId };
	});
