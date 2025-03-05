import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                kalam: ['Kalam', 'cursive'],
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'layout-gray': '#0F0F0F',
                'active-nav': '#454747',
            },
            backgroundImage: {
                'custom-gradient':
                    'radial-gradient(circle at 90% 84%, hsla(197, 57%, 0%, 1) 17%, transparent 81%), radial-gradient(circle at 63% 76%, hsla(274, 90%, 2%, 1) 4%, transparent 63%), radial-gradient(circle at 64% 25%, hsla(271, 68%, 19%, 1) 10%, transparent 66%), radial-gradient(circle at 82% 4%, hsla(269, 82%, 4%, 1) 12%, transparent 73%), radial-gradient(circle at 75% 55%, hsla(222, 85%, 21%, 1) 13%, transparent 84%), radial-gradient(circle at 50% 4%, hsla(218, 79%, 9%, 1) 17%, transparent 60%), radial-gradient(circle at 13% 9%, hsla(276, 74%, 4%, 1) 10%, transparent 57%)',
            },
        },
    },

    plugins: [forms],
};
