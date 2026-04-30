/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#06080F',
          deep: '#0D1B3E',
          violet: '#1A0B2E',
        },
        accent: {
          primary: '#4F8EF7',
          glow: '#8B5CF6',
        },
        bullish: '#34D399',
        bearish: '#F87171',
        neutral: '#7A869A',
        text: {
          primary: '#F0F4FF',
          muted: '#8B95A8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrainsMono', 'monospace'],
      },
    },
  },
  plugins: [],
};
