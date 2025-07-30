import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { methods } from "netlify";
import { v4 as uuidv4 } from "uuid";
import * as v from "valibot";
import { db } from "~/db/client";
import { jokes } from "~/db/schema";
import { addJokeSchema, jokeSchema } from "~/validation/schema";
import type { JokeInput, JokeInsert, JokeUpdate } from "~/validation/types";

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

export const getJokeById = createServerFn({
	method: "GET",
})
	.validator(v.string("Your id must be a string"))
	.handler(async ({ data }) => {
		try {
			const result = await db.select().from(jokes).where(eq(jokes.id, data));
			if (result.length === 0) {
				return null;
			}
			return result[0];
		} catch (error) {
			console.error("Failed to read joke:", error);
			return null;
		}
	});

export const addJoke = createServerFn({
	method: "POST",
})
	.validator(addJokeSchema)
	.handler(async ({ data }: { data: JokeInput }) => {
		try {
			const newJoke: JokeInsert = {
				...data,
				id: uuidv4(),
			};

			const resultId = await db
				.insert(jokes)
				.values(newJoke)
				.returning({ id: jokes.id });
			return resultId[0].id;
		} catch (error) {
			console.error("Failed to add joke:", error);
			return "";
		}
	});

export const updateJoke = createServerFn({
	method: "POST",
})
	.validator(jokeSchema)
	.handler(async ({ data }: { data: JokeUpdate }) => {
		try {
			const existedJoke = await db
				.select()
				.from(jokes)
				.where(eq(jokes.id, data.id));

			if (!existedJoke) {
				console.error("Joke does not exist.");
				throw new Error(`Joke does not exist.`);
			}

			const updatedJoke = {
				...existedJoke,
				question: data.question,
				answer: data.answer,
			};

			const result = await db
				.update(jokes)
				.set(updatedJoke)
				.where(eq(jokes.id, data.id))
				.returning({ id: jokes.id });

			return result[0].id;
		} catch (error) {
			console.error("Failed to update joke:", error);
			return "";
		}
	});
