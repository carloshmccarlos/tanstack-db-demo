import type { Jokes } from "~/validation/types";

export function JokesList({ jokes }: { jokes: Jokes }) {
	if (!jokes || jokes.length === 0) {
		return <p className={"text-gray-500 italic"}>No jokes found</p>;
	}

	return (
		<div className={"space-y-4"}>
			<h2 className={"text-xl font-semibold"}>Jokes Collection</h2>

			{jokes.map((joke) => (
				<div
					className={"border-gray-200 bg-white p-4 rounded-lg shadow-md border"}
					key={joke.id}
				>
					<p className={"font-bold text-lg mb-2"}>{joke.question}</p>
					<p className={"text-gray-700"}>{joke.answer}</p>
				</div>
			))}
		</div>
	);
}
