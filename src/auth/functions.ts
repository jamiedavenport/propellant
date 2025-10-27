import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "./server";

export const getAuth = createServerFn().handler(async () => {
	const request = getRequest();

	return auth.api.getSession({
		headers: request.headers,
	});
});
