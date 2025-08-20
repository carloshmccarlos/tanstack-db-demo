import { queryOptions } from "@tanstack/react-query";
import { getUserId, getUserSession } from "~/lib/auth/auth-serverFn";

export const authQueries = {
	all: ["auth"],
	user: () => {
		return queryOptions({
			queryKey: [...authQueries.all, "user"],
			queryFn: getUserSession,
			staleTime: 5000,
		});
	},

	userId: () => {
		return queryOptions({
			queryKey: [...authQueries.all, "userId"],
			queryFn: getUserId,
			staleTime: 5000,
		});
	},
};
