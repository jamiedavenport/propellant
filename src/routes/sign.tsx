import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/sign")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-accent">
			<div className="mb-5 font-bold">Propellant</div>
			<Outlet />
		</div>
	);
}
