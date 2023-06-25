/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        heartbeat: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.15)',
          },
        },
        // ... other keyframes
      },
      animation: {
        'heartbeat': 'heartbeat 1s infinite',
        // ... other animations
      },
      // ... other properties
      transitionProperty: {
        height: 'height'
      }
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-animated')
  ],
}
