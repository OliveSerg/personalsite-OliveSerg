import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
	plugins: [react(), wasm(), topLevelAwait()],
	server: {
		watch: {
			usePolling: true,
		},
		host: true,
		strictPort: true,
		port: 4000,
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
	worker: {
		plugins: [wasm(), topLevelAwait()],
		format: "es",
		// rollupOptions: {
		// 	output: {
		// 		format: "iife",
		// 		inlineDynamicImports: true,
		// 	},
		// },
	},
});
