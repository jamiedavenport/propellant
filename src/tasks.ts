import { createServerFn } from "@tanstack/react-start";
import { type } from "arktype";
import { isAuthenticated } from "./auth/middleware";
import { dayjs } from "./dayjs";
import { and, db, desc, eq, isNull, lt, schema, sql } from "./db";
import { type Priority, priority } from "./priority";
import { getNextDate, repeat } from "./repeat";

export const createTask = createServerFn({
	method: "POST",
})
	.inputValidator(
		type({
			content: "string",
			dueDate: "string.date | null",
			tags: "string[]",
			repeat,
			priority,
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
				repeat: data.repeat,
				priority: data.priority,

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
			priority: priority.optional(),
		}),
	)
	.middleware([isAuthenticated])
	.handler(async ({ data, context }) => {
		const updateData: { dueDate?: string | null; priority?: Priority } = {};

		if (data.dueDate !== undefined) {
			updateData.dueDate = data.dueDate;
		}

		if (data.priority !== undefined) {
			updateData.priority = data.priority;
		}

		return await db
			.update(schema.task)
			.set(updateData)
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
			tags: "string[]?",
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

		const tasks = await db.query.task.findMany({
			with: {
				tags: {
					with: {
						tag: true,
					},
				},
			},
			where,
			orderBy: [
				desc(schema.task.dueDate),
				sql`array_position(array['high', 'low', 'medium', 'none'], ${schema.task.priority})`,
			],
		});

		if (data?.tags) {
			return tasks.filter((task) =>
				task.tags.some((tag) => data.tags?.includes(tag.tag.id)),
			);
		}

		return tasks;
	});

export const listOverdueTasks = createServerFn({
	method: "GET",
})
	.middleware([isAuthenticated])
	.handler(async ({ context }) => {
		return await db.query.task.findMany({
			with: {
				tags: {
					with: {
						tag: true,
					},
				},
			},
			where: and(
				eq(schema.task.userId, context.user.id),
				isNull(schema.task.completedAt),
				lt(schema.task.dueDate, dayjs().format("YYYY-MM-DD")),
			),
			orderBy: [
				desc(schema.task.dueDate),
				sql`array_position(array['high', 'low', 'medium', 'none'], ${schema.task.priority})`,
			],
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
		return await db.transaction(async (tx) => {
			const task = await tx.query.task.findFirst({
				where: and(
					eq(schema.task.id, data.id),
					eq(schema.task.userId, context.user.id),
				),
				with: {
					tags: true,
				},
			});

			if (!task) {
				throw new Error("Task not found");
			}

			await tx
				.update(schema.task)
				.set({
					completedAt: new Date(),
				})
				.where(
					and(
						eq(schema.task.id, data.id),
						eq(schema.task.userId, context.user.id),
					),
				);

			if (task.repeat !== "never") {
				const nextDate = getNextDate(dayjs(task.dueDate), task.repeat);

				const [created] = await tx
					.insert(schema.task)
					.values({
						id: crypto.randomUUID(),
						content: task.content,
						dueDate: nextDate.format("YYYY-MM-DD"),
						repeat: task.repeat,
						priority: task.priority,
						userId: task.userId,
					})
					.returning();

				if (!created) {
					throw new Error("Task not created");
				}

				if (task.tags.length > 0) {
					await tx.insert(schema.tags).values(
						task.tags.map((tag) => ({
							taskId: created.id,
							tagId: tag.tagId,
						})),
					);
				}
			}

			return task;
		});
	});

export const deleteTask = createServerFn({
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
			.delete(schema.task)
			.where(
				and(
					eq(schema.task.id, data.id),
					eq(schema.task.userId, context.user.id),
				),
			)
			.returning();
	});
