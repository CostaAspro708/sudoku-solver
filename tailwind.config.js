var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        'sudoku': 'repeat(9, minmax(0, 0.5fr))',
      }
    },
  },
  plugins: [],
}
