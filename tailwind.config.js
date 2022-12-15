/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui", "Noto Sans"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
