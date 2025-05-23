/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				secondary: "#000",
				tertiary: "#101010",
			},
			screens: {
                xs: "480px", // Define the xs screen width
            },
		},
	},
	plugins: [],
};
