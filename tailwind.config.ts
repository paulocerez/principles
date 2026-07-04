import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
        bricolage: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
