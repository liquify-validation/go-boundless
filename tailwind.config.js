/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B3FF4A",
        bg: "#02160F",
        text: "#FFFFFF",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.2" }],
        h2: ["36px", { lineHeight: "1.3" }],
        h3: ["28px", { lineHeight: "1.4" }],
        h4: ["20px", { lineHeight: "1.5" }],
        p: ["18px", { lineHeight: "1.6" }],
      },
    },
  },
  plugins: [],
};
