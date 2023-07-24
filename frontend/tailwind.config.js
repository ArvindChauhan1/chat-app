/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    boxSizing: {
      'border-box': 'border-box',
      'content-box': 'content-box',
    },
  },
  plugins: [],
}