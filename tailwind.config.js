/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./store/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPink: "#ffd6ff",
        brandPurpleLight: "#e7c6ff",
        brandPurple: "#c8b6ff",
        brandBlueLight: "#b8c0ff",
        brandBlue: "#bbd0ff",
      },
    },
  },
  plugins: [],
};
