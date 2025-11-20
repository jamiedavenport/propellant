import { ArrowRightIcon } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import { type } from "arktype";
import { type Priority, priority } from "~/priority";
import { type Repeat, repeat } from "~/repeat";
import { createTask } from "~/tasks";
import { useAppForm } from "../form";
import { Button } from "../ui/button";
import { InputGroupInput } from "../ui/input-group";
import { DueDate } from "./due-date";
import { PrioritySelect } from "./priority";
import { RepeatSelect } from "./repeat";
import { Tags } from "./tags";

const formSchema = type({
	content: "string",
	dueDate: "string.date | null",
	tags: "string[]",
	repeat,
	priority: priority,
});

type Props = {
	dueDate?: Date | null;
	tags?: string[];
};

export function NewTask(props: Props) {
	const router = useRouter();
	const form = useAppForm({
		defaultValues: {
			content: "",
			dueDate: props.dueDate ? props.dueDate.toISOString() : null,
			tags: props.tags ?? [],
			repeat: "never",
			priority: "none",
		} as {
			content: string;
			dueDate: string | null;
			tags: string[];
			repeat: Repeat;
			priority: Priority;
		},

		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await createTask({
				data: {
					content: value.content,
					dueDate: value.dueDate,
					tags: value.tags,
					repeat: value.repeat,
					priority: value.priority,
				},
			});

			form.reset();

			router.invalidate();
		},
	});

	return (
		<form
			className="px-3 py-2 flex items-center gap-3 m-3 border rounded-xl shadow-xs "
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field
				name="priority"
				children={(field) => (
					<PrioritySelect
						value={field.state.value}
						onChange={(value) => field.handleChange(value)}
					/>
				)}
			/>

			<form.AppField
				name="content"
				children={(field) => (
					<input
						className="flex-1 text-sm focus:outline-0"
						placeholder="What do you want to do?"
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
					/>
				)}
			/>

			<form.AppField
				name="dueDate"
				children={(field) => (
					<DueDate
						value={field.state.value ? new Date(field.state.value) : null}
						onChange={(value) =>
							field.handleChange(value ? value.toISOString() : null)
						}
					/>
				)}
			/>
			<form.AppField
				name="tags"
				children={(field) => (
					<Tags
						value={field.state.value}
						onChange={(value) => field.handleChange(value)}
					/>
				)}
			/>
			<form.Field
				name="repeat"
				children={(field) => (
					<RepeatSelect
						value={field.state.value}
						onChange={(value) => field.handleChange(value)}
					/>
				)}
			/>
			<Button type="submit" size="icon-sm">
				<ArrowRightIcon />
				<span className="sr-only">Send</span>
			</Button>
		</form>
	);
}
