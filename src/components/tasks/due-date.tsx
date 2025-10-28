import { CalendarIcon } from "@phosphor-icons/react";
import { dayjs } from "~/dayjs";
import { Calendar } from "../ui/calendar";
import { InputGroupButton } from "../ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
	value: Date | null;
	onChange: (value: Date | null) => void;
};

export function DueDate({ value, onChange }: Props) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<InputGroupButton variant="ghost">
					<CalendarIcon weight="duotone" />
					<span>{value ? dayjs(value).format("DD/MM/YYYY") : "Due Date"}</span>
				</InputGroupButton>
			</PopoverTrigger>
			<PopoverContent>
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
