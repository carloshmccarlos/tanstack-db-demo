import { createFileRoute } from "@tanstack/react-router";
import JokeForm from "~/components/JokeForm";

export const Route = createFileRoute("/jokes/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return <JokeForm />;
}
