import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': 'rgb(var(--vcare-color-primary) / <alpha-value>)',
        'secondary-color': 'rgb(var(--vcare-color-secondary) / <alpha-value>)',
        'accent-color': 'rgb(var(--vcare-color-accent) / <alpha-value>)',
        'text-color': 'rgb(var(--vcare-color-text) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
export default config;
