/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#1a1a2e",
          light: "#262640",
        },
        gold: {
          DEFAULT: "#c9a84c",
          light: "#f0d080",
        },
        surface: {
          DEFAULT: "#f5f4f0",
          2: "#eeecea",
        },
      },
    },
  },
  plugins: [],
};
