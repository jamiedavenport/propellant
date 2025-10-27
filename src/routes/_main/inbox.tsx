import { createFileRoute, redirect } from "@tanstack/react-router";
import { NewTask } from "~/components/tasks/new";
import { listTasks } from "~/tasks";

export const Route = createFileRoute("/_main/inbox")({
	component: RouteComponent,
	loader: async ({ context }) => {
		if (!context.auth) {
			throw redirect({ to: "/sign/in" });
		}

		return {
			tasks: await listTasks(),
		};
	},
});

function RouteComponent() {
	const { tasks } = Route.useLoaderData();
	return (
		<div className="p-10 space-y-10">
			<NewTask />
			<div>
				{tasks.map((task) => (
					<div key={task.id}>
						<h3>{task.content}</h3>
					</div>
				))}
			</div>
		</div>
	);
}
