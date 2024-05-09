const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    colors: {
      pricol: "#0C356A",
      seccol: "#FFF0CE",
      acccol: "#FFC436",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [flowbite.plugin(), require("daisyui")],
};
