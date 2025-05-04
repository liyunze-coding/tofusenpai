// @ts-check
import { defineConfig, passthroughImageService  } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: "https://thewilliamyao.com",
	integrations: [react(), tailwind()],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					api: "modern-compiler",
				},
			},
		},
	},
	image: {
		service: passthroughImageService()
	}
});
