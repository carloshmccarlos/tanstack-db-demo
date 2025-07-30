import { pgTable, text } from "drizzle-orm/pg-core";

export const jokes = pgTable("jokes", {
	id: text().primaryKey(),
	question: text().notNull(),
	answer: text().notNull(),
});
