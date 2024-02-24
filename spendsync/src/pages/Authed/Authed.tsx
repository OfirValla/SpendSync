import { FC, useEffect } from 'react';

import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from '../../firebase';

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
        <div>{JSON.stringify(user)}</div>
    )
};

export default Authed;