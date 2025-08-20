import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";
import { routeTree } from "./routeTree.gen";

// @ts-ignore
export function createRouter() {
	const queryClient = new QueryClient();
	return createTanStackRouter({
		routeTree,
		defaultPreload: "intent",
		defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => <NotFound />,
		scrollRestoration: true,
		context: {
			queryClient,
		},
	});
}

declare module "@tanstack/react-router" {
	interface Register {
		// @ts-ignore
		router: ReturnType<typeof createRouter>;
	}
}
