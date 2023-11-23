import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";

export default defineConfig({
	plugins: [react()],
	server: {
		watch: {
			usePolling: true,
		},
		host: true,
		strictPort: true,
		port: 3000,
	},
	resolve: {
		alias: [
			{
				find: "@features",
				replacement: fileURLToPath(
					new URL("./src/features", import.meta.url)
				),
			},
		],
	},
});
