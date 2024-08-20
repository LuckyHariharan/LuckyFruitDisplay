/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#1a1a1a", // Dark background color
        primaryText: "#ffffff", // Primary text color (white)
        secondaryText: "#b3b3b3", // Secondary text color (grayish)
        primaryButton: "#1c7ed6", // Primary button color (blue)
        buttonHover: "#1864ab", // Button hover color (darker blue)
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Clean, modern sans-serif font
      },
    },
  },
  plugins: [],
};
