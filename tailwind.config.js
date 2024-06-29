/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1.5rem',
        sm: '2.5rem',
        lg: '4rem',
        xl: '6rem',
        '2xl': '8rem',
      },
      center: true
    }
  },
  plugins: [require("daisyui")],
  presets: [require("keep-react/preset")],
  daisyui: {
    themes: false,
    darkTheme: "light"
  }

};
