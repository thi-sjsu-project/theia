/** @type {import('tailwindcss').Config} */

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        "slide-in-left": 'slide-in-left 10s ease-out forwards'
      },
      keyframes: {
        "slide-in-left": {
          '0%': {
            transform: 'translateX(100%)',
            opacity: 1,
          },
          '50%': {
            transform: 'translateX(50%)',
            opacity: 0.75,
          },
          '75%': {
            opacity: 0.50,
          },
          '87%': {
            opacity: 0.25,
          },
          '100%': {
            transform: 'translateX(560px)',
            opacity: 0,
          },
        }
      }
    },
    fontFamily: {
      sans: ['Roboto Condensed', 'system-ui', 'sans-serif'],
    },
    colors: {
      ...require('tailwindcss/colors'),
      turquoise: "#19debb",
      "muted-gray": "#97979d",
      convo: {
        bar: "#656566",
        bg: "#252526",
      },
    },
  },
  plugins: [],
};

export default config;
