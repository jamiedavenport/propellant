import { createEnv } from "arkenv";

export const env = createEnv({
	BETTER_AUTH_SECRET: "string",

	DATABASE_URL: "string.url",
});
