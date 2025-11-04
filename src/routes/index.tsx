import { FireIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		return {
			authenticated: !!context.auth,
		};
	},
});

function RouteComponent() {
	const { authenticated } = Route.useLoaderData();

	return (
		<div>
			<header className="flex items-center justify-between p-10">
				<h1 className="flex items-center gap-1">
					<FireIcon weight="duotone" className="size-8" />
					<span className="text-lg font-bold hidden md:block">Propellant</span>
				</h1>

				{authenticated ? (
					<Button asChild>
						<Link to="/inbox">Dashboard</Link>
					</Button>
				) : (
					<Button asChild>
						<Link to="/sign/in">Sign In</Link>
					</Button>
				)}
			</header>
		</div>
	);
}
