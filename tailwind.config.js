/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        '10px': '10px',
        '40px': '40px',
        '72px': '72px',
        '200px': '200px',
      },
      width: {
        '10px': '10px',
        '100px': '100px',
        '160px': '160px',
        '200px': '200px',
        '250px': '250px',
        '260px': '260px',
        '300px': '300px',
        '400px': '400px',
      },
      minWidth: {
        '200px': '200px',
        '220px': '220px',
        '240px': '240px',
        '360px': '360px',
      },
      maxWidth: {
        '200px': '200px',
        '300px': '300px',
        '320px': '320px',
      },
      fontFamily: {
        body: ['"Open Sans"', 'sans'],
      },
      backgroundImage: {
        'main-bcg': "url('/src/assets/bcg.webp')",
        'main-bcg2': "url('/src/assets/bcg-dark.webp')",
        'loader-bcg': "url('/src/assets/loader-img.webp')",
      },
      backgroundColor: {
        main: 'rgb(229 231 235)',
        mainBlack: 'rgb(33,33,33)',
        darkBackground: 'rgb(44,44,44)',

        mediumEmerald: 'rgb(52 211 153)',

        mediumDarkCyan: 'rgb(8 145 178)',
        veryDarkCyan: 'rgb(14 116 144)',

        darkGreen: 'rgb(22 163 74)',

        lightRed: 'rgb(254 202 202)',
        mediumRed: 'rgb(248 113 113)',
        mediumDarkRed: 'rgb(239 68 68)',

        veryLightZinc: 'rgb(244 244 245)',
        veryLightZincOpacity10: 'rgb(244 244 245 / 0.1)',
        veryLightZincOpacity20: 'rgb(244 244 245 / 0.2)',
        lightZincOpacity40: 'rgb(228 228 231 / 0.4)',
        mediumLightZinc: 'rgb(212 212 216)',
        mediumZinc: 'rgb(161 161 170)',
        mediumDarkZinc: 'rgb(113 113 122)',
        mediumDarkZincOpacity10: 'rgb(113 113 122 / 0.1)',
        darkZinc: 'rgb(82 82 91)',
        darkZincOpacity90: 'rgb(82 82 91 / 0.9)',
        veryDarkZinc: 'rgb(63 63 70)',
        ultraDarkZinc: 'rgb(24 24 27 / 0.9)',
        nearBlackZinc: 'rgb(9 9 11)',

        mediumLightGray: 'rgb(209 213 219)',
        mediumGray: 'rgb(156 163 175)',
        mediumDarkGray: 'rgb(107 114 128)',
        veryDarkGray: 'rgb(55 65 81)',
        extraDarkGray: 'rgb(31 41 55)',
      },
      colors: {
        black: colors.black,
        charcoal: 'rgb(53, 54, 59)',

        mediumEmerald: 'rgb(52 211 153)',

        mediumDarkCyan: 'rgb(8 145 178)',

        veryLightGreen: 'rgb(220 252 231)',
        mediumDarkGreen: 'rgb(34 197 94)',
        darkGreen: 'rgb(22 163 74)',
        veryDarkGreen: 'rgb(21 128 61)',
        nearBlackGreen: 'rgb(5 46 22)',

        veryDarkRed: 'rgb(185 28 28)',

        mediumDarkViolet: 'rgb(139 92 246)',

        mediumDarkBlue: 'rgb(59 130 246)',
        extraDarkBlue: 'rgb(30 64 175)',
        nearBlackBlue: 'rgb(23 37 84)',

        veryLightZinc: 'rgb(244 244 245)',
        mediumLightZinc: 'rgb(212 212 216)',
        mediumZinc: 'rgb(161 161 170)',

        darkZinc: 'rgb(82 82 91)',
        veryDarkZinc: 'rgb(63 63 70)',
        ultraDarkZinc: 'rgb(24 24 27)',

        mediumLightGray: 'rgb(209 213 219)',
        mediumGray: 'rgb(156 163 175)',
        mediumDarkGray: 'rgb(107 114 128)',
        veryDarkGray: 'rgb(55 65 81)',
        extraDarkGray: 'rgb(31 41 55)',
      },
      boxShadow: {
        mainShadow: '0 0.25rem 0.5rem 0.125rem rgb(16,16,16,0.612)',
        secondaryShadow: '0 0.2rem 0.75rem 0.125rem rgba(16, 16, 16, 0.612)',
        whiteTopShadow:
          '0rem -0.6875rem 0.4375rem -0.4375rem rgba(255, 255, 255, 0.612)',
        bottomShadow: '0 0.5rem 0.75rem 0.125rem rgba(16, 16, 16, 0.612)',
      },

      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.4)' },
        },
      },
      animation: {
        blink: 'blink 1s infinite',
        pulse: 'pulse 1s infinite',
      },
    },
  },
  plugins: [],
};
