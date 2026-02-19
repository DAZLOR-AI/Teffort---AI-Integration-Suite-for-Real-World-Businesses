import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#F8FAF6",
        foreground: "#0B1A10",
        primary: "#A5F06B",
        muted: "#E9EFE5",
        card: "#FFFFFF",
        border: "#D4E3CD"
      }
    }
  },
  plugins: []
} satisfies Config;
