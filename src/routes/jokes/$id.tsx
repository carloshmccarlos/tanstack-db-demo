import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import JokeDetail from "~/components/JokeDetail";
import { getJokeById } from "~/serverFn/jokesServerFn";

export const Route = createFileRoute("/jokes/$id")({
	loader: async ({ params, context }) => {
		const id = params.id;
		const joke = await getJokeById({ data: id });
		const userId = context.userId;
		return {
			joke,
			userId,
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { joke, userId } = Route.useLoaderData();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!joke) {
		return <p>Joke not found!</p>;
	}

	if (isClient) {
		return <JokeDetail userId={userId || ""} joke={joke} />;
	}

	return <p>Loading...</p>;
}
