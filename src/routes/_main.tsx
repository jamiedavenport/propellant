import { CalendarIcon, TrayIcon, WarningIcon } from "@phosphor-icons/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { NewTag } from "~/components/tags/new";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "~/components/ui/sidebar";
import { listTags } from "~/tags";

export const Route = createFileRoute("/_main")({
	component: RouteComponent,
	loader: async () => {
		return {
			tags: await listTags(),
		};
	},
});

function RouteComponent() {
	const { tags } = Route.useLoaderData();
	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarContent>
					<SidebarGroup>
						{/* <SidebarGroupLabel>Unlabeled</SidebarGroupLabel> */}
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton>
										<TrayIcon weight="duotone" />
										<span>Inbox</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton>
										<CalendarIcon weight="duotone" />
										<span>Today</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton>
										<WarningIcon weight="duotone" />
										<span>Overdue</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupLabel>Tags</SidebarGroupLabel>
						<SidebarGroupAction>
							<NewTag>
								<PlusIcon />
							</NewTag>
						</SidebarGroupAction>
						<SidebarGroupContent>
							<SidebarMenu>
								{tags.map((tag) => (
									<SidebarMenuItem key={tag.id}>
										<SidebarMenuButton>{tag.name}</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<SidebarInset>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
