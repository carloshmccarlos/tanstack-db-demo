import type { jokes } from "~/db/drizzle/schema";

export type JokeSelect = typeof jokes.$inferSelect;
export type JokeInsert = typeof jokes.$inferSelect;

export type Jokes = JokeSelect[];
