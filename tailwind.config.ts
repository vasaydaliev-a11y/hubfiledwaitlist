import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050508"
      },
      boxShadow: {
        glow: "0 0 35px rgba(124, 58, 237, 0.45)",
        cyanGlow: "0 0 35px rgba(6, 182, 212, 0.35)"
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)"
      }
    }
  },
  plugins: []
};

export default config;
