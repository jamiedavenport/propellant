import { CheckIcon, HashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { getIcon } from "~/components/icons";
import { useTags } from "~/context/tags";
import { NewTag } from "../tags/new";
import { Button } from "../ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
	value: string[];
	onChange: (value: string[]) => void;
};

export function Tags({ value, onChange }: Props) {
	const [open, setOpen] = useState(false);
	const tags = useTags();

	const selectedTags = tags.filter((tag) => value.includes(tag.id)) || [];

	const toggleTag = (tagId: string) => {
		const newValue = value.includes(tagId)
			? value.filter((id) => id !== tagId)
			: [...value, tagId];
		onChange(newValue);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size={value.length > 0 ? "sm" : "icon-sm"}
					className="min-w-0"
				>
					<HashIcon />
					{selectedTags.length > 0 && (
						<span>{selectedTags.map((tag) => tag.name).join(", ")}</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0" align="end">
				<Command>
					<CommandInput placeholder="Search tags..." className="h-9" />
					<CommandList>
						<CommandEmpty>No tags found.</CommandEmpty>
						<CommandGroup>
							{tags.map((tag) => {
								const Icon = getIcon(tag.icon);
								const isSelected = value.includes(tag.id);

								return (
									<CommandItem
										key={tag.id}
										value={tag.name}
										onSelect={() => toggleTag(tag.id)}
										className="flex items-center gap-2"
									>
										{Icon && <Icon weight="duotone" className="w-4 h-4" />}
										<span>{tag.name}</span>
										{isSelected && <CheckIcon className="ml-auto w-4 h-4" />}
									</CommandItem>
								);
							})}
						</CommandGroup>
						<CommandGroup>
							<NewTag>
								<CommandItem
									value="create-new-tag"
									className="justify-center text-muted-foreground"
								>
									+ Create new tag
								</CommandItem>
							</NewTag>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
