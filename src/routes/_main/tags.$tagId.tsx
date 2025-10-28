import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/tags/$tagId")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_main/tags/$tagId"!</div>;
}
