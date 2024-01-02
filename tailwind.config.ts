import { type Config } from 'tailwindcss';
// import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontSize: {
            10: '0.625rem',
            12: '0.75rem',
            14: '0.875rem',
            16: '1rem',
            18: '1.125rem',
            19: '1.19rem',
            20: '1.25rem',
            24: '1.5rem',
            32: '2rem',
            36: '2.25rem',
        },
        fontWeight: {
            100: '100',
            200: '200',
            300: '300',
            400: '400',
            500: '500',
            600: '600',
            700: '700',
            800: '800',
            900: '900',
        },
        borderRadius: {
            50: '50%',
            20: '1.25rem',
            15: '0.94rem',
            10: '0.625rem',
            5: '0.31rem',
        },
        extend: {
            fontFamily: {
                // montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
            },
            colors: {},
            backgroundColor: {},
        },
    },
    plugins: [],
} satisfies Config;
