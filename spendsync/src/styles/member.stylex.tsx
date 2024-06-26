import * as stylex from '@stylexjs/stylex';

export const members = stylex.create({
    container: {
        ':not(#__unused__) > img:hover': {
            zIndex: 1,
        },
        ':not(#__unused__) > img:not(:first-of-type)': {
            marginLeft: '-10px',
        },
        '::-webkit-scrollbar': {
            display: 'none'
        }
    },
    compactMode: {
        display: 'grid',
        gridAutoFlow: 'column',
        justifyContent: 'end',
        overflowX: 'auto'
    },
    desktopMode: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: 'calc(100vh - 160px)'
    }
});

export const styles = stylex.create({
    image: {
        borderRadius: '50%',
        height: '50px',
        width: '50px',
        backgroundColor: '#cecece',
        border: '2px white solid'
    },
    member: {
        display: 'grid',
        gridTemplateAreas: '"name member-image" "email member-image"',
        justifyContent: 'end',
        justifyItems: 'end',
        gridColumnGap: '10px',
        paddingBottom: '20px',

        margin: 5,
        borderRadius: 5,
        padding: 5,

        ':hover': {
            backgroundColor: '#454545'
        }
    }
});