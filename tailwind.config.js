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
          muted: '#F3EFE6',
          dark: '#E7DFC6',
        },
        forest: {
          DEFAULT: '#143324',
          light: '#1E4732',
          dark: '#0B1D14',
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
          light: '#DFC088',
          dark: '#9A7135',
          subtle: '#F8F3EA',
          glow: '#E4BF78',
        },
        charcoal: {
          DEFAULT: '#1E201E',
          light: '#2D302D',
          muted: '#6F736E',
          subtle: '#9CA09A',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(20, 51, 36, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.8)',
        'glass-hover': '0 16px 40px -4px rgba(20, 51, 36, 0.12), inset 0 0 0 1px rgba(197, 154, 91, 0.4)',
        'glow-gold': '0 0 25px -4px rgba(197, 154, 91, 0.35)',
        'glow-forest': '0 0 25px -4px rgba(20, 51, 36, 0.35)',
        'card': '0 4px 20px -2px rgba(20, 51, 36, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 30px -4px rgba(20, 51, 36, 0.1), 0 4px 10px rgba(0, 0, 0, 0.03)',
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        shimmer: 'shimmer 3.5s infinite linear',
        float: 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
