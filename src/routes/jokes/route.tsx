import { createFileRoute, Outlet } from "@tanstack/react-router";
import { JokesList } from "~/components/JokesLIst";
import { getJokes } from "~/serverFn/jokesServerFn";

//use for layout

export const Route = createFileRoute("/jokes")({
	loader: async ({ context }) => {
		const userId = context.userId;
		const jokes = await getJokes();
		return {
			userId,
			jokes,
		};
	},
	component: App,
	staleTime: 10_000,
});

function App() {
	const { jokes } = Route.useLoaderData();

	return (
		<div className="container mx-auto py-6 px-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="w-full">
					<div className="bg-white rounded-lg shadow-sm p-6">
						<JokesList jokes={jokes} />
					</div>
				</div>
				<div className="w-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
