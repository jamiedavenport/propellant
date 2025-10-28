import { CheckCircleIcon } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import { completeTask, updateTask } from "~/tasks";
import { DueDate } from "./tasks/due-date";
import { Tags } from "./tasks/tags";
import { Button } from "./ui/button";

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

	return (
		<div className="border rounded-lg overflow-hidden shadow-xs">
			<div className="flex items-center justify-between px-2 py-1 border-b">
				<span>{task.content}</span>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={handleComplete}
				>
					<CheckCircleIcon weight="fill" />
					<span>Complete</span>
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
				<Tags
					value={task.tags.map((tag) => tag.tag.id)}
					onChange={(value) => {
						// todo
						// router.invalidate();
					}}
				/>
			</div>
		</div>
	);
}
