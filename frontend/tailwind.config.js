/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				scarlet: {
					50: "#fff2f0",
					100: "#ffe3de",
					200: "#ffcdc3",
					300: "#ffaa99",
					400: "#ff795f",
					500: "#ff502d",
					600: "#f0300a",
					700: "#ce2807",
					800: "#aa240a",
					900: "#8c2410",
					950: "#4d0e02",
				},
				sunglow: {
					50: "#fff9eb",
					100: "#ffefc6",
					200: "#ffdc88",
					300: "#ffc857",
					400: "#ffac20",
					500: "#f98807",
					600: "#dd6302",
					700: "#b74306",
					800: "#94320c",
					900: "#7a2b0d",
					950: "#461402",
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
