import { isMobile } from 'react-device-detect';
import { createBrowserRouter } from 'react-router-dom';

import Profile from '../pages/Authed/Profile';
import ViewGroup from '../pages/Authed/ViewGroup';
import NewActivity from '../pages/Authed/NewActivity';
import NewGroup from '../pages/Authed/NewGroup';
import NavigateToIndex from '../components/atoms/NavigateToIndex';
import Landing from '../pages/NotAuthed/Landing';
import SignIn from '../pages/NotAuthed/SignIn';
import SignUp from '../pages/NotAuthed/SignUp';
import ResetPassword from '../pages/NotAuthed/ResetPassword';

export const authedRouter = createBrowserRouter(isMobile
    ? [
        {
            index: true,
            element: <Profile />
        },
        {
            path: 'view/:groupId',
            children: [
                {
                    index: true,
                    element: <ViewGroup />
                },
                {
                    path: 'new-user',
                    element: <div>New User</div>
                },
                {
                    path: 'new-activity',
                    element: <NewActivity />
                }
            ]
        },
        {
            path: "new-group",
            element: <NewGroup />
        },

        {
            // Fallback route
            path: "*",
            element: <NavigateToIndex />
        }
    ]
    : [
        {
            path: '/',
            element: <Profile />,
            children: [
                {
                    path: 'view/:groupId',
                    element: <ViewGroup />,
                    children: [
                        {
                            path: 'new-user',
                            element: <div>New User</div>
                        },
                        {
                            path: 'new-activity',
                            element: <NewActivity />
                        }
                    ]
                },
            ]
        },

        {
            path: "new-group",
            element: <NewGroup />
        },

        {
            // Fallback route
            path: "*",
            element: <NavigateToIndex />
        }
    ]
);

export const notAuthedRouter = createBrowserRouter([
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