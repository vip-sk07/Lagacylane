/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./LegacyLogin.html",
    "./journey-selection.html",
    "./timeline.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // Shadcn UI Semantic Color Tokens
        border: 'hsl(var(--border, 217 33% 18%))',
        input: 'hsl(var(--input, 217 33% 18%))',
        ring: 'hsl(var(--ring, 142 76% 45%))',
        background: 'hsl(var(--background, 222 84% 5%))',
        foreground: 'hsl(var(--foreground, 210 40% 98%))',
        primary: {
          DEFAULT: 'hsl(var(--primary, 142 76% 45%))',
          foreground: 'hsl(var(--primary-foreground, 355 100% 97%))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary, 217 33% 18%))',
          foreground: 'hsl(var(--secondary-foreground, 210 40% 98%))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive, 0 84% 60%))',
          foreground: 'hsl(var(--destructive-foreground, 210 40% 98%))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted, 217 33% 18%))',
          foreground: 'hsl(var(--muted-foreground, 215 20% 65%))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent, 45 93% 58%))',
          foreground: 'hsl(var(--accent-foreground, 222 47% 11%))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover, 222 84% 7%))',
          foreground: 'hsl(var(--popover-foreground, 210 40% 98%))',
        },
        card: {
          DEFAULT: 'hsl(var(--card, 222 84% 7%))',
          foreground: 'hsl(var(--card-foreground, 210 40% 98%))',
        },

        // Tactical & Athletic Design Palettes
        tactical: {
          bg: '#04090d',
          panel: 'rgba(8, 16, 26, 0.88)',
          emerald: '#00e676',
          cyan: '#00e5ff',
          amber: '#ffb300',
          red: '#ff1744',
          border: 'rgba(0, 230, 118, 0.25)',
          glow: 'rgba(0, 230, 118, 0.4)'
        },

        // LegacyLane Archival Heritage Palettes
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
        display: ['Fraunces', 'Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        teko: ['Teko', 'sans-serif']
      },
      borderRadius: {
        lg: 'var(--radius, 0.75rem)',
        md: 'calc(var(--radius, 0.75rem) - 2px)',
        sm: 'calc(var(--radius, 0.75rem) - 4px)',
      },
      animation: {
        // Tailwind CSS Animated Suite
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-out': 'fadeOut 0.25s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-out-right': 'slideOutRight 0.3s cubic-bezier(0.7, 0, 0.84, 0) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'scale-out': 'scaleOut 0.2s ease-in forwards',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spring-bounce': 'springBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'warm-shimmer': 'warmShimmer 3s ease-in-out infinite alternate',
        'float': 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.92)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        },
        springBounce: {
          '0%': { transform: 'scale(0.8) translateY(10px)', opacity: '0' },
          '70%': { transform: 'scale(1.04) translateY(-2px)', opacity: '1' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' }
        },
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
