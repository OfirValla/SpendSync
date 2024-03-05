import * as stylex from '@stylexjs/stylex';

const spin = stylex.keyframes({
    '100%': { rotate: '360deg' },
});

const dash = stylex.keyframes({
    '0%': {
        strokeDasharray: '1, 150',
        strokeDashoffset: '0'
    },
    '50%': {
        strokeDasharray: '90, 150',
        strokeDashoffset: '-35'
    },
    '100%': {
        strokeDasharray: '90, 150',
        strokeDashoffset: '-124'
    }
});

export const styles = stylex.create({
    container: {
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '0',
        right: '0'
    },
    svg: {
        width: '20vw',
        height: '20vw',
        animationName: spin,
        animationDuration: '1s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite'
    },
    circle: {
        fill: 'none',
        stroke: 'url(#linear)',
        strokeWidth: '3px',
        strokeLinecap: 'round',
        animationName: dash,
        animationDuration: '2.5s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite'
    }
});