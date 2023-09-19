/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        "72px": "72px",
      },
      minWidth: {
        '240px': '240px',
        '300px': '300px',
        '400px': '400px',
      },

      maxWidth: {
        '320px': '320px',
      },
      fontFamily: {
        body: ['"Open Sans"', 'sans'],
        // mono: ['"Roboto Mono"', 'monospace'],
      },
      backgroundImage: {
        'main-bcg': "url('/src/assets/bcg.jpg')",
        'main-bcg2': "url('/src/assets/bcg-dark.jpg')",
      },
      backgroundColor: {
        mybcg: '#1F2025',
        myBlackBcg: 'rgb(33,33,33)',
        mySeacrhBcg: 'rgb(44,44,44)',
      },
      colors: {
        textSecondary: 'rgb(170,170,170)',
        textcolor: '#707175',
        inputChar: '#35363B',
        inputCharSelect: '#13BAEE',
        myblue: '#13BAEE',
      },
    },
  },
  plugins: [],
};