import { createFileRoute } from "@tanstack/react-router";
import JokeForm from "~/components/JokeForm";
import { JokesList } from "~/components/JokesLIst";
import { getJokes } from "~/serverFn/jokesServerFn";

export const Route = createFileRoute("/")({
	loader: async () => {
		return await getJokes({ data: undefined });
	},
	component: App,
});

function App() {
	const jokes = Route.useLoaderData();

	return (
		<main className={"px-48"}>
			<h1 className={"text-2xl"}>DevJokes</h1>
			<div className={"p-4 flex flex-col  justify-center gap-8"}>
				<JokeForm />
				<JokesList jokes={jokes} />
			</div>
		</main>
	);
}
