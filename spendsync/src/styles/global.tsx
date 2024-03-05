import * as stylex from '@stylexjs/stylex';

export const text = stylex.create({
    preventSelect: {
        '-webkit-user-select': 'none', /* Safari */
        '-ms-user-select': 'none', /* IE 10 and IE 11 */
        userSelect: 'none' /* Standard syntax */
    },
});