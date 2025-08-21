import { eq } from "@tanstack/db";
import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import JokeDetail from "~/components/JokeDetail";
import { jokeCollection, likedJokesCollection } from "~/db/collections";

export const Route = createFileRoute("/jokes/$id")({
	loader: async () => {
		await likedJokesCollection.preload();
	},
	ssr: false,
	component: RouteComponent,
});

function RouteComponent() {
	const { userId } = Route.useRouteContext();
	const { id: jokeId } = Route.useParams();

	const {
		data: likedJokesByUserData,
		isLoading: likedLoading,
		isError: likedError,
	} = useLiveQuery((q) =>
		q
			.from({ likedJoke: likedJokesCollection })
			.where(({ likedJoke }) => eq(likedJoke.jokeId, jokeId)),
	);
	const {
		data: jokeData,
		isLoading: jokeLoading,
		isError: jokeError,
	} = useLiveQuery((q) =>
		q.from({ joke: jokeCollection }).where(({ joke }) => eq(joke.id, jokeId)),
	);

	if (likedLoading || jokeLoading) {
		return (
			<div className="container mx-auto py-6 px-4">
				<div className="flex justify-center items-center h-64">
					<p>Loading joke...</p>
				</div>
			</div>
		);
	}

	if (likedError || jokeError || !jokeData?.[0]) {
		return (
			<div className="container mx-auto py-6 px-4">
				<div className="flex justify-center items-center h-64">
					<p className="text-red-500">Error loading joke</p>
				</div>
			</div>
		);
	}

	const joke = jokeData[0];
	const likedJokeId = likedJokesByUserData?.[0]?.id as string | undefined;

	return (
		<JokeDetail
			key={jokeId}
			userId={userId || ""}
			jokeId={jokeId}
			joke={joke}
			likedJokeId={likedJokeId}
		/>
	);
}
