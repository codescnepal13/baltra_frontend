/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gothamNarrow: ["Gotham Narrow", "sans-serif"],
      },
      animation: {
        "3d-spin": "spin3D 2s linear infinite",
        "logo-scale": "fadeInScale 2s ease-in-out forwards",
      },
      keyframes: {
        spin3D: {
          "0%": { transform: "rotateX(0deg) rotateY(0deg)" },
          "50%": { transform: "rotateX(180deg) rotateY(180deg)" },
          "100%": { transform: "rotateX(360deg) rotateY(360deg)" },
        },
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    rotate: false,
  },
};
