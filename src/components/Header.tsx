import { Link } from "@tanstack/react-router";
import AuthButton from "~/components/AuthButton";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 max-w-screen-2xl items-center px-4">
				<nav className="flex items-center justify-between w-full">
					<div className="flex items-center space-x-6">
						<Link
							to="/jokes"
							activeProps={{
								className: "text-foreground font-semibold",
							}}
							activeOptions={{ exact: true }}
							className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
						>
							🎭 Jokes
						</Link>

						<Link
							to="/admin"
							activeProps={{
								className: "text-foreground font-semibold",
							}}
							activeOptions={{ exact: true }}
							className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
						>
							Admin
						</Link>
					</div>

					<AuthButton />
				</nav>
			</div>
		</header>
	);
}
