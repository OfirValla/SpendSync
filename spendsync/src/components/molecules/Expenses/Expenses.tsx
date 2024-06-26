import { CSSProperties, FC, useEffect, useState } from 'react';
import { Expense as ExpenseType, ExpenseDTO } from '../../../types/Expense';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { DataSnapshot, Query, endBefore, get, limitToLast, onChildAdded, onChildChanged, onChildRemoved, orderByKey, query, ref, startAfter } from 'firebase/database';
import stylex from '@stylexjs/stylex';

import { db } from '../../../firebase';
import Expense from '../../atoms/Expense';
import { isMobile } from 'react-device-detect';
import { colors } from '../../../styles/variables.stylex';
import { global } from '../../../styles/global.stylex';

// Fix bug where event onChildAdded is thrown when navigating between multiple groups
// Propably due to state not resetting or the need to call the unsubscribe method on group switched

interface ExpensesProps {
    groupId: string;
    onNewExpense: (expense: ExpenseType) => void
}

const Expenses: FC<ExpensesProps> = ({ groupId, onNewExpense }) => {
    const [expenses, setExpenses] = useState<ExpenseType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [firstItem, setFirstItem] = useState<string | null | undefined>(null);

    const fetchData = async () => {
        console.groupCollapsed("Fetching Expenses");

        if (isLoading) {
            console.log("Already loading");
            console.groupEnd();
            return;
        }
        setIsLoading(true);

        let result: DataSnapshot;
        if (expenses.length !== 0)
            result = await get(query(ref(db, `groups/${groupId}/activity`), orderByKey(), endBefore(expenses!.at(-1)!.id), limitToLast(10)));
        else {
            result = await get(query(ref(db, `groups/${groupId}/activity`), orderByKey(), limitToLast(10)));
            setFirstItem(Object.keys(result.val() || {}).at(-1));
        }

        const data: { [key: string]: ExpenseDTO; } = result.val();
        if (!data) {
            console.log("No more expenses");
            setHasNextPage(false);
            console.groupEnd();
            return;
        }

        const newExpenses: ExpenseType[] = (Object.keys(data) || []).map(id => { return { id, ...data[id] }; }).reverse();
        setExpenses(prev => [...prev, ...newExpenses]);

        console.log(`Found ${newExpenses.length} new expenses`);
        console.groupEnd();

        setIsLoading(false);
    };

    const [sentryRef] = useInfiniteScroll({
        loading: isLoading,
        hasNextPage,
        onLoadMore: fetchData,
        // `rootMargin` is passed to `IntersectionObserver`.
        // We can use it to trigger 'onLoadMore' when the sentry comes near to become
        // visible, instead of becoming fully visible on the screen.
        rootMargin: '0px 0px 400px 0px',
    });

    const onChildAddedCallback = (data: DataSnapshot) => {
        console.groupCollapsed("Expense Added");
        console.log(`Id: ${data.key}`);
        const result: ExpenseDTO = data.val();
        const newExpense: ExpenseType = { id: data.key, ...result };
        onNewExpense(newExpense);
        console.log(`Title: ${newExpense.title}`);
        console.groupEnd();

        setExpenses(prev => [newExpense, ...prev]);
    }
    
    useEffect(() => {
        let expenseAddedQuery: Query | null = null;
        if ((firstItem === null || firstItem === undefined) && !hasNextPage)
            expenseAddedQuery = query(ref(db, `groups/${groupId}/activity`));

        if (firstItem !== null && firstItem !== undefined)
            expenseAddedQuery = query(ref(db, `groups/${groupId}/activity`), orderByKey(), startAfter(firstItem));

        if (!expenseAddedQuery) return;

        return onChildAdded(
            expenseAddedQuery,
            onChildAddedCallback
        );
    }, [firstItem, hasNextPage, groupId]);

    useEffect(() => {
        setExpenses([]);
        setIsLoading(false);
        setHasNextPage(true);
        setFirstItem(null);

        const onChildRemovedUnsubscribe = onChildRemoved(ref(db, `groups/${groupId}/activity`), (data: DataSnapshot) => {
            console.groupCollapsed("Removing Expense");
            console.log(`Id: ${data.key}`);
            console.log(`Title: ${data.val().title}`);
            console.groupEnd();
            setExpenses(prev => prev.filter(expense => expense.id !== data.key));
        });

        const onChildChangedUnsubscribe = onChildChanged(ref(db, `groups/${groupId}/activity`), (data: DataSnapshot) => {
            console.groupCollapsed("Expense Changed");
            console.log(`Id: ${data.key}`);
            console.log(`New Data: ${JSON.stringify(data.val())}`);
            console.groupEnd();

            setExpenses(prev => {
                const itemIdx = prev.findIndex(item => item.id === data.key);
                if (itemIdx === -1) return prev;

                return [
                    ...prev.slice(0, itemIdx),
                    { id: data.key, ...data.val() },
                    ...prev.slice(itemIdx + 1)
                ];
            });
        });

        return () => {
            onChildRemovedUnsubscribe();
            onChildChangedUnsubscribe();
        };
    }, [groupId]);

    const styles: CSSProperties = isMobile ? {} : { overflowY: 'auto', height: '100vh', direction: 'rtl' }

    return (
        <div className="expenses" style={{ gridArea: 'expenses', ...styles, backgroundColor: colors.mainBackground, color: colors.primaryText }} {...stylex.props(global.scrollbar)}>
            <div style={{ display: 'grid', gridAutoFlow: 'row', gridGap: '10px', justifyContent: 'center', padding: 20 }}>
                {
                    expenses.map(expense => {
                        return <Expense key={expense.id} {...expense} />;
                    })
                }

                <div ref={sentryRef}></div>
            </div>
        </div>
    );
};

export default Expenses;