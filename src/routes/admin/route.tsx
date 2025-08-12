import { createFileRoute } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import React from "react";

export const Route = createFileRoute("/admin")({
	component: RouteComponent,
});

type Person = {
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	status: string;
	progress: number;
};

const defaultData: Person[] = [
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
	},
];

const columnHelper = createColumnHelper<Person>();

const columns = [
	columnHelper.accessor("firstName", {}),
	columnHelper.accessor("age", {}),
	columnHelper.accessor("age", {}),
	columnHelper.accessor("visits", {}),
	columnHelper.accessor("status", {}),
	columnHelper.accessor("progress", {}),
];

function RouteComponent() {
	const [data, _setData] = React.useState(() => [...defaultData]);
	const rerender = React.useReducer(() => ({}), {})[1];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting: [
				{
					id: "firstName",
					desc: false,
				},
			],
		},
	});

	return (
		<div className="p-6 max-w-7xl mx-auto">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Admin Dashboard
				</h1>
				<p className="text-gray-600">Manage user data and system information</p>
			</div>

			<div className="bg-white shadow-lg rounded-lg overflow-hidden">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{table.getRowModel().rows.map((row, index) => (
							<tr
								key={row.id}
								className={`hover:bg-gray-50 transition-colors duration-150 ${
									index % 2 === 0 ? "bg-white" : "bg-gray-25"
								}`}
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
					<tfoot className="bg-gray-50">
						{table.getFooterGroups().map((footerGroup) => (
							<tr key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<th
										key={header.id}
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.footer,
													header.getContext(),
												)}
									</th>
								))}
							</tr>
						))}
					</tfoot>
				</table>
			</div>

			<div className="mt-6 flex justify-between items-center">
				<div className="text-sm text-gray-500">
					Showing {table.getRowModel().rows.length} of {defaultData.length}{" "}
					results
				</div>
				<button
					type="button"
					onClick={() => rerender()}
					className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
				>
					<svg
						className="-ml-1 mr-2 h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
					Refresh Data
				</button>
			</div>
		</div>
	);
}
