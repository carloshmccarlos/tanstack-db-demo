import { createServerFn } from "@tanstack/react-start";
import { v4 as uuidv4 } from "uuid";
import { db } from "~/db/drizzle/client";
import { jokes } from "~/db/drizzle/schema";
import { addJokeSchema } from "~/validation/schema";
import type { JokeInsert } from "~/validation/types";

/**
 * This file contains server functions for joke operations using Postgres database.
 */

export const getJokes = createServerFn({
	method: "GET",
}).handler(async () => {
	try {
		return await db.select().from(jokes);
	} catch (error) {
		console.error("Failed to read jokes:", error);
		return [];
	}
});

export const addJoke = createServerFn({
	method: "POST",
})
	.validator(addJokeSchema)
	.handler(async ({ data }) => {
		try {
			const newJoke: JokeInsert = {
				...data,
				id: uuidv4(),
			};
			return await db.insert(jokes).values(newJoke).returning({ id: jokes.id });
		} catch (error) {
			console.error("Failed to add joke:", error);
			return false;
		}
	});
