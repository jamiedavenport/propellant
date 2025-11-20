import { CalendarIcon, TrayIcon } from "@phosphor-icons/react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Task } from "~/components/task";
import { NewTask } from "~/components/tasks/new";
import { Button } from "~/components/ui/button";
import { listTasks } from "~/tasks";

export const Route = createFileRoute("/_main/inbox")({
	component: RouteComponent,
	loader: async ({ context }) => {
		if (!context.auth) {
			throw redirect({ to: "/sign/in" });
		}

		return {
			tasks: await listTasks({ data: {} }),
		};
	},
});

function RouteComponent() {
	const { tasks } = Route.useLoaderData();
	return (
		<div>
			<div className="flex items-center gap-2 border-b p-5">
				<TrayIcon weight="fill" className="size-8" />
				<h1 className="text-2xl font-bold">Inbox</h1>
			</div>

			<div className="divide-y border-b">
				{tasks.map((task) => (
					<Task key={task.id} task={task} />
				))}
			</div>

			<NewTask />
		</div>
	);
}
