import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { push, ref, update } from "firebase/database";

import { auth, db } from '../../../firebase';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { Group } from '../../../types/Group';

const NewGroup: FC = () => {
    useDocumentTitle('SpendSync - New Group');

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
            },
            activity: {}
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