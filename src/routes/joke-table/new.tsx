import { createFileRoute } from "@tanstack/react-router";
import JokeForm from "~/components/JokeForm";

export const Route = createFileRoute("/joke-table/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return <JokeForm />;
}
