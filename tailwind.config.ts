import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Serif"', "Georgia", "serif"],
        bricolage: ['"IBM Plex Serif"', "Georgia", "serif"],
        serif: ['"IBM Plex Serif"', "Georgia", "serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          '"SF Mono"',
          "Menlo",
          "monospace",
        ],
      },
      colors: {
        ink: "var(--ink)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
} satisfies Config;
