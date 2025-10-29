import { TagIcon } from "@phosphor-icons/react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getIcon } from "~/components/icons";
import { Task } from "~/components/task";
import { NewTask } from "~/components/tasks/new";
import { getTag } from "~/tags";
import { listTasks } from "~/tasks";

export const Route = createFileRoute("/_main/tags/$tagId")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const tag = await getTag({ data: { id: params.tagId } });

		if (!tag) {
			throw notFound();
		}

		return {
			tag,
			tasks: await listTasks({
				data: { tags: [params.tagId] },
			}),
		};
	},
});

function RouteComponent() {
	const { tasks, tag } = Route.useLoaderData();

	const Icon = getIcon(tag.icon) ?? TagIcon;

	return (
		<div className="p-10 space-y-10">
			<div className="flex items-center gap-2">
				<Icon weight="duotone" className="size-10" />
				<h1 className="text-2xl font-bold">{tag.name}</h1>
			</div>
			<NewTask tags={[tag.id]} />
			<div className="space-y-2">
				{tasks.map((task) => (
					<Task key={task.id} task={task} />
				))}
			</div>
		</div>
	);
}
