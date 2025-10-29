import { relations } from "drizzle-orm";
import {
	date,
	pgTable,
	primaryKey,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import type { Repeat } from "~/repeat";
import { user } from "./auth-schema";

export const task = pgTable("task", {
	id: text().primaryKey(),
	createdAt: timestamp().defaultNow().notNull(),

	content: text().notNull(),
	dueDate: date(),
	completedAt: timestamp(),
	repeat: text().$type<Repeat>().default("never").notNull(),

	userId: text()
		.references(() => user.id, { onDelete: "cascade" })
		.notNull(),
});

export const taskRelations = relations(task, ({ many }) => ({
	tags: many(tags),
}));

export const tag = pgTable("tag", {
	id: text().primaryKey(),
	createdAt: timestamp().defaultNow().notNull(),

	name: text().notNull(),
	icon: text().notNull(),

	userId: text()
		.references(() => user.id, { onDelete: "cascade" })
		.notNull(),
});

export const tagRelations = relations(tag, ({ many }) => ({
	tags: many(tags),
}));

export const tags = pgTable(
	"tags",
	{
		createdAt: timestamp().defaultNow().notNull(),

		taskId: text()
			.references(() => task.id, { onDelete: "cascade" })
			.notNull(),
		tagId: text()
			.references(() => tag.id, { onDelete: "cascade" })
			.notNull(),
	},
	(t) => [primaryKey({ columns: [t.taskId, t.tagId] })],
);

export const tagsRelations = relations(tags, ({ one }) => ({
	task: one(task, {
		fields: [tags.taskId],
		references: [task.id],
	}),
	tag: one(tag, {
		fields: [tags.tagId],
		references: [tag.id],
	}),
}));

export * from "./auth-schema";
