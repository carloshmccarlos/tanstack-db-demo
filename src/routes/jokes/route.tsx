import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { JokesList } from "~/components/JokesLIst";
import { getJokes } from "~/serverFn/jokesServerFn";

//use for layout

export const Route = createFileRoute("/jokes")({
	/*loader: async ({ context }) => {
		const userId = context.userId;
		return {
			userId,
		};
	},*/
	component: App,
});

function App() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className="container mx-auto py-6 px-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="w-full">
					<div className="bg-white rounded-lg shadow-sm p-6">
						{isClient && <JokesList />}
					</div>
				</div>
				<div className="w-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
