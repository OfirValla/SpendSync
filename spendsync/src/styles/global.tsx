import * as stylex from '@stylexjs/stylex';

export const global = stylex.create({
    preventSelect: {
        WebkitUserSelect: 'none', /* Safari */
        MsUserSelect: 'none', /* IE 10 and IE 11 */
        userSelect: 'none' /* Standard syntax */
    },

    scrollbar: {
        '::-webkit-scrollbar': {
            width: '20px'
        },

        '::-webkit-scrollbar-thumb': {
            backgroundColor: '#d6dee1',
            borderRadius: '20px',
            border: '6px solid transparent',
            backgroundClip: 'content-box',
            ':hover': {
                backgroundColor: '#a8bbbf'
            }
        },
    }
});

export const authed = stylex.create({
    desktop: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '1fr 20vw 20vw',
        gridTemplateAreas: '"expenses group-info profile"',
        overflow: 'hidden',
        position: 'absolute',
        width: '100vw'
    },
    mobile: {

    }
});