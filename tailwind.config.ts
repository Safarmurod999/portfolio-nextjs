import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8670ef",
        black: "#18171c",
        secondary: "#fad764",
        "secondary-bg": "#f6f6f6",
        "bg-color": "rgb(243,243,243)",
        "bg-color-2": "#f8f9fa",
        lightgray: "d4d4d4",
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
      },
      fontFamily: {
        syne: ["Syne"],
      },
    },
  },
  plugins: [],
};
export default config;
