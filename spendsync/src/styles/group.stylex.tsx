import * as stylex from '@stylexjs/stylex';

export const group = stylex.create({
    container: {
        margin: 5,
        borderRadius: 5,
        padding: 5,
        ':hover': {
            cursor: 'pointer',
            backgroundColor: '#454545'
        }
    },

    active: {
        backgroundColor: '#454545'
    },
    inActive: {},

    hasUpdate: {
        fontWeight: 'bold'
    },
    noUpdate: {}
});