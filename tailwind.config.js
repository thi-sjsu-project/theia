/** @type {import('tailwindcss').Config} */
const tailwindConfig =  {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // cursor: {
      //   default: 'url(https://i.stack.imgur.com/UOvLJ.png), default',
      //   pointer: 'url(https://i.stack.imgur.com/UOvLJ.png), pointer',
      // },
    },
    colors: {
      ...require('tailwindcss/colors'),
      turquoise: "#19debb",
      "muted-gray": "#97979d",
      convo: {
        bar: "#656566",
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;