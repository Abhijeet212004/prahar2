/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        prahar: {
          dawn: '#FFC8DD',      // Prahar 1
          morning: '#FDFFB6',   // Prahar 2
          midday: '#CAFFBF',    // Prahar 3
          afternoon: '#9BF6FF', // Prahar 4
          evening: '#A0C4FF',   // Prahar 5
          sunset: '#BDB2FF',    // Prahar 6
          twilight: '#9D4EDD',  // Prahar 7
          night: '#10002B'      // Prahar 8
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};