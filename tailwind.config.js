/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],    
  theme: {
    extend: {
      colors: {
        'DesaturatedDarkCyan': 'hsl(180, 29%, 50%)',
        'Background': 'hsl(180, 52%, 96%)',
        'FilterTablets': 'hsl(180, 31%, 95%)',
        'DarkGrayishCyan': 'hsl(180, 8%, 52%)',
        'VeryDarkGrayishCyan': 'hsl(180, 14%, 20%)'
      }
    },
  },
  plugins: [],
}

