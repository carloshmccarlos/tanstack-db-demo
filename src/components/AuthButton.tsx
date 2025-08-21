import { useRouteContext, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { authQueries } from "~/lib/auth/queries";
import signOut from "~/lib/auth/sign-out";
import { Route } from "~/routes/__root";

type AuthButtonProps = {
	userId: string | null;
};

export default function AuthButton({ userId }: AuthButtonProps) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(!!userId);

	const { queryClient } = Route.useRouteContext();

	async function handleSignOut() {
		const result = confirm("Are you sure to sign out?");

		if (result) {
			setIsAuthenticated(false);
			await signOut();
			await queryClient.invalidateQueries({
				queryKey: authQueries.all,
			});

			router.invalidate().then();
			return;
		}

		return;
	}

	async function handleSignIn() {
		await router.navigate({
			to: "/auth",
			search: { type: "login" },
		});
	}

	if (isAuthenticated) {
		// Show sign out button
		return (
			<Button
				className={
					"transition-all duration-200 font-medium hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
				}
				type={"button"}
				onClick={handleSignOut}
			>
				<div className="flex items-center gap-2">
					<span className="text-sm">{"👋"}</span>
					<span>{"Sign Out"}</span>
				</div>
			</Button>
		);
	} else {
		// Show sign in button
		return (
			<Button
				className={
					"transition-all duration-200 font-medium hover:bg-primary/90"
				}
				type={"button"}
				onClick={handleSignIn}
			>
				<div className="flex items-center gap-2">
					<span className="text-sm">{"🔐"}</span>
					<span>{"Sign In"}</span>
				</div>
			</Button>
		);
	}
}
