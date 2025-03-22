// tailwind.config.js
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}', 
    ],
    theme: {
      extend: {
        fontFamily: {
          tamagotchi: ['"Press Start 2P"', 'cursive'], // Custom Tamagotchi-style font
        },
      },
    },
    plugins: [],
  }
  