/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#0f0", // Green
        "background-color": "#000", // Black
        "secondary-bg-color": "#222", // Dark grey
        "text-color-primary": "#fff", // White
        "text-color-secondary": "#aaa", // Light grey
      },
    },
  },
  plugins: [],
};
