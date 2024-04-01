import stylex from '@stylexjs/stylex';
import { colors, sizes } from './variables.stylex';

export const profileInfo = stylex.create({
    base: {
        borderBottom: `${sizes.borderWidth} solid ${colors.mainBorder}`,
        height: '160px'
    }
});

