/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        namsGreen: "#041b04", // Base dark green
        namsDark: "#013001",  // Deeper green shade
        namsLight: "#0b3b0b", // Lighter shade for hover or accents
      },
      backgroundImage: {
        // Optional: for your radiant/round glow background
        'nams-radial': 'radial-gradient(circle, #0b3b0b 0%, #013001 60%, #041b04 100%)',
      },
    },
  },
  plugins: [],
};
