import { Link } from "@tanstack/react-router";
import type { JokeSelect } from "~/validation/types";

export function JokesList({ jokes }: { jokes: JokeSelect[] }) {
	if (!jokes || jokes.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-gray-500 italic">No jokes found</p>
				<Link
					to="/jokes/new"
					className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
				>
					Add Your First Joke
				</Link>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Jokes Collection</h2>
				<Link
					to="/jokes/new"
					className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
				>
					Add Joke
				</Link>
			</div>

			<div className="space-y-3">
				{jokes.map((joke: JokeSelect) => (
					<Link
						to={`/jokes/$id`}
						params={(prev) => ({ ...prev, id: joke.id })}
						key={joke.id}
						className="block border border-gray-200 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
					>
						<p className="font-bold text-lg mb-2">{joke.question}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
