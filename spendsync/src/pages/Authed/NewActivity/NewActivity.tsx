﻿import { FC, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { push, ref } from "firebase/database";

import { auth, db } from '../../../firebase';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';

import { ActivityDTO } from '../../../types/Activity';

const NewActivity: FC = () => {
    useDocumentTitle('SpendSync - New Activity');

    const titleRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);


    const [user, ,] = useAuthState(auth);
    const { groupId } = useParams();

    const addNewActivity = async () => {
        const newActivity: ActivityDTO = {
            amount: parseFloat(amountRef.current?.value ?? '100'),
            icon: 'furniture',
            createdAt: new Date().getTime(),
            currency: '₪',
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
        <>
            Title: <input ref={titleRef} type="text" />
            <br />
            Amount: <input ref={amountRef} type="number" />
            <br />
            <button onClick={addNewActivity}>New Activity</button>
        </>
    )
};

export default NewActivity;