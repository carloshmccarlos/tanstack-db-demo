import { createFileRoute } from "@tanstack/react-router";
import { SessionDemo } from "~/components/SessionDemo";

export const Route = createFileRoute("/session-demo")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SessionDemo />;
}
