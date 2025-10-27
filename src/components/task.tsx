import { completeTask } from "~/tasks";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

type TaskData = {
	id: string;
	content: string;
	completedAt: Date | null;
};

type Props = {
	task: TaskData;
};

export function Task({ task }: Props) {
	const isCompleted = task.completedAt !== null;

	const handleComplete = async () => {
		await completeTask({
			data: {
				id: task.id,
			},
		});
	};

	return (
		<Card className="w-full">
			<CardContent className="flex items-center justify-between p-4">
				<span
					className={`flex-1 ${isCompleted ? "line-through text-muted-foreground" : ""}`}
				>
					{task.content}
				</span>
				{!isCompleted && (
					<Button variant="outline" size="sm" onClick={handleComplete}>
						Complete
					</Button>
				)}
			</CardContent>
		</Card>
	);
}
