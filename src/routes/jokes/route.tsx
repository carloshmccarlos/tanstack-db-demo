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
	return (
		<div className="container mx-auto py-6 px-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="w-full">
					<div className="bg-white rounded-lg shadow-sm p-6">
						<JokesList />
					</div>
				</div>
				<div className="w-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
