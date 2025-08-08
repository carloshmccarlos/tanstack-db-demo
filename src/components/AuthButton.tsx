import { useRouter } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import signOut from "~/lib/auth/sign-out";

export default function AuthButton({ isLoggedIn }: { isLoggedIn: boolean }) {
	const router = useRouter();

	async function handleClick() {
		if (isLoggedIn) {
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
		} else {
			router.navigate({
				to: "/auth",
				search: { type: "login" },
			});
			return;
		}
	}

	return (
		<Button
			variant={"outline"}
			className={"cursor-pointer ml-auto "}
			type={"button"}
			onClick={handleClick}
		>
			{isLoggedIn ? "Sign Out" : "Sign In"}
		</Button>
	);
}
