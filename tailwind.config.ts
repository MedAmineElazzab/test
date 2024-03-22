/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        comment:
          "linear-gradient(360deg, #F9FAFC 0% ,rgba(249, 250, 252, .9) 60%,rgba(249, 250, 252, .6) 80%,rgba(249, 250, 252, 0) 100%)",
      },
      boxShadow: {
        notif:
          "0px 0px 0px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 3px 3px 0px rgba(0, 0, 0, 0.03), 0px 7px 4px 0px rgba(0, 0, 0, 0.02);",
        card: "0px 0px 30px rgba(0, 0, 0, 0.1)",
        attachment: "0px 0px 30px 0px rgba(0, 0, 0, 0.1)",
        input: "0px 0px 0px 4px rgba(230,237,252,1)",
        inputErrored: "0px 0px 0px 4px rgba(254,228,226,1)",
        "save-btn": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "module-card": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "flag-btn-hoverd":
          "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        "shadow-save-btn-hoverd":
          "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        "header-module-single": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "expert-card": " 0px 1px 2px 0px #1018280D",
        "data-area": "rgba(0, 0, 0, 0.01) 0px 1px 4px",
      },
      lineHeight: {
        "29": "29px",
      },
      minHeight: {
        "13": "49px",
        700: "700px",
        1000: "1000px",
        600: "600px",
      },
      maxHeight: {
        300: "300px",
      },
      gap: {
        "10": "10px",
      },
      height: {
        "19": "74px",
        dashboard: "calc(100% - 70px)",
        "0.5": "2px",
        500 : "500px"
      },
      width: {
        "22": "82px",
        "13": "50px",
        dashboard: "calc(100% - 82px)",
        "200": "200px",
        220: "220px",
        "f-50p": "calc(100% - 50px)",
        container: "1310px",
        "container-left-section": "calc(100% - 300px)",
        300: "300px",
        "f-67": "calc(100% - 67px)",
        "600": "600px",
        "f-20": "calc(100% - 20px)"
      },
      maxWidth: {
        "f-97": "calc(100% - 97px)",
        container: "1310px",
      },
      padding: {
        "11": "6px 10px 10px 10px",
        "5.5": "22px",
      },
      fontFamily: {
        SourceSans: ["Source Sans 3", "sans-serif"],
      },
      fontSize: {
        "2xs": "9px",
        "29": "29px",
        "3xs":"7px"
      },
      filter: {
        note: "drop-shadow(0px 0px 30px rgba(0,73,224, .2))",
      },
      colors: {
        primary: {
          light: "#e6edfc",
          normal: "#0049e0",
          dark: "#0037a8",
          darker: "#101828",
        },
        secondry: {
          normal: "#FECC00",
          light: "#FFFAE6",
        },
        brown: {
          normal: "#6B5600",
        },

        aside: "#0D1829",
        dark: {
          normal: "#282C38",
        },
      },
      screens: {
        w1300: { max: "1300px" },
        w1500: { max: "1500px" },
        w1900: { max: "1900px" },
        w1100: { max: "1100px" },
        w800: { max: "800px" },
        "w-phone": { max: "768px" },
        tall: { raw: "(max-height: 700px)" },
        min1920: { raw: "(min-width: 1921px)" },
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
      },
    },
  },
  plugins: [],
};