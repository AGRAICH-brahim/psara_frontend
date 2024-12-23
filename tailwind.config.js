import daisyui from 'daisyui';
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}',  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        backg: {
          100: "#d86404"
        }

      },
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px',
        'max-sm': { 'max': '639px' },
        'max-md': { 'max': '817px' },
        'max-lg': { 'max': '1023px' },
        'max-xl': { 'max': '1279px' },
        'max-2xl': { 'max': '1535px' },
      },
    },
  },
  plugins: [daisyui, nextui()],
}

