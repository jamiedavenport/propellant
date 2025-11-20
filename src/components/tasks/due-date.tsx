import { CalendarIcon } from "@phosphor-icons/react";
import { dayjs } from "~/dayjs";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
	value: Date | null;
	onChange: (value: Date | null) => void;
};

export function DueDate({ value, onChange }: Props) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size={value ? "sm" : "icon-sm"}>
					<CalendarIcon />
					{value && <span>{dayjs(value).format("DD/MM/YYYY")}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="p-0 w-fit">
				<Calendar
					mode="single"
					selected={value ? value : undefined}
					onSelect={(date) => {
						onChange(date ? date : null);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
