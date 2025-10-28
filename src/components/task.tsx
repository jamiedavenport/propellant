import { CheckCircleIcon } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import { completeTask } from "~/tasks";
import { Button } from "./ui/button";

type TaskData = {
	id: string;
	content: string;
	completedAt: Date | null;
	dueDate: string | null;
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
		<div className="flex items-center justify-between">
			<span>{task.content}</span>
			<Button type="button" variant="ghost" size="sm" onClick={handleComplete}>
				<CheckCircleIcon weight="fill" />
				<span>Complete</span>
			</Button>
		</div>
	);
}
