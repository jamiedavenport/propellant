/// <reference types="vite/client" />

import { Databuddy } from "@databuddy/sdk/react";
import { QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getAuth } from "~/auth/functions";
import { queryClient } from "~/lib/query-client";
import logo from "../assets/logo.svg?url";
import styles from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Propellant",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: styles,
			},
			{
				rel: "icon",
				href: logo,
				type: "image/svg+xml",
			},
		],
	}),
	beforeLoad: async () => {
		return {
			auth: await getAuth(),
		};
	},
	component: RootComponent,
});

function RootComponent() {
	return (
		<QueryClientProvider client={queryClient}>
			<RootDocument>
				<Outlet />
				<Databuddy
					clientId={import.meta.env.VITE_DATABUDDY_ID}
					enableBatching={true}
				/>
			</RootDocument>
		</QueryClientProvider>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
