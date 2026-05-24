import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy-dark": "#1e3056",
        "navy-darker": "#0f1830",
        "navy-deepest": "#111827",
        "accent-blue": "#2563eb",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        oswald: ["var(--font-oswald)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
