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
	server: {
		proxy: {
			"/me": {
				target: "https://openapi.naver.com/v1/nid",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ""),
				secure: false,
				ws: true,
			},
		},
	},
});
