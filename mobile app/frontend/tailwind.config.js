/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                rice: {
                    base: '#FAF9F6', // Off-white
                    paper: '#FDFBF7', // Lighter cream
                    golden: '#E4D00A', // Golden yellow
                    husk: '#C19A6B', // Light brown
                },
                agri: {
                    green: '#4F7942', // Leaf green
                    'green-dark': '#3A5A30', // Darker green
                    brown: '#4B3621', // Dark brown
                }
            }
        },
    },
    plugins: [],
}
