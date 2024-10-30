/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: '#00CFFD', // Neon Sky Blue
        neonPink: '#FF007F', // Neon Pink
      },
      boxShadow: {
        neonBlue: '0 0 5px #00CFFD, 0 0 10px #00CFFD, 0 0 15px #00CFFD',
        neonPink: '0 0 5px #FF007F, 0 0 10px #FF007F, 0 0 15px #FF007F',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.neon-outline': {
          color: 'black',
          textShadow: `
            0 0 2px #00CFFD,
            0 0 4px #00CFFD,
            0 0 6px #00CFFD
          `,
        },
        '.neon-pink-outline': {
          color: 'black',
          textShadow: `
            0 0 2px #FF007F,
            0 0 4px #FF007F,
            0 0 6px #FF007F
          `,
        },
      });
    },
  ],
}

