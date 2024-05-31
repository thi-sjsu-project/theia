const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        "slide-in-right": 'slide-in-right 2s ease-out forwards',
        "blur-away": 'blur-away 7s ease-out forwards',
      },
      keyframes: {
        "slide-in-right": {
          '0%': {
            transform: 'translateX(100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(560px)',
            opacity: 1,
          },
        },
        "blur-away": {
          '0%': {
            opacity: 1,
          },
          '20%': {
            opacity: 1,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
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
