/** @type {import('tailwindcss').Config} */

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // cursor: {
      //   default: 'url(https://i.stack.imgur.com/UOvLJ.png), default',
      //   pointer: 'url(https://i.stack.imgur.com/UOvLJ.png), pointer',
      // },
      animation: {
        "slide-in-left": 'slide-in-left 10s ease-out'
      },
      keyframes: {
        "slide-in-left": {
          '0%': {
            transform: 'translateX(100%)'
          },
          '25%': {
            transform: 'translateX(0)'
          },
          '50%': {
            opacity: 0.75
          },
          '75%': {
            opacity: 0.50
          },
          '87%': {
            opacity: 0.25
          },
          '100%': {
            opacity: 0
          }
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
