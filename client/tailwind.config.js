/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["\"Space Grotesk\"", "sans-serif"],
        body: ["\"Manrope\"", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(14, 165, 233, 0.18)",
        panel: "0 12px 40px rgba(15, 23, 42, 0.14)"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at top left, rgba(34,211,238,0.24), transparent 28%), radial-gradient(circle at top right, rgba(244,114,182,0.16), transparent 22%), linear-gradient(135deg, rgba(2,6,23,0.96), rgba(15,23,42,0.9))"
      },
      colors: {
        fintech: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63"
        }
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        slowSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        slowSpin: "slowSpin 22s linear infinite"
      }
    }
  },
  plugins: []
};
