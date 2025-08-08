import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import { queryClient } from "~/lib/queryClient";
import {
	createLikedJoke,
	getLikedJokesByUser,
	unlikeJoke,
} from "~/serverFn/likesServerFn";
import type { LikedJokeSelect } from "~/validation/types";

export const likedJokesCollection = createCollection(
	queryCollectionOptions({
		queryClient,
		queryKey: ["likedJokes"],
		queryFn: async () => {
			/*const response = await fetch("/api/liked-joke");
			const likedJokes: LikedJokeSelect[] = await response.json();*/

			const likedJokes: LikedJokeSelect[] = await getLikedJokesByUser();

			return likedJokes || [];
		},
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
