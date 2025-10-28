import { openai } from "@ai-sdk/openai";
import { createServerFn } from "@tanstack/react-start";
import { generateObject } from "ai";
import { type } from "arktype";
import z from "zod";
import { isAuthenticated } from "./auth/middleware";
import { dayjs } from "./dayjs";

export const generateTask = createServerFn()
	.middleware([isAuthenticated])
	.inputValidator(
		type({
			content: "string",
		}),
	)
	.handler(async ({ data }) => {
		const { object } = await generateObject({
			model: openai("gpt-4o-mini"),
			system: `You are a helpful assistant that reads a task, extracts key information such as the due date and returns a refined content.
      
      Todays date is ${dayjs().format("YYYY-MM-DD")}.

      Return dueDate in the format YYYY-MM-DD. If no due date is found, return null.`,
			prompt: data.content,
			schema: z.object({
				// todo: replace with arktype when standard schema support lands
				content: z.string(),
				dueDate: z.string().nullable(),
			}),
		});

		return object;
	});
