import { createServerFn } from "@tanstack/react-start";
import { type } from "arktype";
import { isAuthenticated } from "./auth/middleware";
import { db, eq, schema } from "./db";

export const createTask = createServerFn({
	method: "POST",
})
	.inputValidator(
		type({
			content: "string",
		}),
	)
	.middleware([isAuthenticated])
	.handler(async ({ data, context }) => {
		return await db
			.insert(schema.task)
			.values({
				id: crypto.randomUUID(),

				content: data.content,

				userId: context.user.id,
			})
			.returning();
	});

export const listTasks = createServerFn({
	method: "GET",
})
	.middleware([isAuthenticated])
	.handler(async ({ context }) => {
		return await db
			.select()
			.from(schema.task)
			.where(eq(schema.task.userId, context.user.id));
	});
