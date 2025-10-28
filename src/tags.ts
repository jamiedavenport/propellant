import { createServerFn } from "@tanstack/react-start";
import { type } from "arktype";
import { isAuthenticated } from "./auth/middleware";
import { asc, db, eq, schema } from "./db";

export const createTag = createServerFn({
	method: "POST",
})
	.inputValidator(
		type({
			name: "string",
			icon: "string",
		}),
	)
	.middleware([isAuthenticated])
	.handler(async ({ data, context }) => {
		return await db
			.insert(schema.tag)
			.values({
				id: crypto.randomUUID(),

				name: data.name,
				icon: data.icon,
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
			.orderBy(asc(schema.tag.name));
	});
