import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { push, ref } from "firebase/database";

import { auth, db } from '../../../firebase';
import { useParams } from 'react-router-dom';

type Icons = 'house' | 'groceries' | 'dining-out' | 'household-supplies' | 'transportation' | 'subscriptions' |
    'events' | 'utility-bills' | 'health-wellness' | 'cleaning-services' | 'home-repairs' | 'fuurniture' |
    'pets' | 'vacations' | 'misc' | 'emergency' | 'gifts' | 'electronics' | 'education';

type Activity = {
    title: string;
    icon: Icons;
    amount: number;
    createdAt: number;
    currency: string;
    paidBy: string;
    split: { [key: string]: number; };
};

const NewActivity: FC = () => {
    const [user, ,] = useAuthState(auth);
    const { groupId } = useParams();

    const addNewActivity = async () => {
        const newActivity: Activity = {
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