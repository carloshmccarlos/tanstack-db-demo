import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import TableButton from "~/components/TableButton";
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

			return <TableButton joke={joke} />;
		},
	},
];
