import { FC, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { push, ref, runTransaction } from "firebase/database";

import { auth, db } from '../../../firebase';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';

import { ExpenseDTO } from '../../../types/Expense';
import { Owed } from '../../../types/Group';

const NewExpense: FC = () => {
    useDocumentTitle('SpendSync - New Expense');

    const titleRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);

    const [user, ,] = useAuthState(auth);
    const { groupId } = useParams();

    const addNewExpense = async () => {
        const newExpense: ExpenseDTO = {
            amount: parseFloat(amountRef.current?.value ?? '100'),
            icon: 'furniture',
            createdAt: new Date().getTime(),
            currency: 'USD',
            paidBy: user!.uid,
            split: {
                [user!.uid]: -1000
            },
            title: titleRef.current?.value ?? 'Test'
        }

        await push(
            ref(db, `groups/${groupId}/activity`),
            newExpense
        );

        await runTransaction(ref(db, `groups/${groupId}/owed`), (currentData: Owed) => {
            const output: Owed = currentData;

            const currentUsers = Object.keys(currentData);
            for (const [userId, additionalOwed] of Object.entries(newExpense.split)) {
                // The current user from the split does not exists in the owed section of the group yet
                if (!currentUsers.includes(userId)) {
                    output[userId] = { [newExpense.currency]: additionalOwed };
                    continue;
                }

                // The current user from the split exists in the owed section of the group

                // Check if the currency exists for the user
                const currentCurrencies = Object.keys(currentData[userId]);

                // The currency does not exist on the existing user -> Add it
                if (!currentCurrencies.includes(newExpense.currency)) {
                    output[userId][newExpense.currency] = additionalOwed;
                    continue;
                }

                // Add or Substract the value for the currency 
                output[userId][newExpense.currency]! += additionalOwed;
            }

            return output;
        })
    }

    return (
        <div>
            Title: <input ref={titleRef} type="text" />
            <br />
            Amount: <input ref={amountRef} type="number" />
            <br />
            <button onClick={addNewExpense}>New Expense</button>
        </div>
    )
};

export default NewExpense;