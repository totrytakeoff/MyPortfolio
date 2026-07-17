/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#090a0d',
        surface: '#0f1116',
        'surface-2': '#171a21',
        border: '#272b34',
        'border-hover': '#464d5c',
        'text-primary': '#f0f2f5',
        'text-muted': '#a8adb8',
        'text-dim': '#78808e',
        accent: '#91b5ff',
        'accent-dim': '#18284a',
        'status-green': '#71d7a3',
        'status-green-dim': '#163a2a',
        'status-amber': '#eabf74',
        'status-amber-dim': '#3d2b13',
        'status-red': '#ed8a8a',
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '1240px',
        reading: '760px',
      },
    },
  },
  plugins: [],
}
