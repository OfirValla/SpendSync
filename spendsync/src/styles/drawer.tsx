import * as stylex from '@stylexjs/stylex';

export const overlay = stylex.create({
    base: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        transition: 'opacity 225ms cubic- bezier(0.4, 0, 0.2, 1)'
    },
    open: {
        opacity: 1,
        zIndex: 0,
        visibility: 'visible'
    },
    close: {
        opacity: 0,
        zIndex: -1,
        visibility: 'hidden',
        transition: '225ms cubic - bezier(0.4, 0, 0.2, 1) 0ms'
    }
});

export const drawer = stylex.create({
    base: {
        top: 0,
        right: 'auto',
        left: 0,
        flex: '1 0 auto',
        height: '100%',
        display: 'flex',
        outline: '0',
        zIndex: 1200,
        position: 'fixed',
        overflowY: 'auto',
        flexDirection: 'column',

        backgroundColor: '#ffffff',
        width: '30vw',
        flexShrink: 0,

        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
    },
    animate: {
        visibility: 'visible',
        transform: 'none',
        //boxShadow: '"0 8px 10px -5px rgba(0, 0, 0, 0.2)", "0px 16px 24px 2px rgba(0, 0, 0, 0.14)", "0px 6px 30px 5px rgba(0, 0, 0, 0.12)"'
    },
    hidden: {
        visibility: 'hidden',
        width: '240px',
        transform: 'translateX(-240px)',
        flexShrink: 0,
        transition: '325ms cubic-bezier(0, 0, 0.2, 1) 0ms'
    }
});