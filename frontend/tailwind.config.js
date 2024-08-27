module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Asegúrate de que Tailwind CSS escanee todos tus archivos
  ],
  theme: {
    extend: {
      colors: {
        primary: '#333842',
        accent: '#0085FF',
        background: '#111111',
        inputBg: '#222831',
        buttonBg: '#0085FF',
        buttonHoverBg: '#005bb5',
        text: '#FFFFFF',
      },
      fontFamily: {
        moderustic: ['Moderustic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
