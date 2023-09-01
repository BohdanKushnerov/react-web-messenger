/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-bcg': "url('/src/assets/bcg.jpg')",
      }
    },
  },
  plugins: [],
}

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'main-bcg': "url('/src/assets/bcg.jpg')",
//       }
//     },
//   },
//   plugins: [],
// }

