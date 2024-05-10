const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    colors: {
      pricol: "#0C356A",
      seccol: "#FFF0CE",
      acccol: "#FFC436",
      darkpri: "#2E4374",
      lightpri: "#DBDFEA",
      darksec: "#4B527E",
      lightsec: "#ACB1D6",
      darkacc: "#E5C3A6",
      lightacc: "#FFEAD2",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        moneybg: "url('/public/app-bg.jpg')",
      },
    },
  },
  plugins: [flowbite.plugin(), require("daisyui")],
};
