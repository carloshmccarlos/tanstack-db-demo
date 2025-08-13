import { queryClient } from "~/lib/queryClient";
import { getUserId } from "./getUserId";

type SessionData = {
	userId: string | undefined;
};

export async function getCachedSession() {
	return queryClient.fetchQuery<SessionData>({
		queryKey: ["session"],
		queryFn: () => getUserId(),
		staleTime: 24 * 60 * 60 * 1000, // 24 hours
		gcTime: 24 * 60 * 60 * 1000, // 24 hours
	});
}

export function getSessionUserId() {
	const sessionData = queryClient.getQueryData<SessionData>(["session"]);
	return sessionData?.userId;
}

export function clearSessionCache() {
	queryClient.removeQueries({ queryKey: ["session"] });
}
