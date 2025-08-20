import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";
import JokeForm from "~/components/JokeForm";

export const Route = createFileRoute("/joke-table/update")({
	validateSearch: v.object({
		id: v.string(),
	}),

	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useSearch();

	return <JokeForm key={id} id={id} />;
}
