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
    }
});

export const styles = stylex.create({
    image: {
        borderRadius: '50%',
        height: '50px',
        width: '50px',
        backgroundColor: '#cecece',
        border: '2px white solid'
    }
});