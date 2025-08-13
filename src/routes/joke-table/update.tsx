import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";
import JokeForm from "~/components/JokeForm";
import { getJokeById } from "~/serverFn/jokesServerFn";

export const Route = createFileRoute("/joke-table/update")({
	validateSearch: v.object({
		id: v.string(),
	}),
	loaderDeps: ({ search: id }) => {
		return { id };
	},
	loader: async ({ deps }) => {
		const { id } = deps.id;

		const joke = await getJokeById({ data: id });

		return {
			joke,
		};
	},

	component: RouteComponent,
});

function RouteComponent() {
	const { joke } = Route.useLoaderData();

	return <JokeForm joke={joke} />;
}
