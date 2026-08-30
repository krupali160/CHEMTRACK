/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        matcha: {
          DEFAULT: '#BAD797',
          light: '#D6E8C2',
          dark: '#84A759',
          deep: '#354A1E',
        },
        cherry: {
          DEFAULT: '#670626',
          dark: '#48031A',
          deeper: '#2D0210',
          light: '#88183B',
          soft: '#520B22',
        },
        cream: {
          DEFAULT: '#FFF3D6',
          pure: '#FFFFFF',
          muted: '#F5E6C3',
          border: 'rgba(255, 243, 214, 0.2)',
        },
        dark: {
          bg: '#141312',
          card: '#FFF3D6',
          surface: '#F8EFE0',
          panel: '#22201E',
          panelBorder: '#36322F',
          border: '#E8DCB8',
          text: '#FFF3D6',
          ink: '#171514',
          mutedInk: '#4A423B',
          cherry: '#670626',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        tight: '-0.015em',
      },
      boxShadow: {
        'cherry': '0 8px 30px -4px rgba(103, 6, 38, 0.28), 0 4px 12px -2px rgba(103, 6, 38, 0.15)',
        'cherry-lg': '0 14px 40px -6px rgba(103, 6, 38, 0.38)',
        'dark-card': '0 8px 30px -4px rgba(0, 0, 0, 0.45)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
