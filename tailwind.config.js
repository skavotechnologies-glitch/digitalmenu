/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--color-brand-50, #fef3c7)',
          100: 'var(--color-brand-100, #fde68a)',
          200: 'var(--color-brand-200, #fcd34d)',
          500: 'var(--color-brand-500, #f59e0b)',
          600: 'var(--color-brand-600, #d97706)',
          700: 'var(--color-brand-700, #b45309)',
          800: 'var(--color-brand-800, #92400e)',
          900: 'var(--color-brand-900, #78350f)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
