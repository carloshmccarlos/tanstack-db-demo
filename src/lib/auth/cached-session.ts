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

export async function getSessionUserId() {
	// First try to get the cached session data
	let sessionData = queryClient.getQueryData<SessionData>(["session"]);
	
	// If no session data is found, try to fetch it
	if (!sessionData) {
		try {
			sessionData = await queryClient.fetchQuery<SessionData>({
				queryKey: ["session"],
				queryFn: () => getUserId(),
				staleTime: 5 * 60 * 1000, // 5 minutes
			});
		} catch (error) {
			console.error("Failed to fetch session:", error);
		}
	}
	
	return sessionData?.userId;
}

export function clearSessionCache() {
	queryClient.removeQueries({ queryKey: ["session"] });
}
