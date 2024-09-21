/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "width": {
        "08em": "0.8em"
      },
      "height": {
        "08em": "0.8em"
      },
      "margin": {
        "m02em": "-0.2em"
      }
    },
  },
  plugins: [],
}

