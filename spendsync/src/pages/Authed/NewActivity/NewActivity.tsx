import { FC, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { push, ref } from "firebase/database";

import { auth, db } from '../../../firebase';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';

import { ExpenseDTO } from '../../../types/Expense';

const NewActivity: FC = () => {
    useDocumentTitle('SpendSync - New Activity');

    const titleRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);

    const [user, ,] = useAuthState(auth);
    const { groupId } = useParams();

    const addNewActivity = async () => {
        const newActivity: ExpenseDTO = {
            amount: parseFloat(amountRef.current?.value ?? '100'),
            icon: 'furniture',
            createdAt: new Date().getTime(),
            currency: 'USD',
            paidBy: user!.uid,
            split: {
                [user!.uid]: 100
            },
            title: titleRef.current?.value ?? 'Test'
        }

        await push(
            ref(db, `groups/${groupId}/activity`),
            newActivity
        );
    }

    return (
        <div>
            Title: <input ref={titleRef} type="text" />
            <br />
            Amount: <input ref={amountRef} type="number" />
            <br />
            <button onClick={addNewActivity}>New Activity</button>
        </div>
    )
};

export default NewActivity;