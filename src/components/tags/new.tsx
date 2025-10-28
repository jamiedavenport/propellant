import { useRouter } from "@tanstack/react-router";
import { type } from "arktype";
import { type ReactNode, useState } from "react";
import { createTag } from "~/tags";
import { useAppForm } from "../form";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Field, FieldContent, FieldLabel } from "../ui/field";

const formSchema = type({
	name: "string",
	icon: "string",
});

type Props = {
	children: ReactNode;
};

export function NewTag({ children }: Props) {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const form = useAppForm({
		defaultValues: {
			name: "",
			icon: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await createTag({
				data: {
					name: value.name,
					icon: value.icon,
				},
			});

			form.reset();
			setOpen(false);
			router.invalidate();
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Tag</DialogTitle>
					<DialogDescription>
						Add a new tag to organize your tasks.
					</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					className="flex flex-col gap-4"
				>
					<form.AppField
						name="name"
						children={(field) => <field.TextField label="Name" type="text" />}
					/>
					<form.AppField
						name="icon"
						children={(field) => (
							<Field>
								<FieldLabel>Icon</FieldLabel>
								<FieldContent>
									<Icons
										value={field.state.value}
										onChange={(value) => field.handleChange(value)}
									/>
								</FieldContent>
							</Field>
						)}
					/>
					<DialogFooter>
						<Button type="submit">Create Tag</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
