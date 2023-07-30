/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        'body':['Roboto Mono']
      },
      colors:{
        'textcolor':'#ff7e00',
        'textcolor2':'#fcac01',



      },
      screens: {
        xss:"300px",
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        md1:"1100px",
        md2:"1090px",
        lg: "1200px",
        lg0:"1250px",
        lg1:"1300px",
        lg2:"1400px",
        lg3:"1500px",
      },

    },
  },
  plugins: [],
}

