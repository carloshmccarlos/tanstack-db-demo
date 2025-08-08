import type * as v from "valibot";
import type { joke, liked, user } from "~/db/schema";
import type {
	addJokeSchema,
	authSearchSchema,
	likeJokeSchema,
	userLoginSchema,
	userRegisterSchema,
} from "~/validation/schema";

export type JokeSelect = typeof joke.$inferSelect;
export type JokeInsert = typeof joke.$inferInsert;
export type JokeUpdate = typeof joke.$inferSelect;
export type JokeInput = v.InferInput<typeof addJokeSchema>;
export type LikeJokeInput = v.InferInput<typeof likeJokeSchema>;
export type LikedJokeSelect = typeof liked.$inferSelect;

export type UserRegister = v.InferInput<typeof userRegisterSchema>;
export type UserLogin = v.InferInput<typeof userLoginSchema>;
export type UserSelect = typeof user.$inferSelect;

export type authSearchParams = v.InferInput<typeof authSearchSchema>;
