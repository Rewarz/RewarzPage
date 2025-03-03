import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}" // Agrega esto para HeroUI
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()], // Agregar HeroUI como plugin de Tailwind
};

export default config;
