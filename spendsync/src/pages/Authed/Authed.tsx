import { FC, useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ref, update, set, remove, onValue } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from '../../firebase';

import Profile from './Profile';
import NewGroup from './NewGroup';
import ViewGroup from './ViewGroup';
import NewActivity from './NewActivity';
import NavigateToIndex from '../../components/atoms/NavigateToIndex';

const router = createBrowserRouter([
    
    {
        index: true,
        element: <Profile />
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
]);

const Authed: FC = () => {
    const [user, ,] = useAuthState(auth);
    
    // Router
    // 1. Profile / Groups
    // 2. Create New Group
    // 3. View Group
    // 4. Add User To Group
    // 5. Create New Activity In Group
    // 6. Edit an Activity
    // 7. Edit a Group ( Change manager, Change name, Remove members  )

    const handleNewInvites = () => {
        return onValue(ref(db, `invites/${user!.email!.replaceAll('.', ',')}`),
            snapshot => {
                const data = snapshot.val();
                if (!data) return;

                const invites = Object.keys(data);
                for (const groupId of invites) {
                    console.groupCollapsed('Adding user to group');
                    console.log(`Group id: ${groupId}`);

                    // Get the invite and write it to the users groups
                    console.log('Adding group to users groups');
                    // Remove the invite from the list of invites
                    console.log('Removing invite for group');
                    console.groupEnd();
                    Promise.all([
                        set(ref(db, `users/${user!.uid}/groups/${groupId}`), true),
                        remove(ref(db, `invites/${user!.email!.replace('.', ',')}/${groupId}`))
                    ]);
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

        const updates: { [key: string]: object | string } = {};
        updates[`users/${user!.uid}`] = {
            name: user!.displayName,
            email: user!.email,
            photo: user!.photoURL,
        };
        updates[`availableUsers/${user!.email!.replaceAll('.', ',')}`] = user!.uid;
        update(ref(db), updates);
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