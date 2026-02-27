/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#060911',
          900: '#0a1628',
          800: '#111827',
          700: '#1a2332',
          600: '#243044',
          500: '#2d3d56',
          400: '#4a6382',
          300: '#6b8ab0',
          200: '#94b3d4',
          100: '#c4d9ef',
          50: '#e2ecf7',
        },
        crimson: {
          900: '#5c1010',
          800: '#7a1616',
          700: '#8b2020',
          600: '#b91c1c',
          500: '#dc2626',
          400: '#ef4444',
          300: '#f87171',
        },
        amber: {
          700: '#b45309',
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',
          300: '#fcd34d',
        },
        iron: {
          600: '#2d3748',
          500: '#374151',
          400: '#4a5568',
          300: '#6b7280',
          200: '#9ca3af',
          100: '#d1d5db',
        },
        gold: {
          600: '#a07830',
          500: '#c4943a',
          400: '#d4b85c',
          300: '#e0c96d',
          200: '#f0dfa0',
        },
        brass: {
          500: '#8b7355',
          400: '#a08968',
          300: '#b8a080',
        },
        parchment: {
          500: '#d4c4a0',
          400: '#e8d8b4',
          300: '#f5e6c8',
          200: '#faf0dc',
          100: '#fdf8ef',
        },
        teal: {
          700: '#134e4e',
          600: '#1a6b6b',
          500: '#2a8a8a',
          400: '#3aadad',
          300: '#5ecece',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
        narration: ['Crimson Text', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.4' }],   /* 13px - bumped from 12px */
        'sm': ['0.875rem', { lineHeight: '1.5' }],     /* 14px */
        'base': ['1rem', { lineHeight: '1.6' }],       /* 16px */
        'lg': ['1.125rem', { lineHeight: '1.6' }],     /* 18px */
        'xl': ['1.25rem', { lineHeight: '1.5' }],      /* 20px */
        '2xl': ['1.5rem', { lineHeight: '1.4' }],      /* 24px */
        '3xl': ['1.75rem', { lineHeight: '1.3' }],     /* 28px */
        '4xl': ['2.25rem', { lineHeight: '1.2' }],     /* 36px */
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slash-trail': 'slash-trail 0.4s ease-out forwards',
        'impact-burst': 'impact-burst 0.5s ease-out forwards',
        'move-splash': 'move-name-splash 1.2s ease-out forwards',
        'combo-pulse': 'combo-pulse 0.3s ease-out',
        'charge-glow': 'charge-glow 0.5s ease-in forwards',
        'crew-entry': 'crew-slide-in 0.5s ease-out forwards',
        'king-border': 'king-border-pulse 2s ease-in-out infinite',
        'enemy-shatter': 'enemy-shatter 0.8s ease-out forwards',
        'damage-mega': 'damage-mega 1.8s ease-out forwards',
        'effect-proc': 'effect-proc 1.0s ease-out forwards',
        'drift-slow': 'drift-slow 30s linear infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(249, 158, 11, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(249, 158, 11, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
