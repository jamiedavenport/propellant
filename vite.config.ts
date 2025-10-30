import tailwindcss from "@tailwindcss/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tsConfigPaths(),
		tanstackStart(),
		nitroV2Plugin({
			compatibilityDate: "2025-10-30",
			compressPublicAssets: {
				brotli: true,
			},
			routeRules: {
				"assets/**": {
					cache: {
						maxAge: 31536000, // 1 year
					},
				},
			},
		}),
		viteReact(),
		tailwindcss(),
	],
});
