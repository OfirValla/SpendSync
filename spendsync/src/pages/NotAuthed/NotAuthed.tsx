import { FC } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import NavigateToIndex from '../../components/atoms/NavigateToIndex';
import SignIn from './SignIn';
import SignUp from './SignUp';

const router = createBrowserRouter([
    {
        index: true,
        element: <div>INDEX</div>
    },
    {
        path: 'sign-in',
        children: [
            {
                index: true,
                element: <SignIn />
            }
        ]
    },
    {
        path: 'sign-up',
        children: [
            {
                index: true,
                element: <SignUp />
            }
        ]
    },

    {
        // Fallback route
        path: "*",
        element: <NavigateToIndex />
    }
]);

const NotAuthed: FC = () => {
    return (
        <RouterProvider router={router} />
    )
};

export default NotAuthed;