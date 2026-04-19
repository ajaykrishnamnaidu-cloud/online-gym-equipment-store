/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fde047', // Yellow-300
          DEFAULT: '#eab308', // Yellow-500
          dark: '#a16207', // Yellow-800
        },
        dark: {
          light: '#374151', // Gray-700
          DEFAULT: '#111827', // Gray-900
          dark: '#030712', // Gray-950
        }
      }
    },
  },
  plugins: [],
}
