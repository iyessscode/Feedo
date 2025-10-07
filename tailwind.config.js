/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        foreground: "#181C2E",
        primary: {
          DEFAULT: "#FE8C00",
          foreground: "#FFFFFF ",
        },
        white: {
          DEFAULT: "#ffffff",
          100: "#fafafa",
          200: "#FE8C00",
        },
        gray: {
          100: "#878787",
          200: "#878787",
        },
        muted: {
          DEFAULT: "#6A6A6A",
          foreground: "#878787",
        },
        dark: {
          100: "#181C2E",
        },
        destructive: "#F14141",
        success: "#2F9B65",
        input: "#CBCBCB",
        border: "#EDEDED",
      },
      fontFamily: {
        quicksand: ["QuicksandRegular", "sans-serif"],
        "quicksand-bold": ["QuicksandBold", "sans-serif"],
        "quicksand-semibold": ["QuicksandSemibold", "sans-serif"],
        "quicksand-medium": ["QuicksandMedium", "sans-serif"],
        "quicksand-light": ["QuicksandLight", "sans-serif"],
      },
    },
  },
  plugins: [],
};
