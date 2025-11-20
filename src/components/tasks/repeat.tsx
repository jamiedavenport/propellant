import { RepeatIcon } from "@phosphor-icons/react";
import type { Repeat } from "~/repeat";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
	value: Repeat;
	onChange: (value: Repeat) => void;
};

export function RepeatSelect({ value, onChange }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size={value !== "never" ? "sm" : "icon-sm"}>
					<RepeatIcon weight="duotone" />
					{value !== "never" && <span className="capitalize">{value}</span>}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
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
