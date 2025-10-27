import { createFileRoute } from "@tanstack/react-router";
import { type } from "arktype";
import { useAppForm } from "~/components/form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Field } from "~/components/ui/field";

export const Route = createFileRoute("/sign/up")({
	component: RouteComponent,
});

const formSchema = type({
	email: "string.email",
	password: "string >= 8",
});

function RouteComponent() {
	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					className="flex flex-col gap-5"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<form.AppField
						name="email"
						children={(field) => <field.TextField label="Email" type="email" />}
					/>
					<form.AppField
						name="password"
						children={(field) => (
							<field.TextField label="Password" type="password" />
						)}
					/>
					<Field>
						<form.AppForm>
							<form.SubmitButton>Sign Up</form.SubmitButton>
						</form.AppForm>
					</Field>
				</form>
			</CardContent>
		</Card>
	);
}
