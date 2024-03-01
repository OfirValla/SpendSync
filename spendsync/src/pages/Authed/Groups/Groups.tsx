import { FC, useEffect, useState } from 'react';
import { ref, get, onChildAdded, query, onChildRemoved, DataSnapshot, orderByKey, endBefore, limitToLast, Query, startAfter, remove } from "firebase/database";
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from '../../../firebase';
import Group from '../../../components/atoms/Group';

const Groups: FC = () => {
    const [user, ,] = useAuthState(auth);
    const [groups, setGroups] = useState<string[]>([]);    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [firstItem, setFirstItem] = useState<string | null | undefined>(null);
    
    const fetchData = async () => {
        console.groupCollapsed("Fetching Groups");

        if (isLoading) {
            console.log("Already loading");
            console.groupEnd();
            return;
        }
        setIsLoading(true);

        let result: DataSnapshot;
        if (groups.length !== 0)
            result = await get(query(ref(db, `users/${user!.uid}/groups`), orderByKey(), endBefore(groups!.at(-1)!.id), limitToLast(10)));
        else {
            result = await get(query(ref(db, `users/${user!.uid}/groups`), orderByKey(), limitToLast(10)));
            setFirstItem(Object.keys(result.val() || {}).at(-1));
        }

        const data: { [key: string]: boolean; } = result.val();
        if (!data) {
            console.log("No more groups");
            setHasNextPage(false);
            console.groupEnd();
            return;
        }

        const newGroups: string[] = [];
        const groupIds = Object.keys(data).reverse();
        for (const groupId of groupIds) {
            if (groups.includes(groupId)) continue;

            newGroups.push(groupId!);
        }
        setGroups(prev => [...prev, ...newGroups]);

        console.log(`Found ${newGroups.length} new groups`);
        console.groupEnd();

        setIsLoading(false);
    };

    const [sentryRef, { rootRef }] = useInfiniteScroll({
        loading: isLoading,
        hasNextPage,
        onLoadMore: fetchData,
        // `rootMargin` is passed to `IntersectionObserver`.
        // We can use it to trigger 'onLoadMore' when the sentry comes near to become
        // visible, instead of becoming fully visible on the screen.
        rootMargin: '0px 0px 400px 0px',
    });
    
    useEffect(() => {
        // Realtime listener for new groups

        let groupAddedQuery: Query | null = null;
        if ((firstItem === null || firstItem === undefined) && !hasNextPage)
            groupAddedQuery = query(ref(db, `users/${user!.uid}/groups`));

        if (firstItem !== null && firstItem !== undefined)
            groupAddedQuery = query(ref(db, `users/${user!.uid}/groups`), orderByKey(), startAfter(firstItem));

        if (!groupAddedQuery) return;

        return onChildAdded(
            groupAddedQuery,
            async (data: DataSnapshot) => {
                console.groupCollapsed("Group Added");
                console.log(`Id: ${data.key}`);
                console.groupEnd();

                setGroups(prev => [data.key!, ...prev]);
            }
        );
    }, [firstItem, hasNextPage]);

    useEffect(() => {
        const onChildRemovedUnsubscribe = onChildRemoved(ref(db, `users/${user!.uid}/groups`), (data) => {
            console.groupCollapsed("Removing Group Connection");
            console.log(`Id: ${data.key}`);
            console.groupEnd();
            
            setGroups(prev => prev.filter(id => id !== data.key));
        });
        
        return () => {
            onChildRemovedUnsubscribe();
        };
    }, []);

    const onNotExists = (error: Error, groupId: string) => {
        if (error.message.toLowerCase() !== 'permission denied') return;

        // Remove user connection to the group
        remove(ref(db, `users/${user!.uid}/groups/${groupId}`));
    };

    return (
        <>
            <div>Groups</div>
            <div>{JSON.stringify({ uid: user!.uid, email: user!.email, displayName: user!.displayName, photoUrl: user!.photoURL })}</div>
            <div ref={rootRef}>
                {groups.map(groupId => <Group key={groupId} groupId={groupId!} onNotExisting={onNotExists} />)}
                <div ref={sentryRef}></div>
            </div>
        </>
    )
};

export default Groups;