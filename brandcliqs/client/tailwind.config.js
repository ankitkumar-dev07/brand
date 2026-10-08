export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
        ],
      },
      colors: {
        brand: {
          purple: '#6D28D9',
          orange: '#FF8A00',
          ink: '#171322',
          lav: '#F3E8FF',
        },
      },
    },
  },
  plugins: [],
};