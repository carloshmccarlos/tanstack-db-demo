import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import JokeDetail from "~/components/JokeDetail";
import { getJokeById } from "~/serverFn/jokesServerFn";

export const Route = createFileRoute("/jokes/$id")({
	loader: async ({ params }) => {
		const id = params.id;
		const joke = await getJokeById({ data: id });
		return {
			joke,
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { joke } = Route.useLoaderData();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!joke) {
		return <p>Joke not found!</p>;
	}

	if (isClient) {
		return <JokeDetail joke={joke} />;
	}

	return <p>Loading...</p>;
}
