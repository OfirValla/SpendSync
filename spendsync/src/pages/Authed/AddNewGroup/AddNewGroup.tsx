import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

import { auth, db } from '../../../firebase';

const AddNewGroup: FC = () => {
    const [user, ,] = useAuthState(auth);

    const addNewGroup = async () => {
        const groupId = uuidv4();
        await Promise.all([
            set(
                ref(db, `groups/${groupId}`),
                {
                    members: {
                        [user!.uid]: true
                    },
                    name: `Test Group - ${groupId}`,
                    owed: {
                        [user!.uid]: 0
                    }
                }
            ),

            update(
                ref(db, `users/${user!.uid}/groups`),
                {
                    [groupId]: true
                }
            )
        ]);
    }

    return (
        <button onClick={addNewGroup}>New Group</button>
    )
};

export default AddNewGroup;