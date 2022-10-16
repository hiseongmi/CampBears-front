import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	esbuild: {
		minify: true,
		minifySyntax: true,
	},
	plugins: [vue()],
	logLevel: "silent",
});
