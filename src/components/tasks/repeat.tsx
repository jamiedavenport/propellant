import { RepeatIcon } from "@phosphor-icons/react";
import type { Repeat } from "~/repeat";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { InputGroupButton } from "../ui/input-group";

type Props = {
	value: Repeat;
	onChange: (value: Repeat) => void;
};

export function RepeatSelect({ value, onChange }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<InputGroupButton variant="ghost">
					<RepeatIcon weight="duotone" />
					<span className="capitalize">{value}</span>
				</InputGroupButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={() => onChange("never")}>
					Never
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onChange("daily")}>
					Daily
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onChange("weekly")}>
					Weekly
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onChange("monthly")}>
					Monthly
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={() => onChange("yearly")}>
					Yearly
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
