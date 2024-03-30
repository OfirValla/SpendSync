import * as stylex from '@stylexjs/stylex';
import { colors } from './variables.stylex';

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

export const resize = stylex.create({
    container: {
        position: 'relative',
        ':not(#__unused__) > :not(:last-child)': {
            paddingLeft: '8px' 
        }
    },

    desktop: {
        height: '100vh',
        width: 1,
        background: colors.mainBorder,
        display: 'block',
        position: 'absolute',
        left: 0,
        cursor: 'ew-resize',
        zIndex: 10,
        transition: 'width .1s ease-in-out',
        ':hover': {
            background: colors.resizeHover,
            width: 4
        }
    },
    mobile: {

    }
});