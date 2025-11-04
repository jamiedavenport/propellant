import { CheckCircleIcon, CheckIcon, TrashIcon } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import type { Priority } from "~/priority";
import type { Repeat } from "~/repeat";
import { completeTask, deleteTask, updateTask } from "~/tasks";
import { DueDate } from "./tasks/due-date";
import { PrioritySelect } from "./tasks/priority";
import { RepeatSelect } from "./tasks/repeat";
import { Tags } from "./tasks/tags";
import { Button } from "./ui/button";

// todo
type TaskData = {
	id: string;
	content: string;
	completedAt: Date | null;
	dueDate: string | null;
	tags: {
		tag: {
			id: string;
		};
	}[];
	repeat: Repeat;
	priority: Priority;
};

type Props = {
	task: TaskData;
};

export function Task({ task }: Props) {
	const router = useRouter();
	const handleComplete = async () => {
		await completeTask({
			data: {
				id: task.id,
			},
		});

		router.invalidate();
	};

	const handleDelete = async () => {
		await deleteTask({
			data: {
				id: task.id,
			},
		});

		router.invalidate();
	};

	return (
		<div className="border rounded-lg overflow-hidden shadow-xs">
			<div className="flex items-center px-2 py-1 border-b gap-2">
				<Button
					type="button"
					variant="outline"
					onClick={handleComplete}
					size="icon-sm"
					className="rounded-full group size-6"
				>
					<CheckIcon className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
				</Button>
				<span className="flex-1">{task.content}</span>
				<Button
					type="button"
					variant="ghost"
					size="icon-sm"
					onClick={handleDelete}
				>
					<TrashIcon weight="fill" />
					<span className="sr-only">Delete</span>
				</Button>
			</div>
			<div className="flex items-center gap-2 p-2">
				<DueDate
					value={task.dueDate ? new Date(task.dueDate) : null}
					onChange={async (value) => {
						await updateTask({
							data: {
								id: task.id,
								dueDate: value ? value.toISOString() : null,
							},
						});
						router.invalidate();
					}}
				/>
				<PrioritySelect
					value={task.priority}
					onChange={async (value) => {
						await updateTask({
							data: {
								id: task.id,
								priority: value,
							},
						});
						router.invalidate();
					}}
				/>
				<Tags
					value={task.tags.map((tag) => tag.tag.id)}
					onChange={(value) => {
						// todo
						// router.invalidate();
					}}
				/>
				<RepeatSelect
					value={task.repeat}
					onChange={(value) => {
						// todo
						// router.invalidate();
					}}
				/>
			</div>
		</div>
	);
}
