/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          400: '#C08E88',
          500: '#AA7771',
        },
        sage: {
          400: '#6A9A85',
          500: '#588572',
        }
      },
      fontFamily: {
        heading: ['Josefin Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
