/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc2fc',
          400: '#389df8',
          500: '#0e7ee9',
          600: '#0261c7',
          700: '#034aa1',
          800: '#073e85',
          900: '#0c326e',
          violet: '#8b5cf6',
          pink: '#ec4899',
          dark: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
