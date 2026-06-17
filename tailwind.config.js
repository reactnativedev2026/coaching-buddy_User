/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#000",
                secondary: "#fff",
                accent1: "#0d9488",
                accent2: "#EB001B",
                accent3: "#22C55E",
            },
            fontFamily: {
                pLight: ["Poppins-Light", "sans-serif"],
                pExtraLight: ["Poppins-ExtraLight", "sans-serif"],
                pRegular: ["Poppins-Regular", "sans-serif"],
                pBold: ["Poppins-Bold", "sans-serif"],
                pSemiBold: ["Poppins-SemiBold", "sans-serif"],
                pExtraBold: ["Poppins-ExtraBold", "sans-serif"],
            },
        },
    },
    plugins: [],
};
