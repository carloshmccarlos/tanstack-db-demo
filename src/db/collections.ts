import { createCollection } from "@tanstack/db";
import { QueryClient } from "@tanstack/query-core";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import {
    createJoke,
    deleteJoke,
    getJokes,
    updateJoke,
} from "~/serverFn/jokes-serverFn";
import {
    createLikedJoke,
    getLikedJokesByUser,
    unlikeJoke,
} from "~/serverFn/likes-serverFn";
import { jokeSchema, likeJokeSchema } from "~/validation/schema";

export const dbQueryClient = new QueryClient();

export const likedJokesCollection = createCollection(
    // @ts-ignore
    queryCollectionOptions({
        queryClient: dbQueryClient,
        queryKey: ["likedJokes"],

        queryFn: getLikedJokesByUser,
        schema: likeJokeSchema,
        getKey: (item) => item.id,
        onInsert: async ({ transaction }) => {
            const { modified: newLikedJoke } = transaction.mutations[0];
            await createLikedJoke({ data: newLikedJoke });
        },

        onDelete: async ({ transaction }) => {
            const { original: deletedLikedJoke } = transaction.mutations[0];
            await unlikeJoke({ data: deletedLikedJoke });
        },
    }),
);

export const jokeCollection = createCollection(
    // @ts-ignore
    queryCollectionOptions({
        queryClient: dbQueryClient,
        queryKey: ["Jokes"],
        queryFn: getJokes,
        schema: jokeSchema,
        getKey: (item) => item.id,

        onInsert: async ({ transaction }) => {
            const { modified: newJoke } = transaction.mutations[0];
            await createJoke({ data: newJoke });
        },

        onUpdate: async ({ transaction }) => {
            const { modified: updatedJoke } = transaction.mutations[0];
            await updateJoke({ data: updatedJoke });
        },

        onDelete: async ({ transaction }) => {
            const { original: deletingJoke } = transaction.mutations[0];
            await deleteJoke({ data: deletingJoke });
        },
    }),
);
