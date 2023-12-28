/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: {
          100: "#E1DFE0",
          200: "#E1DFE0",
          300: "#D9D9D9"
        },
        mainbg: {
          100: "#f6f8fb",
        },
        button: {
          100: "#3B77BF",
        },
        grades: {
          low: "#CC3F4B",
          average: "#ffbb26",
          good: "#00a670",
        },
        disabled: {
          100: "#4D4D4F",
        },
        testbg: {
          100: "#f6f6f9",
          200: "#000",
         
        },
        testnav: {
          100: "#004975",
          200: "#A2DDFF",
          300: "#051F71"
        },
        inverted: {
          100: "#FCFCFC",
          
        }
      },
      fontFamily: {
        body: ["Poppins"],
        tables: ["Roboto"],
      },
      boxShadow: {
        card: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
