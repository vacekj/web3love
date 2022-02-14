/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        coral: {
          50: '#FFEFEB',
          100: '#FFE4DB',
          200: '#FFC4B3',
          300: '#FFA98F',
          400: '#FF8E6B',
          500: '#FF7246',
          600: '#FF3F05',
          700: '#C22D00',
          800: '#801E00',
          900: '#420F00',
        },
        crimson: {
          50: '#FFEBEC',
          100: '#FFDBDE',
          200: '#FFB3B8',
          300: '#FF8F96',
          400: '#FF6B75',
          500: '#FF4550',
          600: '#FF0516',
          700: '#C2000D',
          800: '#800008',
          900: '#420004',
        },
        teal: {
          50: '#E1FDFF',
          100: '#C3FBFE',
          200: '#86F7FD',
          300: '#4AF3FC',
          400: '#0EEFFB',
          500: '#03BEC8',
          600: '#0299A1',
          700: '#027379',
          800: '#014C50',
          900: '#012628',
        },
        yellow: {
          50: '#FFFAF0',
          100: '#FFF5E1',
          200: '#FFECC7',
          300: '#FEE2A9',
          400: '#FED88B',
          500: '#FECE6E',
          600: '#FDB525',
          700: '#DA9202',
          800: '#936201',
          900: '#472F00',
        },
        skin: {
          50: '#FFFFFF',
          100: '#FFFDFA',
          200: '#FFFAF5',
          300: '#FFF8F0',
          400: '#FFF5EB',
          500: '#FFF4E8',
          600: '#FFC485',
          700: '#FF9524',
          800: '#C26400',
          900: '#613200',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
