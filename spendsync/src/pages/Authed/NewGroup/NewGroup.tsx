import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { push, ref, update } from "firebase/database";

import { auth, db } from '../../../firebase';

const NewGroup: FC = () => {
    const [user, ,] = useAuthState(auth);

    const addNewGroup = async () => {
        const newRef = await push(
            ref(db, `groups`),
            {
                members: {
                    [user!.uid]: true
                },
                name: `Test Group`,
                owed: {
                    [user!.uid]: 0
                }
            }
        );
        
        await update(
            ref(db, `users/${user!.uid}/groups`),
            {
                [newRef.key!]: true
            }
        );
    }

    return (
        <button onClick={addNewGroup}>New Group</button>
    )
};

export default NewGroup;