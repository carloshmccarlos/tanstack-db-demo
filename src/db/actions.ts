import { jokeCollection, likedJokesCollection } from "~/db/collections";
import type { JokeInput, JokeUpdate, LikeJokeInput } from "~/validation/types";

export const createLikedJoke = ({ userId, jokeId }: LikeJokeInput) => {
	likedJokesCollection.insert({
		id: "",
		jokeId,
		userId,
		createdAt: new Date(),
	});
};

export const removeLikedJoke = ({ removeId }: { removeId: string }) => {
	if (removeId) {
		likedJokesCollection.delete(removeId);
		return;
	}
};

export const createJoke = (joke: JokeInput) => {
	jokeCollection.insert({
		...joke,
		id: "placeholder",
	});
};

export const deleteJoke = (id: string) => {
	jokeCollection.delete(id);
};

export const updateJoke = (joke: JokeUpdate) => {
	jokeCollection.update(joke.id, (draft) => {
		draft.question = joke.question;
		draft.answer = joke.answer;
	});
};
