import { CheckIcon, HashIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getIcon } from "~/components/icons";
import { listTags } from "~/tags";
import { NewTag } from "../tags/new";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command";
import { InputGroupButton } from "../ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
	value: string[];
	onChange: (value: string[]) => void;
};

export function Tags({ value, onChange }: Props) {
	const [open, setOpen] = useState(false);
	const tagsQuery = useQuery({
		queryKey: ["tags"],
		queryFn: () => listTags(),
	});

	const selectedTags =
		tagsQuery.data?.filter((tag) => value.includes(tag.id)) || [];

	const toggleTag = (tagId: string) => {
		const newValue = value.includes(tagId)
			? value.filter((id) => id !== tagId)
			: [...value, tagId];
		onChange(newValue);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<InputGroupButton variant="ghost" className="min-w-0">
					{selectedTags.length > 0 ? (
						<div className="flex items-center gap-1">
							{selectedTags.slice(0, 3).map((tag) => {
								const Icon = getIcon(tag.icon);
								return (
									<div key={tag.id} className="flex items-center gap-1 text-xs">
										{Icon && <Icon weight="duotone" className="w-3 h-3" />}
										<span className="truncate max-w-16">{tag.name}</span>
									</div>
								);
							})}
							{selectedTags.length > 3 && (
								<span className="text-xs text-muted-foreground ml-1">
									+{selectedTags.length - 3}
								</span>
							)}
						</div>
					) : (
						<>
							<HashIcon weight="duotone" />
							<span>Select tags</span>
						</>
					)}
				</InputGroupButton>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0">
				<Command>
					<CommandInput placeholder="Search tags..." className="h-9" />
					<CommandList>
						<CommandEmpty>No tags found.</CommandEmpty>
						<CommandGroup>
							{tagsQuery.data?.map((tag) => {
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
