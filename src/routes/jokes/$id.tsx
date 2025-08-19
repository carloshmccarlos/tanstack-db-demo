import { createFileRoute } from "@tanstack/react-router";
import JokeDetail from "~/components/JokeDetail";
import { likedJokesCollection } from "~/db/collections";

export const Route = createFileRoute("/jokes/$id")({
	loader: async ({ params, context }) => {
		await likedJokesCollection.preload();
		const id = params.id;
		const userId = context.userId;

		return {
			jokeId: id,
			userId,
		};
	},

	component: RouteComponent,
});

function RouteComponent() {
	const { userId, jokeId } = Route.useLoaderData();

	return <JokeDetail key={jokeId} userId={userId || ""} jokeId={jokeId} />;
}
