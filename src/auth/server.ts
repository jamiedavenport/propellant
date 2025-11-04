import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { reactStartCookies } from "better-auth/react-start";
import { db, schema } from "~/db";

function getDefaultTags(userId: string): (typeof schema.tag.$inferInsert)[] {
	return [
		{
			id: crypto.randomUUID(),
			name: "Personal",
			icon: "user",
			userId,
		},
		{
			id: crypto.randomUUID(),
			name: "Work",
			icon: "briefcase",
			userId,
		},
		{
			id: crypto.randomUUID(),
			name: "Health",
			icon: "heart",
			userId,
		},
	];
}

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
	hooks: {
		after: createAuthMiddleware(async (ctx) => {
			if (ctx.path.startsWith("/sign-up")) {
				const newSession = ctx.context.newSession;
				if (newSession) {
					try {
						await db
							.insert(schema.tag)
							.values(getDefaultTags(newSession.user.id));
					} catch (error) {
						console.error(error);
					}
				}
			}
		}),
	},
	plugins: [reactStartCookies()],
});
