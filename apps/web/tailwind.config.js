/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/shared/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          saffron: "#FF7722",
          indiaGreen: "#138808",
          navy: "#000080",
          sky: "#0284C7",
          warmAmber: "#D97706",
          terracotta: "#B45309",
          slate: "#0F172A",
          surface: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Noto Sans'",
          "'Noto Sans Devanagari'",
          "'Noto Sans Tamil'",
          "'Noto Sans Ol Chiki'",
          "sans-serif",
        ],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "karaoke-glow": "karaoke-glow 1.5s ease-in-out infinite",
      },
      keyframes: {
        "karaoke-glow": {
          "0%, 100%": { backgroundColor: "rgba(255, 119, 34, 0.2)" },
          "50%": { backgroundColor: "rgba(255, 119, 34, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
