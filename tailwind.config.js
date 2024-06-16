/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        // '72px': '72px',
      },
      width: {
        // '60px': '60px',
      },
      minWidth: {
        '240px': '240px',
      },
      maxWidth: {
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
        darkBackground: 'rgb(44,44,44)', // some inputs

        mediumEmerald: 'rgb(52 211 153)', // emerald-400

        mediumDarkCyan: 'rgb(8 145 178)', // cyan-500
        veryDarkCyan: 'rgb(14 116 144)', // cyan-700

        darkGreen: 'rgb(22 163 74)', // green-600

        lightRed: 'rgb(254 202 202)', // red-200
        mediumRed: 'rgb(248 113 113)', // red-400
        mediumDarkRed: 'rgb(239 68 68)', // red-500

        veryLightZinc: 'rgb(244 244 245)', // zinc-100
        veryLightZincOpacity10: 'rgb(244 244 245 / 0.1)', // zinc-100/10
        veryLightZincOpacity20: 'rgb(244 244 245 / 0.2)', // zinc-100/20
        lightZincOpacity40: 'rgb(228 228 231 / 0.4)', // zinc-200/40
        mediumLightZinc: 'rgb(212 212 216)', // zinc-300
        mediumZinc: 'rgb(161 161 170)', // zinc-400
        mediumDarkZinc: 'rgb(113 113 122)', // zinc-500
        mediumDarkZincOpacity10: 'rgb(113 113 122 / 0.1)', // zinc-500/10
        darkZinc: 'rgb(82 82 91)', // zinc-600
        darkZincOpacity90: 'rgb(82 82 91 / 0.9)', // zinc-600/90
        veryDarkZinc: 'rgb(63 63 70)', // zinc-700
        ultraDarkZinc: 'rgb(24 24 27 / 0.9)', // zinc-900/90
        nearBlackZinc: 'rgb(9 9 11)', // zinc-950

        mediumLightGray: 'rgb(209 213 219)', // gray-300
        mediumGray: 'rgb(156 163 175)', // gray-400
        mediumDarkGray: 'rgb(107 114 128)', // gray-500
        veryDarkGray: 'rgb(55 65 81)', // gray-700
        extraDarkGray: 'rgb(31 41 55)', // gray-800
      },
      colors: {
        black: colors.black,
        charcoal: 'rgb(53, 54, 59)',

        mediumEmerald: 'rgb(52 211 153)', // emerald-400

        mediumDarkCyan: 'rgb(8 145 178)', // cyan-500

        veryLightGreen: 'rgb(220 252 231)', // green-100
        mediumDarkGreen: 'rgb(34 197 94)', // green-500
        darkGreen: 'rgb(22 163 74)', // green-600
        veryDarkGreen: 'rgb(21 128 61)', // green-700
        nearBlackGreen: 'rgb(5 46 22)', // green-950

        veryDarkRed: 'rgb(185 28 28)', // red-700

        mediumDarkViolet: 'rgb(139 92 246)', // violet-500

        mediumDarkBlue: 'rgb(59 130 246)', // blue-500
        extraDarkBlue: 'rgb(30 64 175)', // blue-800
        nearBlackBlue: 'rgb(23 37 84)', // blue-950

        veryLightZinc: 'rgb(244 244 245)', // zinc-100
        mediumLightZinc: 'rgb(212 212 216)', // zinc-300
        mediumZinc: 'rgb(161 161 170)', // zinc-400

        darkZinc: 'rgb(82 82 91)', // zinc-600
        veryDarkZinc: 'rgb(63 63 70)', // zinc-700
        ultraDarkZinc: 'rgb(24 24 27)', // zinc-900

        mediumLightGray: 'rgb(209 213 219)', // gray-300
        mediumGray: 'rgb(156 163 175)', // gray-400
        mediumDarkGray: 'rgb(107 114 128)', // gray-500
        veryDarkGray: 'rgb(55 65 81)', // gray-700
        extraDarkGray: 'rgb(31 41 55)', // gray-800

        // 50: extraLight
        // 100: veryLight
        // 200: light
        // 300: mediumLight
        // 400: medium
        // 500: mediumDark
        // 600: dark
        // 700: veryDark
        // 800: extraDark
        // 900: ultraDark
        // 950: nearBlack
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
