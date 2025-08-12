import { useRouter } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import signOut from "~/lib/auth/sign-out";

export default function AuthButton() {
	const router = useRouter();

	async function handleClick() {
		const result = confirm("Are you sure to sign out?");

		if (result) {
			await signOut();
			// Manually navigate after sign out completes
			router.navigate({
				to: "/auth",
				search: { type: "login" },
			});
		}
		return;
	}

	return (
		<Button
			className={
				"transition-all duration-200 font-medium hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
			}
			type={"button"}
			onClick={handleClick}
		>
			<div className="flex items-center gap-2">
				<span className="text-sm">{"👋"}</span>
				<span>{"Sign Out"}</span>
			</div>
		</Button>
	);
}
