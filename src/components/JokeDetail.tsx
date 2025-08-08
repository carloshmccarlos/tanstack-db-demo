import { eq, useLiveQuery } from "@tanstack/react-db";
import { Heart, HeartOff } from "lucide-react";
import { Button } from "~/components/ui/button";
import { likedJokesCollection } from "~/db/collections";
import type { JokeSelect } from "~/validation/types";

interface Props {
	joke: JokeSelect;
	userId: string;
}

export default function JokeDetail({ joke, userId }: Props) {
	const { data: likedJokesByUser, isLoading } = useLiveQuery((q) =>
		q
			.from({ likedJoke: likedJokesCollection })
			.where(({ likedJoke }) => eq(likedJoke.jokeId, joke.id)),
	);

	const isLiked = likedJokesByUser.find(
		(likedJoke) => likedJoke.jokeId === joke.id,
	);

	const addLikedJoke = () => {
		likedJokesCollection.insert({
			id: "",
			jokeId: joke.id,
			userId: userId,
			createdAt: new Date(),
		});
	};

	const removeLikedJoke = () => {
		likedJokesCollection.delete(isLiked?.id || "");
	};

	/*const queryClient = useQueryClient();

	const { data: isLiked, isLoading } = useQuery({
		queryKey: ["isLiked", joke.id],
		queryFn: () => hasUserLikedJoke({ data: { jokeId: joke.id, userId } }),
	});

	const toggleLikeMutation = useMutation({
		mutationFn: () => toggleLikeJoke({ data: { jokeId: joke.id, userId } }),
		// When mutate is called:
		onMutate: async () => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: ["isLiked", joke.id] });

			// Snapshot the previous value
			const previousIsLiked: boolean =
				queryClient.getQueryData(["isLiked", joke.id]) || false;

			// Optimistically update to the new value
			queryClient.setQueryData(["isLiked", joke.id], (old: boolean) => !old);

			// Return a context object with the snapshotted value
			return { previousIsLiked };
		},
		// If the mutation fails, use the context returned from onMutate to roll back
		onError: (err, newTodo, context) => {
			if (context) {
				queryClient.setQueryData(["isLiked", joke.id], context.previousIsLiked);
			}
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["isLiked", joke.id] }).then();
		},
	});*/

	return (
		<div className="flex flex-col gap-6 p-4 md:p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
			<div className="space-y-4">
				<div className="flex justify-between items-start">
					<h3 className="text-2xl font-semibold leading-none tracking-tight text-primary">
						{joke.question}
					</h3>
				</div>

				<div className="mt-6 text-lg text-primary animate-in fade-in slide-in-from-bottom-4">
					<p>{joke.answer}</p>
				</div>

				<Button
					variant="outline"
					className={"cursor-pointer"}
					disabled={isLoading}
					// onClick={() => toggleLikeMutation.mutate()}
					onClick={isLiked ? removeLikedJoke : addLikedJoke}
				>
					{isLiked ? (
						<Heart className="text-red-500 w-5 h-5" />
					) : (
						<HeartOff className="text-black  w-5 h-5" />
					)}
				</Button>
			</div>
		</div>
	);
}
