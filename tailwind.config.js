const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "primary": colors.indigo,
                "secondary": colors.cyan,
                "dark-gray": {
                    "50": "#E8E8E8",
                    "100": "#D1D1D1",
                    "200": "#A3A3A3",
                    "300": "#757575",
                    "400": "#474747",
                    "500": "#1B1B1B",
                    "600": "#141414",
                    "700": "#0F0F0F",
                    "800": "#0A0A0A",
                    "900": "#050505"
                }
            },
        },
    },
    plugins: [],
}
