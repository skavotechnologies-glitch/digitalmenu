/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF7F2',
          light: '#FDFBF7',
          muted: '#F2EDE4',
          dark: '#E7DFC6',
        },
        forest: {
          DEFAULT: '#183D2B',
          light: '#23533B',
          dark: '#0F261B',
          subtle: '#E8EFEA',
        },
        sage: {
          DEFAULT: '#8FA58B',
          light: '#C7D5C4',
          dark: '#677D64',
          subtle: '#F0F4EF',
        },
        gold: {
          DEFAULT: '#C59A5B',
          light: '#E2C79A',
          dark: '#A67B3B',
          subtle: '#F8F3EA',
        },
        charcoal: {
          DEFAULT: '#242424',
          light: '#3A3A3A',
          muted: '#77736D',
          subtle: '#A8A49E',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px -2px rgba(24, 61, 43, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 8px 24px -4px rgba(24, 61, 43, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03)',
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
