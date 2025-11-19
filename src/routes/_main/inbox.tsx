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
		<div className="p-10 space-y-10">
			<div className="flex items-center gap-2">
				<TrayIcon weight="duotone" className="size-10" />
				<h1 className="text-2xl font-bold">Inbox</h1>
			</div>

			{/* <div className="border rounded-xl divide-y">
				<div className="p-3 flex items-center gap-3">
					<div className="h-4 w-1 bg-red-600 rounded" />
					<div className="size-6 rounded border" />
					<div className="text-sm mr-auto font-medium">Task</div>
					<Button size="icon-sm" variant="ghost">
						<CalendarIcon weight="fill" className="text-muted-foreground" />
					</Button>
				</div>
				<div className="p-3 flex items-center gap-3">
					<div className="h-4 w-1 bg-red-600 rounded" />
					<div className="size-6 rounded border" />
					<div className="text-sm mr-auto font-medium">Task</div>
					<Button size="icon-sm" variant="ghost">
						<CalendarIcon weight="fill" className="text-muted-foreground" />
					</Button>
				</div>
				<div className="p-3 flex items-center gap-3">
					<div className="h-4 w-1 bg-red-600 rounded" />
					<div className="size-6 rounded border" />
					<div className="text-sm mr-auto font-medium">Task</div>
					<Button size="icon-sm" variant="ghost">
						<CalendarIcon weight="fill" className="text-muted-foreground" />
					</Button>
				</div>
				<div className="p-3 flex items-center gap-3">
					<div className="h-4 w-1 bg-red-600 rounded" />
					<div className="size-6 rounded border" />
					<div className="text-sm mr-auto font-medium">Task</div>
					<Button size="icon-sm" variant="ghost">
						<CalendarIcon weight="fill" className="text-muted-foreground" />
					</Button>
				</div>
			</div> */}

			<NewTask />
			<div className="space-y-2">
				{tasks.map((task) => (
					<Task key={task.id} task={task} />
				))}
			</div>
		</div>
	);
}
