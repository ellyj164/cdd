/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  safelist: [
    // Colors that are dynamically generated
    'bg-green-100', 'text-green-800', 'text-green-600', 'bg-green-900/30', 'text-green-400',
    'bg-blue-100', 'text-blue-800', 'text-blue-600', 'bg-blue-900/30', 'text-blue-400',
    'bg-purple-100', 'text-purple-800', 'text-purple-600', 'bg-purple-900/30', 'text-purple-400',
    'bg-orange-100', 'text-orange-800', 'text-orange-600', 'bg-orange-900/30', 'text-orange-400',
    'bg-gray-100', 'text-gray-800', 'text-gray-600', 'bg-gray-900/30', 'text-gray-400',
  ],
  plugins: [],
}
