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
        background: "#030014",
        surface: "#0a0118",
        "surface-raised": "#110126",
        nebula: {
          purple: "#8b5cf6",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          pink: "#ec4899",
          gold: "#f59e0b",
        },
        stellar: {
          glow: "#c084fc",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(139, 92, 246, 0.4)",
        "glow-warm": "0 0 50px rgba(196, 132, 252, 0.3)",
        "glow-multi":
          "0 0 60px rgba(139, 92, 246, 0.25), 0 0 120px rgba(6, 182, 212, 0.12), 0 0 180px rgba(236, 72, 153, 0.08)",
        "neo-outer":
          "6px 6px 16px rgba(0, 0, 0, 0.7), -4px -4px 12px rgba(139, 92, 246, 0.03)",
        "neo-inner":
          "inset 4px 4px 10px rgba(0, 0, 0, 0.6), inset -3px -3px 8px rgba(139, 92, 246, 0.03)",
        "neo-card":
          "8px 8px 24px rgba(0, 0, 0, 0.6), -6px -6px 18px rgba(139, 92, 246, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
        "neo-button":
          "4px 4px 12px rgba(0, 0, 0, 0.5), -3px -3px 10px rgba(139, 92, 246, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        "neo-input":
          "inset 3px 3px 8px rgba(0, 0, 0, 0.55), inset -2px -2px 6px rgba(139, 92, 246, 0.02)"
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #8b5cf6 0%, #06B6D4 100%)",
        "nebula-gradient": "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06B6D4 100%)",
        "cosmic-gradient": "linear-gradient(135deg, #c084fc 0%, #8b5cf6 30%, #06B6D4 70%, #f59e0b 100%)",
      }
    }
  },
  plugins: []
};

export default config;
