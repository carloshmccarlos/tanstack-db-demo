import { eq } from "@tanstack/db";
import { useLiveQuery } from "@tanstack/react-db";
import { Heart, HeartOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { createLikedJoke, removeLikedJoke } from "~/db/actions";
import { jokeCollection, likedJokesCollection } from "~/db/collections";

interface Props {
	jokeId: string;
	userId: string;
}

export default function JokeDetail({ jokeId, userId }: Props) {
	const { data: likedJokesByUserData } = useLiveQuery((q) =>
		q
			.from({ likedJoke: likedJokesCollection })
			.where(({ likedJoke }) => eq(likedJoke.jokeId, jokeId)),
	);
	const { data: jokeData } = useLiveQuery((q) =>
		q.from({ joke: jokeCollection }).where(({ joke }) => eq(joke.id, jokeId)),
	);

	const joke = jokeData?.[0];
	const likedJokesByUser = likedJokesByUserData?.[0];

	const isLiked = !!likedJokesByUser || false;

	function handleClick() {
		if (!userId) {
			toast.error("Please login to operate.");
			return;
		}

		if (isLiked) {
			removeLikedJoke({
				removeId: likedJokesByUser.id,
			});
		} else {
			createLikedJoke({ id: "", createdAt: new Date(), userId, jokeId });
		}
	}

	return (
		<div className="max-w-3xl mx-auto p-6">
			<div className="bg-card rounded-xl shadow-lg p-8 border border-border/50 backdrop-blur-sm">
				<div className="flex items-start gap-4 mb-8">
					<div className="text-4xl">🎭</div>
					<div className="flex-1">
						<h1 className="text-3xl font-bold text-card-foreground mb-6 leading-tight">
							{joke.question}
						</h1>
						<div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20 relative overflow-hidden">
							<div className="absolute top-2 right-2 text-2xl opacity-20">
								😂
							</div>
							<p className="text-xl text-card-foreground font-medium leading-relaxed">
								{joke.answer}
							</p>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between pt-6 border-t border-border/50">
					<Button
						variant={isLiked ? "default" : "outline"}
						size={"lg"}
						className={`group transition-all duration-200 ${
							isLiked
								? "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/25"
								: "hover:bg-red-50 hover:border-red-200 hover:text-red-600"
						}`}
						onClick={handleClick}
					>
						<div className="flex items-center gap-2">
							{isLiked ? (
								<Heart className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
							) : (
								<HeartOff className="w-5 h-5 group-hover:scale-110 transition-transform" />
							)}
							<span className="font-medium">
								{isLiked ? "Liked!" : "Like this joke"}
							</span>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}
