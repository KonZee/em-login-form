import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	base:
		process.env.NODE_ENV === "production"
			? "https://konzee.github.io/em-login-form"
			: "/",
});
