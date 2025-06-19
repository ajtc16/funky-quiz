/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      // --- AÑADE ESTO ---
      animation: {
        'floating': 'floating 4s ease-in-out infinite', // Hice la animación un poco más lenta (4s)
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' }, // Un poco más de altura para que se note
        },
      },
      // --- FIN DE LO QUE HAY QUE AÑADIR ---
    },
  },
  plugins: [],
  
}

