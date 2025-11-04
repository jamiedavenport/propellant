import {
	CalendarIcon,
	SignOut,
	SignOutIcon,
	TagIcon,
	TrayIcon,
	WarningIcon,
} from "@phosphor-icons/react";
import {
	createFileRoute,
	Link,
	Outlet,
	useRouter,
} from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { auth } from "~/auth/client";
import { getIcon } from "~/components/icons";
import { NewTag } from "~/components/tags/new";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
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
import { TagsProvider } from "~/context/tags";
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
	const router = useRouter();
	const { tags } = Route.useLoaderData();

	return (
		<TagsProvider tags={tags}>
			<SidebarProvider>
				<Sidebar>
					<SidebarContent>
						<SidebarGroup>
							{/* <SidebarGroupLabel>Unlabeled</SidebarGroupLabel> */}
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<Link to="/inbox">
												<TrayIcon weight="duotone" />
												<span>Inbox</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<Link to="/today">
												<CalendarIcon weight="duotone" />
												<span>Today</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<Link to="/overdue">
												<WarningIcon weight="duotone" />
												<span>Overdue</span>
											</Link>
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
									{tags.map((tag) => {
										const Icon = getIcon(tag.icon);

										return (
											<SidebarMenuItem key={tag.id}>
												<SidebarMenuButton asChild>
													<Link to="/tags/$tagId" params={{ tagId: tag.id }}>
														{Icon ? (
															<Icon weight="duotone" />
														) : (
															<TagIcon weight="duotone" />
														)}
														<span>{tag.name}</span>
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>
						<SidebarMenuButton
							onClick={async () => {
								await auth.signOut();
								await router.navigate({ to: "/sign/in" });
							}}
						>
							<SignOutIcon weight="duotone" />
							<span>Sign Out</span>
						</SidebarMenuButton>
					</SidebarFooter>
				</Sidebar>
				<SidebarInset>
					<Outlet />
				</SidebarInset>
			</SidebarProvider>
		</TagsProvider>
	);
}
