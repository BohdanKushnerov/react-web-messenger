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
      },
      backgroundColor: {
        "mybcg": "#1F2025"
      },
      colors: {
        "textcolor": '#707175',
        "inputChar": "#35363B",
        "inputCharSelect": "#13BAEE",
        "myblue": "#13BAEE",
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

