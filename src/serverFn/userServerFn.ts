import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import * as v from "valibot";
import { db } from "~/db/client";
import { user } from "~/db/schema";

export const getUserByEmail = createServerFn({
	method: "GET",
})
	.validator(v.string())
	.handler(async ({ data }: { data: string }) => {
		try {
			const existedUser = await db
				.select()
				.from(user)
				.where(eq(user.email, data));
			if (existedUser.length === 0) {
				return null;
			}
			return existedUser[0];
		} catch (error) {
			console.error("Failed to read user by email:", error);
			return null;
		}
	});

export const deleteUser = createServerFn({
	method: "POST",
})
	.validator(v.string())
	.handler(async ({ data }: { data: string }) => {
		try {
			await db.delete(user).where(eq(user.email, data));
			return true;
		} catch (error) {
			console.error("Failed to delete user:", error);
			return false;
		}
	});
