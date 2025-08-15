import { useRouter } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { useSession } from "~/lib/auth/use-session";

export default function AuthButton() {
	const router = useRouter();
	const { isAuthenticated, isLoading, signOut } = useSession();

	async function handleSignOut() {
		const result = confirm("Are you sure you want to sign out?");

		if (result) {
			await signOut();
		}
	}

	function handleSignIn() {
		router.navigate({
			to: "/auth",
			search: { type: "login" },
		});
	}

	// Show loading state
	if (isLoading) {
		return (
			<Button disabled className="opacity-50">
				Loading...
			</Button>
		);
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
