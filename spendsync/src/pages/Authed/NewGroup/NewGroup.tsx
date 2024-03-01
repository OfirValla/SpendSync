import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { push, ref, update } from "firebase/database";

import { auth, db } from '../../../firebase';

type Group = {
    managedBy: string;
    members: { [key: string]: boolean; };
    name: string;
    owed: { [key: string]: number; };
};

const NewGroup: FC = () => {
    const [user, ,] = useAuthState(auth);

    const addNewGroup = async () => {
        const newGroup: Group = {
            managedBy: user!.uid,
            members: {
                [user!.uid]: true
            },
            name: `Test Group`,
            owed: {
                [user!.uid]: 0
            }
        }
        const newRef = await push(ref(db, `groups`), newGroup);
        
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