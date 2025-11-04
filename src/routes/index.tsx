import { FireIcon, HeartIcon } from "@phosphor-icons/react";
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

			<section className="flex flex-col items-center justify-center p-10">
				<h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance text-center">
					Open-Source Task Management
				</h2>
				<p className="text-center text-muted-foreground max-w-xl text-balance mb-8">
					Propellant is a modern, affordable, and open-source alternative to
					popular task management tools like Todoist and Any.do.
				</p>
				<div className="flex gap-2 flex-col md:flex-row">
					<Button asChild variant="outline">
						<a
							href="https://github.com/jamiedavenport/propellant"
							target="_blank"
							rel="noopener noreferrer"
						>
							Github
						</a>
					</Button>
					{authenticated ? (
						<Button asChild>
							<Link to="/inbox">Dashboard</Link>
						</Button>
					) : (
						<Button asChild>
							<Link to="/sign/in">Sign In</Link>
						</Button>
					)}
				</div>
			</section>

			<footer className="p-10 text-center">
				<a
					href="https://jxd.dev"
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm inline-flex items-center justify-center gap-1 flex-wrap"
				>
					<span>Built with</span>
					<HeartIcon className="size-4" weight="duotone" />
					<span>by Jamie Davenport</span>
				</a>
			</footer>
		</div>
	);
}
