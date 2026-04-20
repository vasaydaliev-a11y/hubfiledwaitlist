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
        background: "#050508",
        surface: "#0a0a14",
        "surface-raised": "#0f0f1a"
      },
      boxShadow: {
        glow: "0 0 35px rgba(124, 58, 237, 0.45)",
        cyanGlow: "0 0 35px rgba(6, 182, 212, 0.35)",
        "neo-outer":
          "6px 6px 16px rgba(0, 0, 0, 0.7), -4px -4px 12px rgba(255, 255, 255, 0.04)",
        "neo-inner":
          "inset 4px 4px 10px rgba(0, 0, 0, 0.6), inset -3px -3px 8px rgba(255, 255, 255, 0.04)",
        "neo-card":
          "8px 8px 24px rgba(0, 0, 0, 0.65), -6px -6px 18px rgba(255, 255, 255, 0.035), inset 0 1px 0 rgba(255, 255, 255, 0.07)",
        "neo-button":
          "4px 4px 12px rgba(0, 0, 0, 0.5), -3px -3px 10px rgba(255, 255, 255, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        "neo-button-pressed":
          "inset 3px 3px 8px rgba(0, 0, 0, 0.6), inset -2px -2px 6px rgba(255, 255, 255, 0.04)",
        "neo-input":
          "inset 3px 3px 8px rgba(0, 0, 0, 0.55), inset -2px -2px 6px rgba(255, 255, 255, 0.03)",
        "neo-glow-purple":
          "6px 6px 20px rgba(0, 0, 0, 0.6), -4px -4px 14px rgba(255, 255, 255, 0.03), 0 0 30px rgba(124, 58, 237, 0.3)",
        "neo-glow-cyan":
          "6px 6px 20px rgba(0, 0, 0, 0.6), -4px -4px 14px rgba(255, 255, 255, 0.03), 0 0 30px rgba(6, 182, 212, 0.25)"
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)"
      }
    }
  },
  plugins: []
};

export default config;
