/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',      // Para as páginas do Next.js
    './components/**/*.{js,ts,jsx,tsx}', // Para os componentes
    './app/**/*.{js,ts,jsx,tsx}',        // Caso use a nova pasta app no Next.js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};



