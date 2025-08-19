import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { v4 as uuidv4 } from "uuid";
import * as v from "valibot";
import { db } from "~/db/client";
import { joke } from "~/db/schema";
import { addJokeSchema, jokeSchema } from "~/validation/schema";
import type { JokeInsert, JokeSelect, JokeUpdate } from "~/validation/types";

/**
 * This file contains server functions for joke operations using Postgres database.
 */

export const getJokes = createServerFn({
	method: "GET",
}).handler(async () => {
	try {
		return await db.select().from(joke);
	} catch (error) {
		console.error("Failed to read jokes:", error);
		return [];
	}
});

export const getJokeById = createServerFn({
	method: "GET",
})
	.validator(v.string())
	.handler(async ({ data }) => {
		try {
			const result = await db.select().from(joke).where(eq(joke.id, data));
			if (result.length === 0) {
				return null;
			}
			return result[0];
		} catch (error) {
			console.error("Failed to read joke:", error);
			return null;
		}
	});

export const createJoke = createServerFn({
	method: "POST",
})
	.validator(addJokeSchema)
	.handler(async ({ data }) => {
		try {
			const newJoke: JokeInsert = {
				...data,
				id: uuidv4(),
			};

			const resultId = await db
				.insert(joke)
				.values(newJoke)
				.returning({ id: joke.id });
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
	.handler(async ({ data }) => {
		try {
			const existedJoke = await db
				.select()
				.from(joke)
				.where(eq(joke.id, data.id));

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
				.update(joke)
				.set(updatedJoke)
				.where(eq(joke.id, data.id))
				.returning({ id: joke.id });

			return result[0].id;
		} catch (error) {
			console.error("Failed to update joke:", error);
			return "";
		}
	});

export const deleteJoke = createServerFn({
	method: "POST",
})
	.validator(jokeSchema)
	.handler(async ({ data }) => {
		try {
			await db.delete(joke).where(eq(joke.id, data.id));
			return true;
		} catch (error) {
			console.error("Failed to delete joke:", error);
			return false;
		}
	});
