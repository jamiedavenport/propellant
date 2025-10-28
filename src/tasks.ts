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
			tags: "string[]",
		}),
	)
	.middleware([isAuthenticated])
	.handler(async ({ data, context }) => {
		const [created] = await db
			.insert(schema.task)
			.values({
				id: crypto.randomUUID(),

				content: data.content,
				dueDate: data.dueDate,

				userId: context.user.id,
			})
			.returning();

		if (!created) {
			throw new Error("Task not created");
		}

		if (data.tags.length > 0) {
			await db.insert(schema.tags).values(
				data.tags.map((tag) => ({
					taskId: created.id,
					tagId: tag,
				})),
			);
		}

		return created;
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
	.inputValidator(
		type({
			dueDate: "string.date?",
		}),
	)
	.handler(async ({ context, data }) => {
		let where = and(
			eq(schema.task.userId, context.user.id),
			isNull(schema.task.completedAt),
		);

		if (data?.dueDate) {
			where = and(where, eq(schema.task.dueDate, data.dueDate));
		}

		return await db.query.task.findMany({
			with: {
				tags: {
					with: {
						tag: true,
					},
				},
			},
			where,
			orderBy: [desc(schema.task.dueDate)],
		});
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
