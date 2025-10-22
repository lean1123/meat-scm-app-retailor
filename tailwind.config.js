/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/app/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/components/**/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          light: '#93C5FD',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#64748B',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#FACC15',
          foreground: '#1E293B',
        },
        background: '#F9FAFB',
        foreground: '#0F172A',
        card: '#FFFFFF',
        success: '#22C55E',
        destructive: '#EF4444',
        info: '#0EA5E9',
      },
    },
  },
  plugins: [],
};
