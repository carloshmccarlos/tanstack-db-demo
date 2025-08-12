import { createServerFn } from "@tanstack/react-start";
import { getUserIdMiddleWare } from "~/lib/middlewares";

export const getSession = createServerFn({
	method: "GET",
})
	.middleware([getUserIdMiddleWare])
	.handler(async ({ context }) => {
		const userId = context.userId;

		return { userId };
	});
