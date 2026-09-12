import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Fraunces Variable"', "Georgia", "serif"],
        bricolage: ['"Fraunces Variable"', "Georgia", "serif"],
        serif: ['"Fraunces Variable"', "Georgia", "serif"],
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
