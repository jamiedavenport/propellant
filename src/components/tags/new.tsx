import { useRouter } from "@tanstack/react-router";
import { type } from "arktype";
import { type ReactNode, useState } from "react";
import { createTag } from "~/tags";
import { useAppForm } from "../form";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const formSchema = type({
	name: "string",
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
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await createTag({
				data: {
					name: value.name,
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
				>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<form.AppField
								name="name"
								children={(field) => (
									<Input
										id="name"
										placeholder="Enter tag name"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										onBlur={field.handleBlur}
									/>
								)}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Create Tag</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
