import { useRouter } from "@tanstack/react-router";
import { type } from "arktype";
import { ArrowUpIcon } from "lucide-react";
import { createTask } from "~/tasks";
import { useAppForm } from "../form";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";
import { DueDate } from "./due-date";
import { Tags } from "./tags";

const formSchema = type({
	content: "string",
	dueDate: "string.date | null",
	tags: "string[]",
});

export function NewTask() {
	const router = useRouter();
	const form = useAppForm({
		defaultValues: {
			content: "",
			dueDate: null,
			tags: [],
		} as {
			content: string;
			dueDate: string | null;
			tags: string[];
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
				},
			});

			form.reset();

			router.invalidate();
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<InputGroup>
				<form.AppField
					name="content"
					children={(field) => (
						<InputGroupInput
							placeholder="What do you want to do?"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
					)}
				/>

				<InputGroupAddon align="block-end">
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

					<InputGroupButton
						type="submit"
						variant="default"
						className="rounded-full ml-auto"
						size="icon-xs"
						// disabled
					>
						<ArrowUpIcon />
						<span className="sr-only">Send</span>
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</form>
	);
}
