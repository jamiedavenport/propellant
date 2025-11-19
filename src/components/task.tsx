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
		<div className="p-3 flex items-center gap-3">
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
			<button
				type="button"
				onClick={handleComplete}
				className="rounded group size-6 border group flex items-center justify-center"
			>
				<CheckIcon className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
			</button>
			<div className="flex-1 text-sm font-medium">{task.content}</div>
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
