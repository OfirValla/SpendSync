import { FC, useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from '../../firebase';

import Groups from './Groups';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Groups />,
        //loader: rootLoader,
        //children: [
        //    {
        //        path: "groups",
        //        element: <Team />,
        //        loader: teamLoader,
        //    },
        //],
    },
]);

const Authed: FC = () => {
    const [user, ,] = useAuthState(auth);

    // Router
    // 1. Groups
    // 2. Add New Group
    // 3. View Group
    // 4. Add User To Group
    // 5. New Activity In Group

    useEffect(() => {
        console.groupCollapsed("Updating user information")
        console.log("Saving user");
        console.log({
            name: user!.displayName,
            email: user!.email,
            photo: user!.photoURL,
        });
        console.groupEnd();
        set(
            ref(db, `users/${user!.uid}`),
            {
                name: user!.displayName,
                email: user!.email,
                photo: user!.photoURL,
            }
        );
    }, []);

    return (
        <RouterProvider router={router} />
    )
};

export default Authed;