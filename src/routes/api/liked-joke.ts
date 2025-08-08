import {
	createServerFileRoute,
	getWebRequest,
} from "@tanstack/react-start/server";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "~/db/client";
import { liked } from "~/db/schema";
import { auth } from "~/lib/auth/auth";

export const ServerRoute = createServerFileRoute("/api/liked-joke").methods({
	GET: async () => {
		try {
			// Get the request to access headers for authentication
			const request = getWebRequest();
			const session = await auth.api.getSession({ headers: request.headers });

			if (!session?.user?.id) {
				return new Response(JSON.stringify({ error: "Unauthorized" }), {
					status: 401,
					headers: { "Content-Type": "application/json" },
				});
			}

			const userId = session.user.id;
			const likedJokes = await db
				.select()
				.from(liked)
				.where(eq(liked.userId, userId));

			return new Response(JSON.stringify(likedJokes), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} catch (error) {
			console.error("Failed to get liked jokes:", error);
			return new Response(JSON.stringify({ error: "Internal server error" }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}
	},
	POST: async ({ request }) => {
		const { jokeId, userId } = await request.json();

		try {
			await db.insert(liked).values({
				id: uuidv4(),
				jokeId,
				userId,
			});
		} catch (error) {
			console.error("Failed to add liked joke:", error);
			return new Response(JSON.stringify({ error: "Internal server error" }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}
	},

	DELETE: async ({ request }) => {
		const { jokeId, userId } = await request.json();

		try {
			await db
				.delete(liked)
				.where(and(eq(liked.jokeId, jokeId), eq(liked.userId, userId)));
		} catch (error) {
			console.error("Failed to unlike joke:", error);
			return new Response(JSON.stringify({ error: "Internal server error" }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}
	},
});
