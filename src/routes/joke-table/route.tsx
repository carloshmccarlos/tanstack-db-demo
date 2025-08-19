import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import JokeTable from "~/components/JokeTable";
import { Button } from "~/components/ui/button";
import { jokeCollection } from "~/db/collections";

export const Route = createFileRoute("/joke-table")({
	loader: async () => {
		await jokeCollection.preload();
	},

	ssr: false,
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto py-10">
			<Button className={"bg-pink-500"}>
				<Link to="/joke-table/new">new</Link>
			</Button>
			<JokeTable />
			<Outlet />
		</div>
	);
}
