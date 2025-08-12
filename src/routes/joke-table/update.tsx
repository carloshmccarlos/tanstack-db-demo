import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";
import JokeForm from "~/components/JokeForm";
import { jokeCollection } from "~/db/collections";

export const Route = createFileRoute("/joke-table/update")({
	validateSearch: v.object({
		id: v.string(),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { id: jokeId } = Route.useSearch();

	const joke = jokeCollection.get(jokeId);

	return <JokeForm joke={joke} />;
}
