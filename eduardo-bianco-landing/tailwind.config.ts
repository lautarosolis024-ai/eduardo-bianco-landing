import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v4 config.
 * Most configuration is handled via CSS (globals.css) in v4.
 * This file exists for tailwindcss-animate plugin compatibility.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwindcss-animate")],
};
export default config;
