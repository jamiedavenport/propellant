import {
	AirplaneIcon,
	BookIcon,
	BookmarkIcon,
	BookOpenIcon,
	BriefcaseIcon,
	CarIcon,
	ChatIcon,
	CheckIcon,
	ClockIcon,
	CoffeeIcon,
	EnvelopeIcon,
	FireIcon,
	FlagIcon,
	ForkKnifeIcon,
	GearIcon,
	HeadphonesIcon,
	HeartbeatIcon,
	HeartIcon,
	HouseIcon,
	MapPinIcon,
	MusicNoteIcon,
	ShoppingCartIcon,
	StarIcon,
	SunIcon,
	TimerIcon,
	TreeIcon,
	UserIcon,
	WarningIcon,
	WrenchIcon,
} from "@phosphor-icons/react";
import React from "react";
import { Button } from "./ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const icons = {
	fire: FireIcon,
	house: HouseIcon,
	briefcase: BriefcaseIcon,
	book: BookIcon,
	bookOpen: BookOpenIcon,
	flag: FlagIcon,
	warning: WarningIcon,
	star: StarIcon,
	chat: ChatIcon,
	envelope: EnvelopeIcon,
	clock: ClockIcon,
	timer: TimerIcon,
	shoppingCart: ShoppingCartIcon,
	heart: HeartIcon,
	coffee: CoffeeIcon,
	car: CarIcon,
	bookmark: BookmarkIcon,
	forkKnife: ForkKnifeIcon,
	musicNote: MusicNoteIcon,
	headphones: HeadphonesIcon,
	heartbeat: HeartbeatIcon,
	airplane: AirplaneIcon,
	mapPin: MapPinIcon,
	tree: TreeIcon,
	sun: SunIcon,
	gear: GearIcon,
	wrench: WrenchIcon,
	user: UserIcon,
};

export type Icon = keyof typeof icons;

export function getIcon(name: string) {
	return icons[name as keyof typeof icons] ?? null;
}

type Props = {
	value: string;
	onChange: (value: string) => void;
};

export function Icons({ value, onChange }: Props) {
	const [open, setOpen] = React.useState(false);

	const Icon = getIcon(value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="justify-between"
				>
					{Icon ? <Icon weight="duotone" /> : <span>Select an icon</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search icon..." className="h-9" />
					<CommandList>
						<CommandEmpty>No icon found.</CommandEmpty>
						<CommandGroup>
							{Object.entries(icons).map(([name, Component]) => (
								<CommandItem
									key={name}
									value={name}
									onSelect={(currentValue) => {
										onChange(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									<Component weight="duotone" />
									<span>{name}</span>
									{value === name && <CheckIcon className="ml-auto" />}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
