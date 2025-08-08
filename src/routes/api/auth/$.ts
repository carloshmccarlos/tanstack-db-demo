import { createServerFileRoute } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth/auth";

export const ServerRoute = createServerFileRoute("/api/auth/$").methods({
	GET: ({ request }) => {
		console.log("Auth API GET request", request.url);
		return auth.handler(request);
	},
	POST: ({ request }) => {
		console.log("Auth API POST request", request.url);
		return auth.handler(request);
	},
});
