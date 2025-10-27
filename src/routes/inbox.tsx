import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/inbox")({
	component: RouteComponent,
	loader: ({ context }) => {
		if (!context.auth) {
			throw redirect({ to: "/sign/in" });
		}

		return {
			user: {
				email: context.auth.user.email,
			},
		};
	},
});

function RouteComponent() {
	const { user } = Route.useLoaderData();

	return <div>Hello {user.email}</div>;
}
