import { FC, useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ref, update, set, remove, onValue } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from '../../firebase';

import Groups from './Groups';
import NewGroup from './NewGroup';
import ViewGroup from './ViewGroup';
import NewActivity from './NewActivity';

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                element: <Groups />
            },
            {
                path: 'groups/:groupId',
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
            }
        ],
    },
    {
        path: "new-group",
        element: <NewGroup />
    }
]);

const Authed: FC = () => {
    const [user, ,] = useAuthState(auth);

    // Router
    // 1. Groups
    // 2. Add New Group
    // 3. View Group
    // 4. Add User To Group
    // 5. New Activity In Group

    const handleNewInvites = () => {
        return onValue(ref(db, `invites/${user!.email!.replace('.', ',')}`),
            snapshot => {
                const data = snapshot.val();
                if (!data) return;

                const invites = Object.keys(data);
                for (const groupId of invites) {
                    console.groupCollapsed('Adding user to group');
                    console.log(`Group id: ${groupId}`);

                    // Get the invite and write it to the users groups
                    console.log('Adding group to users groups');
                    set(ref(db, `users/${user!.uid}/groups/${groupId}`), true);

                    // Remove the invite from the list of invites
                    console.log('Removing invite for group');
                    remove(ref(db, `invites/${user!.email!.replace('.', ',')}/${groupId}`));

                    console.groupEnd();
                }
            },
            error => console.error(error)
        );
    }

    const updateUserInformation = () => {
        console.groupCollapsed("Updating user information");
        console.log("Saving user");
        console.log({
            name: user!.displayName,
            email: user!.email,
            photo: user!.photoURL,
        });
        console.groupEnd();
        update(
            ref(db, `users/${user!.uid}`),
            {
                name: user!.displayName,
                email: user!.email,
                photo: user!.photoURL,
            }
        );
    }

    useEffect(() => {
        const unsubscribeNewInvites = handleNewInvites();        
        updateUserInformation();
        
        return () => {
            unsubscribeNewInvites();
        }
    }, []);

    return (
        <RouterProvider router={router} />
    )
};

export default Authed;