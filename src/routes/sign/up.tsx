import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { type } from "arktype";
import { auth } from "~/auth/client";
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
	const router = useRouter();
	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await auth.signUp.email({
				name: "",
				email: value.email,
				password: value.password,
			});

			await router.navigate({ to: "/inbox" });
		},
	});

	return (
		<div className="w-full max-w-md flex flex-col gap-5">
			<Card>
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
							children={(field) => (
								<field.TextField label="Email" type="email" />
							)}
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
			<div className="text-center text-sm text-muted-foreground">
				Already have an account?{" "}
				<Link to="/sign/in" className="text-primary font-medium">
					Sign In
				</Link>
			</div>
		</div>
	);
}
