import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';

import { notAuthedRouter } from '../../utils/Routes';

const NotAuthed: FC = () => {
    return (
        <RouterProvider router={notAuthedRouter} />
    )
};

export default NotAuthed;