import { createEnv } from "arkenv";

export const env = createEnv({
	BETTER_AUTH_SECRET: "string",

	DATABASE_URL: "string.url",

	OPENAI_API_KEY: "string",

	VITE_DATABUDDY_ID: "string",
});
