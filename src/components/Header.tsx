import { Link } from "@tanstack/react-router";
import AuthButton from "~/components/AuthButton";

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
	return (
		<header className="p-2  bg-white text-black ">
			<nav className="flex items-center justify-between">
				<Link
					to="/jokes"
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}
				>
					Jokes
				</Link>

				<AuthButton isLoggedIn={isLoggedIn} />

				{/*	<SignedIn>
							<UserButton />
						</SignedIn>
						<SignedOut>
							<SignInButton />
						</SignedOut>*/}
			</nav>
		</header>
	);
}
