import * as stylex from '@stylexjs/stylex';

export const text = stylex.create({
    preventSelect: {
        '-webkit-user-select': 'none', /* Safari */
        '-ms-user-select': 'none', /* IE 10 and IE 11 */
        userSelect: 'none' /* Standard syntax */
    },
});

export const authed = stylex.create({
    desktop: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '25vw 25vw 1fr',
        gridTemplateRows: 'min-content 1fr',
        gridTemplateAreas: '"profile group-info expenses" "groups members expenses"',
        overflow: 'hidden'
    },
    mobile: {

    }
});

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