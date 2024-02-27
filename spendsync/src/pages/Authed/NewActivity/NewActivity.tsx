import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { push, ref } from "firebase/database";

import { auth, db } from '../../../firebase';
import { useParams } from 'react-router-dom';

const NewActivity: FC = () => {
    const [user, ,] = useAuthState(auth);
    const { groupId } = useParams();

    const addNewActivity = async () => {
        await push(
            ref(db, `groups/${groupId}/activity`),
            {
                amount: 100,
                createdAt: new Date().getTime(),
                currency: 'ils',
                paidBy: user!.uid,
                split: {
                    [user!.uid]: 100
                },
                title: 'Test'
            }
        );
    }

    return (
        <button onClick={addNewActivity}>New Activity</button>
    )
};

export default NewActivity;