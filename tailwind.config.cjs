module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@yext/search-ui-react/**/*.{js,ts,jsx,tsx}", // New
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      "Dark-green": "#314448",
      "green": "#314448",
      "running-color": "#3F5367",
      "gray-dark": "#111111",
      "gray-light": "#ececec",
      "button-light": "#F5F5F7",
      "border-light": "#B2B3B5",
      "seachbutton-bg": "#72BA45",
      "nav-link": "#747474",
      "nav-li-border": "#d7d7d7",
      "right-menu-b": "#ebebeb",
      "search-text": "#9c9c9c",
      "location-bg": "#f7f7f7",
      "home-icon-bg": "#E5E5E1",
      "address-bg": "#FBFBFD",
      "hours-bg": "#eeeeee",
      "light-grey": "#F8F8F8",
      "faq-border": "#cfcfcf",
      "text-light": "#3D3935",
      "cookies-link": "#d61a0c",
      "card-bg": "#f4f4f4",
      "border-bx": "#d8d8d8",

    },

    fontFamily: {
      "main-font": ["Lato"],
      // "font-style": [italic],
      "font-weight": [400],
      // "font-display": [swap],
    },

    extend: {
      backgroundImage: {
        shapet: "url('images/shape-t.svg')",
        shapeb: "url('images/shape-b.svg')",
        dots: "url('images/dots.svg')",
        plus_icon: "url('images/plus-sym.svg')",
        minus_icon: "url('images/minus-sym.svg')",
        arrow_right: "url('images/arrow-right.svg')",

        


      },
    },
  },
  plugins: [],
};
