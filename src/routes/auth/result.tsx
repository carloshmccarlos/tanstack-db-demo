import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/result")({
	component: RouteComponent,
});

function RouteComponent() {
	const error: { error: string } = Route.useSearch();

	if (error.error) {
		return <div>Token is expired.</div>;
	}
	return <div>Email verify successfully.</div>;
}
