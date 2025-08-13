import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import * as v from "valibot";
import { db } from "~/db/client";
import { liked } from "~/db/schema";
import { likeJokeSchema } from "~/validation/schema";
import type { LikeJokeInput } from "~/validation/types";

export const getLikedJokesByUser = createServerFn({
	method: "GET",
})
	.validator(v.string())
	.handler(async ({ data }: { data: string }) => {
		try {
			return await db.select().from(liked).where(eq(liked.userId, data));
		} catch (error) {
			console.error("Failed to get likes count:", error);
			return [];
		}
	});

// Get all likes
export const getAllJokeLikes = createServerFn({
	method: "GET",
})
	.validator(v.string("Joke ID must be a string"))
	.handler(async ({ data: jokeId }) => {
		try {
			return await db.select().from(liked).where(eq(liked.jokeId, jokeId));
		} catch (error) {
			console.error("Failed to get likes count:", error);
			return [];
		}
	});

export const createLikedJoke = createServerFn({
	method: "POST",
})
	.validator(likeJokeSchema)
	.handler(async ({ data }: { data: LikeJokeInput }) => {
		try {
			// Check if the like already exists
			const existing = await db
				.select()
				.from(liked)
				.where(
					and(eq(liked.jokeId, data.jokeId), eq(liked.userId, data.userId)),
				);

			if (existing.length > 0) {
				console.error("Joke already existed.");
				return { success: false, message: "Failed to like joke" };
			}

			// Create a new like
			await db.insert(liked).values({
				id: uuidv4(),
				jokeId: data.jokeId,
				userId: data.userId,
			});

			return { success: true, message: "Joke liked successfully" };
		} catch (error) {
			console.error("Failed to like joke:", error);
			return { success: false, message: "Failed to like joke" };
		}
	});

// Unlike a joke
export const hasUserLikedJoke = createServerFn({
	method: "POST",
})
	.validator(likeJokeSchema)
	.handler(async ({ data }: { data: LikeJokeInput }) => {
		try {
			const existing = await db
				.select()
				.from(liked)
				.where(
					and(eq(liked.jokeId, data.jokeId), eq(liked.userId, data.userId)),
				);
			return existing.length > 0;
		} catch (error) {
			console.error("Failed to check if user has liked joke:", error);
			return false;
		}
	});

export const toggleLikeJoke = createServerFn({
	method: "POST",
})
	.validator(likeJokeSchema)
	.handler(async ({ data }: { data: LikeJokeInput }) => {
		try {
			const existing = await db
				.select()
				.from(liked)
				.where(
					and(eq(liked.jokeId, data.jokeId), eq(liked.userId, data.userId)),
				);

			if (existing.length > 0) {
				await db
					.delete(liked)
					.where(
						and(eq(liked.jokeId, data.jokeId), eq(liked.userId, data.userId)),
					);
				return { success: true, message: "Joke unliked successfully" };
			} else {
				await db.insert(liked).values({
					id: uuidv4(),
					jokeId: data.jokeId,
					userId: data.userId,
				});
				return { success: true, message: "Joke liked successfully" };
			}
		} catch (error) {
			console.error("Failed to toggle like joke:", error);
			return { success: false, message: "Failed to toggle like joke" };
		}
	});

// Unlike a joke
export const unlikeJoke = createServerFn({
	method: "POST",
})
	.validator(likeJokeSchema)
	.handler(async ({ data }: { data: LikeJokeInput }) => {
		try {
			await db
				.delete(liked)
				.where(
					and(eq(liked.jokeId, data.jokeId), eq(liked.userId, data.userId)),
				);

			return { success: true, message: "Joke unliked successfully" };
		} catch (error) {
			console.error("Failed to unlike joke:", error);
			return { success: false, message: "Failed to unlike joke" };
		}
	});
