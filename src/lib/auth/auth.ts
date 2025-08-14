import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import * as schema from "src/db/schema";
import { db } from "~/db/client";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
	},

	/*emailVerification: {
		sendVerificationEmail: async ({ user: newUser, url, token }, request) => {
			await sendEmail({
				to: newUser.email,
				subject: "Verify your email address",
				text: `Click the link to verify your email: ${url}`,
			});
		},
		autoSignInAfterVerification: true,
		expiresIn: 300,
		sendOnSignUp: true,
	},*/

	plugins: [reactStartCookies()],

	session: {
		cookieCache: {
			enabled: true,
			maxAge: 24 * 60 * 60 * 60,
		},
		maxAge: 30 * 24 * 60 * 60, // 30天（秒）
		updateAge: 24 * 60 * 60, // 24小时（秒）
		cookieName: "auth.session",
	},
});
