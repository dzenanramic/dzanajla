import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fdfaf6",
          100: "#faf5ee",
          200: "#f5ece0",
          300: "#eddfc9",
          400: "#e2cba9",
        },
        blush: {
          50: "#fdf2f5",
          100: "#fbe6ed",
          200: "#f7ccd9",
          300: "#f0a6be",
          400: "#e67a9e",
          500: "#d4567e",
          600: "#b83d65",
        },
        gold: {
          100: "#fdf3d7",
          200: "#f9e2a0",
          300: "#f2c75c",
          400: "#e8a820",
          500: "#c98b0c",
          600: "#a06e06",
        },
        mocha: {
          50: "#faf5f0",
          100: "#f2e6d8",
          200: "#e0c8ad",
          300: "#c9a07a",
          400: "#b07a52",
          500: "#8b5e3a",
          600: "#6e4428",
          700: "#4d2e18",
          800: "#3d2314",
          900: "#2a1708",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-cormorant)",
          "Cormorant Garamond",
          "Georgia",
          "serif",
        ],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(61, 43, 31, 0.06)",
        card: "0 4px 32px rgba(61, 43, 31, 0.08)",
        hover: "0 8px 40px rgba(61, 43, 31, 0.14)",
        gold: "0 4px 24px rgba(201, 139, 12, 0.15)",
      },
      backgroundImage: {
        "pattern-geo":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a882' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
