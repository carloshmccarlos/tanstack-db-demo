import { Link } from "@tanstack/react-router";
import type { JokeSelect } from "~/validation/types";

export function JokesList({ jokes }: { jokes: JokeSelect[] }) {
	if (!jokes || jokes.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 px-4">
				<div className="text-6xl mb-6">😅</div>
				<h3 className="text-xl font-semibold text-muted-foreground mb-2">
					No jokes yet!
				</h3>
				<p className="text-muted-foreground mb-6 text-center max-w-md">
					Looks like the comedy club is empty. Be the first to share a joke!
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Jokes Collection
					</h2>
					<p className="text-muted-foreground">
						Discover hilarious jokes from our community
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-2 justify-center">
				{jokes.map((joke: JokeSelect, index) => (
					<Link
						to={`/jokes/$id`}
						params={(prev) => ({ ...prev, id: joke.id })}
						key={joke.id}
						className="group block bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:border-primary/50"
						style={{ animationDelay: `${index * 100}ms` }}
					>
						<div className="flex items-start gap-3">
							<div className="text-2xl">😂</div>
							<div className="flex-1">
								<p className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
									{joke.question}
								</p>
								<p className="text-sm text-muted-foreground mt-2">
									Click to see the punchline!
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
