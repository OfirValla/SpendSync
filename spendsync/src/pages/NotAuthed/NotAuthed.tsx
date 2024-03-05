import { FC } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import NavigateToIndex from '../../components/atoms/NavigateToIndex';
import ResetPassword from './ResetPassword';
import Landing from './Landing';
import SignIn from './SignIn';
import SignUp from './SignUp';

const router = createBrowserRouter([
    {
        index: true,
        element: <Landing />
    },
    {
        path: 'sign-in',
        element: <SignIn />
    },
    {
        path: 'sign-up',
        element: <SignUp />
    },
    {
        path: 'reset-password',
        element: <ResetPassword />
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