import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { JokesList } from "~/components/JokesLIst";
import { jokeCollection } from "~/db/collections";

export const Route = createFileRoute("/jokes")({
	loader: async () => {
		await jokeCollection.preload();
	},
	ssr: false,
	component: App,
});

function App() {
	const {
		data: jokes,
		isLoading,
		isError,
	} = useLiveQuery((q) => q.from({ joke: jokeCollection }));

	if (isLoading) {
		return (
			<div className="container mx-auto py-6 px-4">
				<div className="flex justify-center items-center h-64">
					<p>Loading jokes...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="container mx-auto py-6 px-4">
				<div className="flex justify-center items-center h-64">
					<p className="text-red-500">Error loading jokes</p>
				</div>
			</div>
		);
	}
	return (
		<div className="container mx-auto py-6 px-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="w-full">
					<div className="bg-white rounded-lg shadow-sm p-6">
						<JokesList jokes={jokes ?? []} />
					</div>
				</div>
				<div className="w-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
