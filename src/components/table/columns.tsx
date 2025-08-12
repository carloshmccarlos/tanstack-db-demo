import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { jokeCollection } from "~/db/collections";
import type { JokeSelect } from "~/validation/types";

export const columns: ColumnDef<JokeSelect>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Id
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "question",
		header: () => <div className="text-left">Question</div>,
	},
	{
		accessorKey: "answer",
		header: () => <div className="text-left">Answer</div>,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const joke = row.original;

			return (
				<div className="flex flex-row gap-2 items-center">
					<Button asChild className={"bg-blue-500"} size="sm">
						<Link to="/joke-table/update" search={{ id: joke.id }}>
							Update
						</Link>
					</Button>

					<Button
						onClick={() => {
							const result = confirm(
								"Are you sure you want to delete this joke?",
							);
							if (result) {
								jokeCollection.delete(joke.id);
							}
						}}
						variant="destructive"
						size="sm"
					>
						Delete
					</Button>
				</div>
			);
		},
	},
];
