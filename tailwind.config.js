/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      app: ["Montserrat", "Roboto", "sans-serif"],
    },
    colors: {
      gray: colors.gray,
      white: colors.white,
      purple: colors.purple,
      slate: colors.slate,
      sky: colors.sky,
      red: colors.red,
    },
  },
  plugins: [],
  darkMode: "selector",
};
