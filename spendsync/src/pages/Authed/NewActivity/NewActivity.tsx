import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { push, ref } from "firebase/database";

import { auth, db } from '../../../firebase';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';

import { ActivityDTO } from '../../../types/Activity';

const NewActivity: FC = () => {
    useDocumentTitle('SpendSync - New Activity');

    const [user, ,] = useAuthState(auth);
    const { groupId } = useParams();

    const addNewActivity = async () => {
        const newActivity: ActivityDTO = {
            amount: 100,
            icon: 'house',
            createdAt: new Date().getTime(),
            currency: 'ils',
            paidBy: user!.uid,
            split: {
                [user!.uid]: 100
            },
            title: 'Test'
        }

        await push(
            ref(db, `groups/${groupId}/activity`),
            newActivity
        );
    }

    return (
        <button onClick={addNewActivity}>New Activity</button>
    )
};

export default NewActivity;