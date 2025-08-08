import { redirect } from "@tanstack/react-router";
import { authClient } from "~/lib/auth/auth-client";

export default async function SignOut() {
	await authClient.signOut({});
}
