import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { JokesList } from "~/components/JokesLIst";
import { authClient } from "~/lib/auth/auth-client";
import { getJokes } from "~/serverFn/jokesServerFn";

export const Route = createFileRoute("/jokes")({
	beforeLoad: async () => {
		const { data: session, error } = await authClient.getSession();

		if (error) {
			throw new Error(error.message);
		}

		if (!session) {
			throw redirect({
				to: "/auth",
				search: { type: "login" },
			});
		}
	},
	loader: async () => {
		return await getJokes({ data: undefined });
	},
	component: App,
});

function App() {
	const jokes = Route.useLoaderData();

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
