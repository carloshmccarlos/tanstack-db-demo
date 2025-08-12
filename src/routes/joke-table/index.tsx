import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/joke-table/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className={"text-center mt-20"}>
			Select a joke to update or add a new one
		</div>
	);
}
