import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/jokes/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div
			className={
				"h-full flex items-center justify-center font-bold leading-relaxed"
			}
		>
			Please select a joke to update , or you can add a new one.
		</div>
	);
}
