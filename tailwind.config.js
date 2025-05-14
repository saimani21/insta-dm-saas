/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',  // <-- optional if you're using CSS variables
      },
    },
  },
  plugins: [],
};
