/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a0e14',
          2: '#0e131b',
        },
        ink: {
          DEFAULT: '#101214',
          muted: '#65686d',
        },
        off: {
          DEFAULT: '#faf9f7',
          2: '#f2f0eb',
        },
        pale: {
          DEFAULT: '#f5f4f0',
          slate: '#9aa3ad',
        },
        amber: {
          DEFAULT: '#f2a93b',
          glow: '#ffb94f',
        },
        accentgreen: '#3f9463',
      },
      fontFamily: {
        magz: ['Magz', 'Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(242, 169, 59, 0.12) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
