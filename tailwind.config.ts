import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        porcelain: "#fbfdff",
        mist: "#e8f4fb",
        ink: "#0d2b5f",
        royal: "#143b7d",
        petal: "#6e94b8",
        gold: "#c5a35a",
        champagne: "#f5ecd8"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 22px 70px rgba(13, 43, 95, 0.14)",
        gold: "0 14px 36px rgba(197, 163, 90, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
