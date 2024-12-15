import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
  plugins: [daisyui],
}

