/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        smartline: {
          50: "#eefbfe",
          100: "#d6f4fc",
          200: "#b0e9f8",
          300: "#84dbf2",
          400: "#58c8e3", // Your brand color
          500: "#3cb0cd",
          600: "#2b8da8",
          700: "#246f86",
          800: "#215c6e",
          900: "#1e4d5d",
        },
      },
    },
  },
};
