import { date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const task = pgTable("task", {
	id: text().primaryKey(),
	createdAt: timestamp().defaultNow().notNull(),

	content: text().notNull(),
	dueDate: date(),
	completedAt: timestamp(),

	userId: text()
		.references(() => user.id, { onDelete: "cascade" })
		.notNull(),
});

export const tag = pgTable("tag", {
	id: text().primaryKey(),
	createdAt: timestamp().defaultNow().notNull(),

	name: text().notNull(),

	userId: text()
		.references(() => user.id, { onDelete: "cascade" })
		.notNull(),
});

export * from "./auth-schema";
