/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        surface: '#1E1E1E',
        primary: '#BB86FC',
        secondary: '#03DAC6',
        error: '#CF6679',
        accent: {
          red: '#CF6679',
          blue: '#64B5F6',
          purple: '#BB86FC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        productivityTheme: {
          "primary": "#BB86FC",
          "secondary": "#03DAC6",
          "accent": "#CF6679",
          "neutral": "#191D24",
          "base-100": "#121212",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
    darkTheme: "productivityTheme",
  },
}; 