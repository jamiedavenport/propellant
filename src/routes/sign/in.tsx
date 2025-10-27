import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const Route = createFileRoute("/sign/in")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Sign in</CardTitle>
			</CardHeader>
			<CardContent>TODO</CardContent>
		</Card>
	);
}
