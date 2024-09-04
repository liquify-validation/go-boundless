/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B3FF4A", // Updated primary color
        bg: "#02160F", // Background color
        text: "#FFFFFF", // Main text color
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"], // Import and use Plus Jakarta Sans
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
