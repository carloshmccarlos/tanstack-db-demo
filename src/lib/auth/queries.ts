import { queryOptions } from "@tanstack/react-query";
import { getUserId, getUserSession } from "~/lib/auth/auth-serverFn";

export const authQueries = {
	all: ["auth"],
	user: () => {
		return queryOptions({
			queryKey: [...authQueries.all, "user"],
			queryFn: getUserSession,
			staleTime: Infinity,
		});
	},

	userId: () => {
		return queryOptions({
			queryKey: [...authQueries.all, "userId"],
			queryFn: getUserId,
			staleTime: Infinity,
		});
	},
};
