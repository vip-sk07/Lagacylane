/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        archival: {
          canvas: '#0E0D0B',
          surface: '#171513',
          elevated: '#1E1B18',
          border: '#2C2621',
          gold: '#D4AF37',
          amber: '#F59E0B',
          stone: '#26221E'
        },
        parchment: {
          ivory: '#F5F2EB',
          linen: '#C2B9A7',
          muted: '#8C8273'
        },
        heritage: {
          green: '#2D6A4F',
          hunter: '#1B4332',
          sienna: '#9C4123',
          navy: '#1B2E4B',
          cream: '#FAF6EE'
        },
        pitch: {
          dark: '#0D1A13',
          lines: '#2D6A4F',
          accent: '#52B788',
          gold: '#D4AF37'
        },
        court: {
          dark: '#1C130D',
          lines: '#C05621',
          wood: '#9C4123'
        },
        track: {
          dark: '#1D1214',
          red: '#9C2A2A'
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      },
      animation: {
        'warm-shimmer': 'warmShimmer 3s ease-in-out infinite alternate',
        'float': 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite'
      },
      keyframes: {
        warmShimmer: {
          '0%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.15), 0 0 30px rgba(212, 175, 55, 0.05)' },
          '100%': { boxShadow: '0 0 25px rgba(212, 175, 55, 0.3), 0 0 45px rgba(212, 175, 55, 0.1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    },
  },
  plugins: [],
}
