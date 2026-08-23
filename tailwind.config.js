/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        colors: {
            customBlue: '#56c2cf',
            customGray: '#e9e9eb',
            customBlack: '#34343c',
            customDarkGray: '#818183',
            customDarkerGray: '#8d949c',
        },
        fontFamily: {
            montserrat: ['Montserrat', 'sans-serif'],
        },
        },
    },
    plugins: [],
}