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
    }
});