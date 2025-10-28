import { createServerFn } from "@tanstack/react-start";
import { type } from "arktype";
import { isAuthenticated } from "./auth/middleware";
import { and, db, desc, eq, isNull, schema } from "./db";

export const createTask = createServerFn({
	method: "POST",
})
	.inputValidator(
		type({
			content: "string",
			dueDate: "string.date | null",
		}),
	)
	.middleware([isAuthenticated])
	.handler(async ({ data, context }) => {
		return await db
			.insert(schema.task)
			.values({
				id: crypto.randomUUID(),

				content: data.content,
				dueDate: data.dueDate,

				userId: context.user.id,
			})
			.returning();
	});

export const updateTask = createServerFn({
	method: "POST",
})
	.inputValidator(
		type({
			id: "string",
			dueDate: "(string.date | null)?",
		}),
	)
	.middleware([isAuthenticated])
	.handler(async ({ data, context }) => {
		return await db
			.update(schema.task)
			.set({
				dueDate: data.dueDate,
			})
			.where(
				and(
					eq(schema.task.id, data.id),
					eq(schema.task.userId, context.user.id),
				),
			)
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
			.where(
				and(
					eq(schema.task.userId, context.user.id),
					isNull(schema.task.completedAt),
				),
			)
			.orderBy(desc(schema.task.createdAt));
	});

export const completeTask = createServerFn({
	method: "POST",
})
	.inputValidator(
		type({
			id: "string",
		}),
	)
	.middleware([isAuthenticated])
	.handler(async ({ data, context }) => {
		return await db
			.update(schema.task)
			.set({
				completedAt: new Date(),
			})
			.where(
				and(
					eq(schema.task.id, data.id),
					eq(schema.task.userId, context.user.id),
				),
			)
			.returning();
	});
