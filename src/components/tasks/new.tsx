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

const formSchema = type({
	content: "string",
});

export function NewTask() {
	const router = useRouter();
	const form = useAppForm({
		defaultValues: {
			content: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await createTask({
				data: {
					content: value.content,
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
					{/* <InputGroupButton
            variant="outline"
            className="rounded-full"
            size="icon-xs"
          >
            <IconPlus />
          </InputGroupButton> */}
					{/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">Auto</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="[--radius:0.95rem]"
            >
              <DropdownMenuItem>Auto</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
					{/* <InputGroupText className="ml-auto">52% used</InputGroupText>
				<Separator orientation="vertical" className="!h-4" /> */}
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
