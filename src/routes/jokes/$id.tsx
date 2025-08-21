import { createFileRoute } from "@tanstack/react-router";
import JokeDetail from "~/components/JokeDetail";
import { likedJokesCollection } from "~/db/collections";

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

	return <JokeDetail key={jokeId} userId={userId || ""} jokeId={jokeId} />;
}
