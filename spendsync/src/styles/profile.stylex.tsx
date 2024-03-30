import stylex from '@stylexjs/stylex';
import { colors, sizes } from './variables.stylex';

export const profileInfo = stylex.create({
    base: {
        borderBottomWidth: sizes.borderWidth,
        borderColor: colors.mainBorder,
        borderStyle: 'solid',
        height: '160px'
    }
});

