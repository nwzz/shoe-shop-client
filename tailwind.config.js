module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: { 100: "30rem" },
      gridTemplateRows: {
        twoRows: "56px 1fr",
        threeRows: "56px 1fr 56px",
      },
      gridTemplateColumns: {
        layout: "240px 1fr",
      },
      colors: {
        primary: "#273238",
        secondary: "#eaedf7",
        success: "#19b159",
        danger: "#f16d75",
        info: "#01b8ff",
        warning: "#ff9b21",
        darker: "#111827",
        dark: "#1f2937",
        lighter: "#f3f4f6",
        light: "#e2e4e8",
        orange: "#ff7722",
        yam: "#CC5801",
      },
      fontFamily: {
        body: ["Montserrat"],
      },
      screens: {
        "3xl": "1920PX",
        // print: { raw: "print" },
      },
    },
  },
  variants: {
    extend: {
      transitionProperty: ["hover", "focus"],
      transitionDuration: ["hover", "focus"],
      transitionDelay: ["hover", "focus"],
      animation: ["group-hover", "hover", "focus"],
      fontWeight: ["hover", "focus"],
      display: ["group-hover"],
      opacity: ["group-hover"],
      translate: ["active", "group-hover", "hover", "focus"],
      transform: ["group-hover", "hover", "focus"],
      width: ["group-hover", "hover"],
      height: ["group-hover", "hover"],
      padding: ["group-hover", "hover"],
      scale: ["group-hover", "hover"],
      backgroundColor: ["checked", "odd", "even"],
      borderColor: ["checked"],
      borderWidth: ["hover", "focus"],
    },
  },
  plugins: [],
};
