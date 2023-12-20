/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				scarlet: {
					50: "#ffe6e8",
					100: "#ffccd0",
					200: "#ff99a1",
					300: "#ff6673",
					400: "#ff3344",
					500: "#ff0015",
					600: "#cc0011",
					700: "#99000d",
					800: "#660008",
					900: "#330004",
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
	plugins: [
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					stop: (value) => ({
						stopColor: value,
					}),
				},
				{
					values: flattenColorPalette(theme("colors")),
					type: "color",
				}
			);
		}),
	],
};
