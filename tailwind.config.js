/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      josefin: ["'Josefin Sans', sans-serif"],
      playfair: ['"Playfair Display", serif'],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#fefefe",
      black: "#040404",
      lightBrown: "#ae7c39",
    },
    extend: {
      backgroundImage: {
        "hero-image": "url('/heroBanner.webp')",
        "news-letter-image": "url('/news-letter.jpg')",
      },
    }
  },
  plugins: [],
};
