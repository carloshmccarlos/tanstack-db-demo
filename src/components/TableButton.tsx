import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { jokeCollection } from "~/db/collections";
import type { JokeSelect } from "~/validation/types";

type ButtonProps = {
	joke: JokeSelect;
};

export default function TableButton({ joke }: ButtonProps) {
	const router = useRouter();

	return (
		<div className="flex flex-row gap-2 items-center">
			<Button asChild className={"bg-blue-500"} size="sm">
				<Link to="/joke-table/update" search={{ id: joke.id }}>
					Update
				</Link>
			</Button>

			<Button
				onClick={() => {
					const result = confirm("Are you sure you want to delete this joke?");
					if (result) {
						jokeCollection.delete(joke.id);

						router.navigate({
							to: "/joke-table",
						});
					}
				}}
				variant="destructive"
				size="sm"
			>
				Delete
			</Button>
		</div>
	);
}
