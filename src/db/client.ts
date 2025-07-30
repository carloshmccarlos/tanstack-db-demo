import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Make sure DATABASE_URL is provided
if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is not set");
}

const client = postgres(process.env.DATABASE_URL as string);
export const db = drizzle(client);
