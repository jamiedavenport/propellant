import { createServerFn } from "@tanstack/react-start";
import { type } from "arktype";
import { desc, eq } from "drizzle-orm";
import { isAuthenticated } from "./auth/middleware";
import { db, schema } from "./db";

export const createTag = createServerFn({
	method: "POST",
})
	.inputValidator(
		type({
			name: "string",
		}),
	)
	.middleware([isAuthenticated])
	.handler(async ({ data, context }) => {
		return await db
			.insert(schema.tag)
			.values({
				id: crypto.randomUUID(),

				name: data.name,

				userId: context.user.id,
			})
			.returning();
	});

export const listTags = createServerFn({
	method: "GET",
})
	.middleware([isAuthenticated])
	.handler(async ({ context }) => {
		return await db
			.select()
			.from(schema.tag)
			.where(eq(schema.tag.userId, context.user.id))
			.orderBy(desc(schema.tag.createdAt));
	});
