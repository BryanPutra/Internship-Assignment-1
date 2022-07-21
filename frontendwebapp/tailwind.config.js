/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      red: "#ED1D25",
      pink: "#FA3F70",
      calmPink: "#FF8E8E",
      softPink: "#FED3E0",
      lightPink: "#FDEFF4",
      black: "#090809",
      white: "#FFFFFF",
      grey: "#ccc",
      darkGrey: "#A9A9A9",
      textDarkGrey: "#9E9E9E",
      whiteGrey: "#f9f8fd",
      paleGrey: "#f2f2f2",
      activityIndicatorColor: "#FA3F70",
    },
  },
  plugins: [],
});
