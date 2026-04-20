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
        surface: "#0a0a12",
        "surface-raised": "#0e0e1a",
        amber: {
          glow: "#f59e0b"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(124, 58, 237, 0.4)",
        "glow-warm": "0 0 50px rgba(245, 158, 11, 0.3)",
        "glow-multi":
          "0 0 60px rgba(124, 58, 237, 0.25), 0 0 120px rgba(245, 158, 11, 0.12), 0 0 180px rgba(6, 182, 212, 0.08)",
        "neo-outer":
          "6px 6px 16px rgba(0, 0, 0, 0.7), -4px -4px 12px rgba(255, 255, 255, 0.03)",
        "neo-inner":
          "inset 4px 4px 10px rgba(0, 0, 0, 0.6), inset -3px -3px 8px rgba(255, 255, 255, 0.03)",
        "neo-card":
          "8px 8px 24px rgba(0, 0, 0, 0.6), -6px -6px 18px rgba(255, 255, 255, 0.025), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
        "neo-button":
          "4px 4px 12px rgba(0, 0, 0, 0.5), -3px -3px 10px rgba(255, 255, 255, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        "neo-input":
          "inset 3px 3px 8px rgba(0, 0, 0, 0.55), inset -2px -2px 6px rgba(255, 255, 255, 0.025)"
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
        "warm-gradient": "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #7C3AED 100%)",
        "cinematic-gradient": "linear-gradient(135deg, #f59e0b 0%, #7C3AED 50%, #06B6D4 100%)"
      }
    }
  },
  plugins: []
};

export default config;
