import { FC, useEffect } from 'react';
import stylex from '@stylexjs/stylex';
import { isMobile } from 'react-device-detect';

import { RouterProvider } from 'react-router-dom';
import { ref, update, set, remove, onValue } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from '../../firebase';
import { authedRouter } from '../../utils/Routes';
import { authed, global } from '../../styles/global.stylex';

const Authed: FC = () => {
    const [user, ,] = useAuthState(auth);
    
    // Router
    // 1. Profile / Groups
    // 2. Create New Group
    // 3. View Group
    // 4. Add User To Group
    // 5. Create New Expense In Group
    // 6. Edit an Expense
    // 7. Edit a Group ( Change manager, Change name, Remove members  )

    const handleNewInvites = () => {
        return onValue(ref(db, `invites/${user!.uid}`),
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
                        remove(ref(db, `invites/${user!.uid}/${groupId}`))
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
        
        Promise.all([
            update(ref(db, `users/${user!.uid}`), {
                name: user!.displayName,
                email: user!.email,
                photo: user!.photoURL,
            }),
            set(ref(db, `availableUsers/${user!.email!.replaceAll('.', ',')}`), user!.uid)
        ]);
    }

    useEffect(() => {
        updateUserInformation();        
        return handleNewInvites();
    }, []);

    return (
        <div {...stylex.props(isMobile ? authed.mobile : authed.desktop, global.scrollbar)}>
            <RouterProvider router={authedRouter} />
        </div>
    )
};

export default Authed;