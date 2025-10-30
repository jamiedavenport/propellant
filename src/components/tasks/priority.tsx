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
		color: "text-muted-foreground",
	},
	low: {
		label: "Low",
		color: "text-yellow-600",
	},
	medium: {
		label: "Medium",
		color: "text-blue-600",
	},
	high: {
		label: "High",
		color: "text-red-600",
	},
};

export function PrioritySelect({ value, onChange }: Props) {
	const config = priorityConfig[value];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<InputGroupButton variant="ghost">
					<FlagIcon weight="duotone" className={cn(config.color)} />
					<span className="capitalize">{config.label}</span>
				</InputGroupButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={() => onChange("none")}>
					<FlagIcon weight="duotone" className={priorityConfig.none.color} />
					<span>None</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onChange("low")}>
					<FlagIcon weight="duotone" className={priorityConfig.low.color} />
					<span>Low</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onChange("medium")}>
					<FlagIcon weight="duotone" className={priorityConfig.medium.color} />
					<span>Medium</span>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onChange("high")}>
					<FlagIcon weight="duotone" className={priorityConfig.high.color} />
					<span>High</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
