import * as stylex from '@stylexjs/stylex';

// A constant can be used to avoid repeating the media query
const DARK = '@media (prefers-color-scheme: dark)';

export const colors = stylex.defineVars({
    primaryText: { default: 'black', [DARK]: 'white' },
    secondaryText: { default: '#333', [DARK]: '#ccc' },

    accent: { default: 'blue', [DARK]: 'lightblue' },

    mainBackground: { default: '#fefefe', [DARK]: '#2c2c2c' },
    secondaryBackground: { default: 'wheat', [DARK]: 'gray' },

    lineColor: { default: 'gray', [DARK]: 'lightgray' },

    mainBorder: { default: 'white', [DARK]: '#222222' },
    resizeHover: { default: 'wheat', [DARK]: '#414141' }
});

export const sizes = stylex.defineVars({
    borderWidth: '2px'
});