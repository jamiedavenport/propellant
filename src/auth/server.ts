import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import { db } from "~/db";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	// todo fix sign in with cookie cache
	//   session: {
	//     cookieCache: {
	//       enabled: true,
	//       maxAge: 5 * 60, // 5s
	//     },
	//   },
	plugins: [reactStartCookies()],
});
