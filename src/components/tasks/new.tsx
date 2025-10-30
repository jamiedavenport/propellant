import { MagicWandIcon } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import { type } from "arktype";
import { ArrowUpIcon } from "lucide-react";
import { useState } from "react";
import { generateTask } from "~/ai";
import { type Priority, priority } from "~/priority";
import { type Repeat, repeat } from "~/repeat";
import { createTask } from "~/tasks";
import { useAppForm } from "../form";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";
import { Spinner } from "../ui/spinner";
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
	const [isGenerating, setIsGenerating] = useState(false);
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

	const handleMagic = async () => {
		setIsGenerating(true);
		const response = await generateTask({
			data: {
				content: form.getFieldValue("content"),
			},
		});

		form.setFieldValue("content", response.content);
		form.setFieldValue("dueDate", response.dueDate);
		setIsGenerating(false);
	};

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
					<form.Field
						name="repeat"
						children={(field) => (
							<RepeatSelect
								value={field.state.value}
								onChange={(value) => field.handleChange(value)}
							/>
						)}
					/>
					<form.Field
						name="priority"
						children={(field) => (
							<PrioritySelect
								value={field.state.value}
								onChange={(value) => field.handleChange(value)}
							/>
						)}
					/>

					<InputGroupButton
						type="button"
						variant="ghost"
						size="icon-xs"
						className="ml-auto rounded-full"
						onClick={handleMagic}
						disabled={isGenerating}
					>
						{isGenerating ? <Spinner /> : <MagicWandIcon />}
						<span className="sr-only">Use AI</span>
					</InputGroupButton>
					<InputGroupButton
						type="submit"
						variant="default"
						className="rounded-full"
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
