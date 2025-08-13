import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import JokeTable from "~/components/JokeTable";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/joke-table")({
	component: RouteComponent,
});

function RouteComponent() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (isClient) {
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
}
