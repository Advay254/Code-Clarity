/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#f7f4ef",
          100: "#ede8df",
          200: "#d9cfbf",
          300: "#c2b49a",
          400: "#a99470",
          500: "#8f7550",
          600: "#735e3e",
          700: "#5a4830",
          800: "#3d3020",
          900: "#1e1810",
          950: "#0f0c08",
        },
        gold: {
          400: "#d4a843",
          500: "#c49a35",
          600: "#a07e28",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#d9cfbf",
            a: { color: "#d4a843" },
            h1: { color: "#f7f4ef" },
            h2: { color: "#f7f4ef" },
            h3: { color: "#ede8df" },
            strong: { color: "#ede8df" },
            blockquote: {
              borderLeftColor: "#d4a843",
              color: "#c2b49a",
            },
            code: {
              color: "#d4a843",
              backgroundColor: "#1e1810",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
