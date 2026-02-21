export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [
            import ('tailwind-scrollbar-hide')
        ] // enables toggling via a CSS class
        ,
};

// export default = {

//     plugins: [],
// };