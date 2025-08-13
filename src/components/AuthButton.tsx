import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { clearSessionCache } from "~/lib/auth/cached-session";
import signOut from "~/lib/auth/sign-out";

type AuthButtonProps = {
	userId?: string;
};

export default function AuthButton({ userId }: AuthButtonProps) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(!!userId);

	async function handleSignOut() {
		const result = confirm("Are you sure to sign out?");

		if (result) {
			await signOut();
			// Clear the cached session data after logout
			clearSessionCache();
		}

		setIsAuthenticated(false);
		return;
	}

	function handleSignIn() {
		router.navigate({
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
