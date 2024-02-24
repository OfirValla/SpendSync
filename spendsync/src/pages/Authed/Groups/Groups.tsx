import { FC, useEffect } from 'react';
import { ref, set, remove, onValue } from "firebase/database";


import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../../../firebase';

const Groups: FC = () => {
    const [user, ,] = useAuthState(auth);

    const handleNewInvites = () => {
        console.log("Listening to invites");

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

    const handleUserGroups = () => {
        return onValue(ref(db, `users/${user!.uid}/groups`),
            snapshot => console.log(snapshot.val()),
            error => console.error(error)
        );
    }

    useEffect(() => {
        const unsubscribeNewInvites = handleNewInvites();        
        const unsubscribeUserGroups = handleUserGroups();
        
        return () => {
            unsubscribeNewInvites();
            unsubscribeUserGroups();
        }
    }, []);

    return (
        <>
            <div>Groups</div>
            <>{JSON.stringify(user)}</>
        </>
    )
};

export default Groups;