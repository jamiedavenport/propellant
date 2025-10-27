import { createMiddleware } from "@tanstack/react-start";
import { getAuth } from "./functions";

export const isAuthenticated = createMiddleware().server(async ({ next }) => {
	const auth = await getAuth();

	if (!auth) {
		throw new Error("Unauthorized");
	}

	return next({
		context: {
			...auth,
		},
	});
});
