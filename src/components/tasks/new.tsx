import { CalendarIcon } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import { type } from "arktype";
import { ArrowUpIcon } from "lucide-react";
import { createTask } from "~/tasks";
import { useAppForm } from "../form";
import { Calendar } from "../ui/calendar";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const formSchema = type({
	content: "string",
	dueDate: "string.date?",
});

export function NewTask() {
	const router = useRouter();
	const form = useAppForm({
		defaultValues: {
			content: "",
			dueDate: null,
		} as {
			content: string;
			dueDate: string | null;
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await createTask({
				data: {
					content: value.content,
					dueDate: value.dueDate,
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
							<Popover>
								<PopoverTrigger asChild>
									<InputGroupButton variant="ghost">
										<CalendarIcon weight="fill" />
										<span>
											{field.state.value
												? new Date(field.state.value).toLocaleDateString()
												: "Due Date"}
										</span>
									</InputGroupButton>
								</PopoverTrigger>
								<PopoverContent>
									<Calendar
										mode="single"
										selected={
											field.state.value
												? new Date(field.state.value)
												: undefined
										}
										onSelect={(date) => {
											if (date) {
												field.handleChange(date.toISOString());
											} else {
												field.handleChange(null);
											}
										}}
									/>
								</PopoverContent>
							</Popover>
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
