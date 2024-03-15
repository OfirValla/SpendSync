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
        gridTemplateAreas: '"profile group-info activities" "groups members activities"'
    },
    mobile: {

    }
});