/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        colors: {
            // Core Brand Colors
            primary: {
            DEFAULT: '#7C3EFF', // Main Purple
            hover: '#6A32E6',   // Darker Purple for hover states
            light: '#F4F0FF',   // Very light purple for backgrounds
            },
            // Status Colors
            success: {
            DEFAULT: '#10B981', // Emerald 500
            light: '#ECFDF5',   // Emerald 50
            },
            warning: {
            DEFAULT: '#FFCA28', // Dashboard Yellow
            light: '#FEFCE8',   // Yellow 50
            },
            error: {
            DEFAULT: '#EF4444', // Red 500
            },
            // UI Colors
            background: '#F8F9FA', // Main dashboard background
        },
        fontFamily: {
            lexend: ['Lexend', 'sans-serif'],
        },
        animation: {
            'fade-in': 'fadeIn 0.4s ease-out forwards',
        },
        keyframes: {
            fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
            }
        }
        },
    },
    plugins: [],
}