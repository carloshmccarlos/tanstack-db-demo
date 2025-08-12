import { useLiveQuery } from "@tanstack/react-db";
import { columns } from "~/components/table/columns";
import { DataTable } from "~/components/table/data-table";
import { jokeCollection } from "~/db/collections";

export default function JokeTable() {
	const { data: jokes, isLoading } = useLiveQuery((q) =>
		q.from({ joke: jokeCollection }),
	);

	if (isLoading) {
		return <div className={"text-center"}>Loading...</div>;
	}

	return (
		<div className={"flex flex-col gap-8 justify-center"}>
			<DataTable columns={columns} data={jokes} />
		</div>
	);
}
