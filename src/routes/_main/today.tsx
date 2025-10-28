import { CalendarIcon } from "@phosphor-icons/react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Task } from "~/components/task";
import { NewTask } from "~/components/tasks/new";
import { listTasks } from "~/tasks";

export const Route = createFileRoute("/_main/today")({
	component: RouteComponent,
	loader: async ({ context }) => {
		if (!context.auth) {
			throw redirect({ to: "/sign/in" });
		}

		return {
			tasks: await listTasks({ data: { dueDate: new Date().toISOString() } }),
		};
	},
});

function RouteComponent() {
	const { tasks } = Route.useLoaderData();
	return (
		<div className="p-10 space-y-10">
			<div className="flex items-center gap-2">
				<CalendarIcon weight="duotone" className="size-10" />
				<h1 className="text-2xl font-bold">Today</h1>
			</div>
			<NewTask dueDate={new Date()} />
			<div className="space-y-2">
				{tasks.map((task) => (
					<Task key={task.id} task={task} />
				))}
			</div>
		</div>
	);
}
