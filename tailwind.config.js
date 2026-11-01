/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#e9e9e5',
        paper: '#ffffff',
        'paper-2': '#f6f6f3',
        ink: {
          DEFAULT: '#0c0d0f',
          800: '#17181b',
          700: '#26282d',
        },
        steel: {
          600: '#3f424a',
          500: '#5f636c',
          400: '#888c95',
          300: '#b4b7bd',
          200: '#d6d7d3',
          100: '#ececea',
        },
        line: {
          DEFAULT: '#e0e0db',
          strong: '#c9c9c3',
          dark: 'rgba(255, 255, 255, 0.12)',
        },
        brand: {
          DEFAULT: '#5b8314',
          hover: '#48680f',
          soft: '#f4f8ec',
          bright: '#84cc16',
          border: '#d4e6b5',
        },
        industrial: {
          950: '#070a0d',
          900: '#0c1015',
          850: '#11171f',
          800: '#161f2a',
          700: '#222f3e',
          600: '#344558',
          500: '#536b85',
          steel: '#8fa2b7',
          chalk: '#e6edf3',
          green: '#5b8314',
          'green-light': '#84cc16',
          'green-dark': '#48680f',
          hazard: '#d97706',
          danger: '#dc2626'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Archivo', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
