import { toast } from "sonner";
import { jokeCollection, likedJokesCollection } from "~/db/collections";
import type { JokeInput, JokeUpdate, LikeJokeInput } from "~/validation/types";

export const createLikedJoke = ({ userId, jokeId }: LikeJokeInput) => {
	if (!userId) {
		toast.error("Please login to like a joke.");
		return;
	}

	likedJokesCollection.insert({
		id: "",
		jokeId,
		userId,
		createdAt: new Date(),
	});
};

export const removeLikedJoke = ({
	userId,
	removeId,
}: {
	userId: string;
	removeId: string;
}) => {
	if (!userId) {
		toast.error("Please login to unlike a joke.");
		return;
	}

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
