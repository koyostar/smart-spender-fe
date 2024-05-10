const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    colors: {
      darkpri: "#4B527E",
      lightpri: "#DBDFEA",
      darksec: "#5F5D9C",
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
