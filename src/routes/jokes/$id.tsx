import { createFileRoute } from "@tanstack/react-router";
import JokeDetail from "~/components/JokeDetail";

export const Route = createFileRoute("/jokes/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { userId } = Route.useRouteContext();
	const { id: jokeId } = Route.useParams();

	return <JokeDetail key={jokeId} userId={userId || ""} jokeId={jokeId} />;
}
