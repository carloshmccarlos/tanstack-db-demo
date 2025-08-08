import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "~/components/Header";
import { JokesList } from "~/components/JokesLIst";
import { checkSession } from "~/lib/auth/checkSession";
import { getJokes } from "~/serverFn/jokesServerFn";

export const Route = createFileRoute("/jokes")({
	beforeLoad: async () => {
		return await checkSession();
	},
	loader: async ({ context }) => {
		const userId = context.userId;
		const jokes = await getJokes();
		return {
			userId,
			jokes,
		};
	},
	component: App,
});

function App() {
	const { userId, jokes } = Route.useLoaderData();

	return (
		<div className="container mx-auto py-6 px-4">
			<Header isLoggedIn={!!userId} />
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
