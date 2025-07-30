import type * as v from "valibot";
import type { user } from "~/db/auth-schema";
import type { jokes } from "~/db/schema";
import type {
	addJokeSchema,
	userLoginSchema,
	userRegisterSchema,
} from "~/validation/schema";

export type JokeSelect = typeof jokes.$inferSelect;
export type JokeInsert = typeof jokes.$inferInsert;
export type JokeUpdate = typeof jokes.$inferSelect;
export type JokeInput = v.InferInput<typeof addJokeSchema>;

export type UserRegister = v.InferInput<typeof userRegisterSchema>;
export type UserLogin = v.InferInput<typeof userLoginSchema>;
export type UserSelect = typeof user.$inferSelect;
