import { createServerFn } from "@tanstack/react-start";
import { type } from "arktype";
import { isAuthenticated } from "./auth/middleware";
import { and, db, eq, isNotNull, isNull, type SQL, schema } from "./db";

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

const listTasksSchema = type({
	showCompleted: "boolean?",
});

export const listTasks = createServerFn({
	method: "GET",
})
	.middleware([isAuthenticated])
	.inputValidator(listTasksSchema)
	.handler(async ({ context, data }) => {
		let where: SQL<unknown> | undefined = eq(
			schema.task.userId,
			context.user.id,
		);

		if (!data.showCompleted) {
			where = and(where, isNull(schema.task.completedAt));
		}

		return await db.select().from(schema.task).where(where);
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
