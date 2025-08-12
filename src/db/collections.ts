import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import JokeForm from "~/components/JokeForm";
import { queryClient } from "~/lib/queryClient";
import {
	addJoke,
	deleteJoke,
	getJokes,
	updateJoke,
} from "~/serverFn/jokesServerFn";
import {
	createLikedJoke,
	getLikedJokesByUser,
	unlikeJoke,
} from "~/serverFn/likesServerFn";
import type {
	JokeInput,
	JokeSelect,
	LikedJokeSelect,
} from "~/validation/types";

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

export const jokeCollection = createCollection(
	queryCollectionOptions({
		queryClient,
		queryKey: ["Jokes"],
		queryFn: async () => {
			const jokes: JokeSelect[] = await getJokes();

			return jokes || [];
		},
		getKey: (item) => item.id,

		onInsert: async ({ transaction }) => {
			const { modified: newJoke } = transaction.mutations[0];
			await addJoke({ data: newJoke });
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
