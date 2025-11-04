import {
	CalendarIcon,
	CheckCircleIcon,
	FireIcon,
	FlagIcon,
	HeartIcon,
	RepeatIcon,
	RobotIcon,
	TagIcon,
} from "@phosphor-icons/react";
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
		<div className="flex flex-col min-h-screen">
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

			<div className="flex-1 flex flex-col items-center justify-center">
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

				<section className="p-10 flex items-center justify-center flex-wrap gap-4 text-sm font-medium [&_svg]:size-4 [&_div]:flex [&_div]:items-center [&_div]:gap-1">
					<div>
						<FlagIcon weight="duotone" />
						<span>Priorities</span>
					</div>
					<div>
						<CalendarIcon weight="duotone" />
						<span>Due Dates</span>
					</div>
					<div>
						<TagIcon weight="duotone" />
						<span>Tags</span>
					</div>
					<div>
						<RepeatIcon weight="duotone" />
						<span>Repeats</span>
					</div>
					<div>
						<CheckCircleIcon weight="duotone" />
						<span>Completions</span>
					</div>
					<div>
						<RobotIcon weight="duotone" />
						<span>AI</span>
					</div>
				</section>
			</div>

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
