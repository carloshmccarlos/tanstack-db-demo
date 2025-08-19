import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";
import JokeForm from "~/components/JokeForm";

export const Route = createFileRoute("/joke-table/update")({
	validateSearch: v.object({
		id: v.string(),
	}),
	loaderDeps: ({ search: id }) => {
		return { id };
	},
	loader: async ({ deps }) => {
		const { id } = deps.id;

		return {
			id,
		};
	},

	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useLoaderData();

	return <JokeForm key={id} id={id} />;
}
