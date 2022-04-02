module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screen: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px"
      },
    },
    fontFamily : {
      noto: ['Noto Sans', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'] 
    },
    extend: {
      colors: {
        "blue": "#2E86DE",
        "lightBlue": "#3B97D3",
        "grey": "#6C6C6C",
        "lightGrey": "#BFBFBF",
      },
      backgroundImage: {
        'hero-image' : "url('../assets/hero.svg')",
      },
    },
  },
  plugins: [],
}
