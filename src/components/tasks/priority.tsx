import { FlagIcon } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";
import type { Priority } from "~/priority";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { InputGroupButton } from "../ui/input-group";

type Props = {
	value: Priority;
	onChange: (value: Priority) => void;
};

const priorityConfig = {
	none: {
		label: "None",
		color: "bg-muted-foreground",
	},
	low: {
		label: "Low",
		color: "bg-yellow-600",
	},
	medium: {
		label: "Medium",
		color: "bg-blue-600",
	},
	high: {
		label: "High",
		color: "bg-red-600",
	},
};

export function PrioritySelect({ value, onChange }: Props) {
	const config = priorityConfig[value];

	console.log(config);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={cn(
					"h-4 w-1.5 rounded cursor-pointer foucs:outline-none",
					config.color,
				)}
			/>
			<DropdownMenuContent align="start">
				<DropdownMenuItem onSelect={() => onChange("none")}>
					<div className={cn("h-4 w-1 rounded", priorityConfig.none.color)} />
					<span>None</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onChange("low")}>
					<div className={cn("h-4 w-1 rounded", priorityConfig.low.color)} />
					<span>Low</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onChange("medium")}>
					<div className={cn("h-4 w-1 rounded", priorityConfig.medium.color)} />
					<span>Medium</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onChange("high")}>
					<div className={cn("h-4 w-1 rounded", priorityConfig.high.color)} />
					<span>High</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
