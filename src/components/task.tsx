import { CheckCircleIcon, TrashIcon } from "@phosphor-icons/react";
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
			<div className="flex items-center justify-between px-2 py-1 border-b">
				<span>{task.content}</span>
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={handleComplete}
					>
						<CheckCircleIcon weight="fill" />
						<span>Complete</span>
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={handleDelete}
					>
						<TrashIcon weight="fill" />
						<span>Delete</span>
					</Button>
				</div>
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
