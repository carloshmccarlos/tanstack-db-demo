import { QueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "~/db/client";
import { liked } from "~/db/schema";
import { authMiddleware } from "~/lib/auth/auth-middleware";
import { likeJokeSchema } from "~/validation/schema";
import type { LikeJokeInput } from "~/validation/types";

export const getLikedJokesByUser = createServerFn({
    method: "GET",
})
    .middleware([authMiddleware])
    .handler(async ({ context }) => {
        try {
            const userId = context?.user?.id ?? null;
            if (!userId) {
                return [];
            }
            const likedJokes = await db
                .select()
                .from(liked)
                .where(eq(liked.userId, userId));

            return likedJokes;
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
