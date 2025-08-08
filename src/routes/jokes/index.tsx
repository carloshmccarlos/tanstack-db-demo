import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/jokes/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div
			className={"text-lg font-bold flex items-center justify-center h-full"}
		>
			Please select a joke to update , or you can add a new one.
		</div>
	);
}
