import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthForm from "~/components/AuthForm";
import { authSearchSchema } from "~/validation/schema";
import type { authSearchParams } from "~/validation/types";

export const Route = createFileRoute("/auth/")({
	beforeLoad: async ({ context }) => {
		const { userId } = context;

		if (userId) {
			throw redirect({
				to: "/jokes",
			});
		}
	},
	validateSearch: authSearchSchema,
	component: RouteComponent,
});

function RouteComponent() {
	const { type }: authSearchParams = Route.useSearch();

	return <AuthForm type={type} />;
}
