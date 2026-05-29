import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v4 config.
 * Most configuration is handled via CSS (globals.css) in v4.
 * Animation utilities are provided by tw-animate-css (imported in globals.css).
 * The old tailwindcss-animate plugin is NOT needed with the v4 CSS import approach.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
export default config;
