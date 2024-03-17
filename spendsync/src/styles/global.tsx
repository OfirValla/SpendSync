import * as stylex from '@stylexjs/stylex';

export const text = stylex.create({
    preventSelect: {
        WebkitUserSelect: 'none', /* Safari */
        MsUserSelect: 'none', /* IE 10 and IE 11 */
        userSelect: 'none' /* Standard syntax */
    },
});

export const authed = stylex.create({
    desktop: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '20vw 20vw 1fr',
        gridTemplateAreas: '"profile group-info expenses"',
        overflow: 'hidden'
    },
    mobile: {

    }
});

//::-webkit-scrollbar {
//    width: 20px;
//}

//::-webkit-scrollbar-thumb {
//    background-color: #d6dee1;
//    border-radius: 20px;
//    border: 6px solid transparent;
//    background-clip: content-box;
//}

//    ::-webkit-scrollbar-thumb:hover {
//        background-color: #a8bbbf;
//    }

export const scrollbar = stylex.create({
    root: {
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
        }
    }
})