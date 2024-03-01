import { FC, useEffect, useRef, useState } from 'react';
import { ref, get, onChildAdded, query, onChildRemoved, DataSnapshot, orderByKey, endBefore, limitToLast, Query, startAfter, onChildChanged, Unsubscribe } from "firebase/database";
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from '../../../firebase';

type Group = {
    id: string | null;
    name: string;
    owed: { [key: string]: number; };
};

const Groups: FC = () => {
    const [user, ,] = useAuthState(auth);
    const [groups, setGroups] = useState<Group[]>([]);    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [firstItem, setFirstItem] = useState<string | null | undefined>(null);

    const unsubscribeOnChildChangeEvents = useRef<{ [key: string]: Unsubscribe; }>({});

    const onChildChangedCallback = (snapshot: DataSnapshot) => {
        const groupId: string = snapshot.ref.parent!.key!;
        console.groupCollapsed("Activity Changed");
        console.log(`Id: ${groupId}`);
        console.log(`Key: ${snapshot.key}`);
        console.log(`New Data: ${JSON.stringify(snapshot.val())}`);
        console.log(`Is Updating: ${['name', 'owed'].includes(snapshot.key!)}`);
        console.groupEnd();

        // Check only if name or owed has updated
        if (!['name', 'owed'].includes(snapshot.key!)) return;

        setGroups(prev => {
            const itemIdx = prev.findIndex(item => item.id === groupId);
            if (itemIdx === -1) return prev;

            const editedGroup = { ...prev[itemIdx], [snapshot.key!]: snapshot.val() };
            return [
                ...prev.slice(0, itemIdx),
                editedGroup,
                ...prev.slice(itemIdx + 1)
            ];
        });
    }

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

        const newGroups: Group[] = [];
        const groupIds = Object.keys(data).reverse();
        for (const groupId of groupIds) {
            if (groups.some(group => group.id === groupId)) continue;

            // Todo if a group is not existing anymore remove it from the user list ofgroups

            unsubscribeOnChildChangeEvents.current[groupId] = onChildChanged(ref(db, `groups/${groupId}`), onChildChangedCallback);

            const [nameData, owedData] = await Promise.all([
                get(ref(db, `groups/${groupId}/name`)),
                get(ref(db, `groups/${groupId}/owed`))
            ]);
            newGroups.push({ id: groupId, name: nameData.val(), owed: owedData.val() });
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

    const onChildAddedCallback = async (data: DataSnapshot) => {
        console.groupCollapsed("Group Added");
        console.log(`Id: ${data.key}`);

        const [nameData, owedData] = await Promise.all([
            get(ref(db, `groups/${data.key}/name`)),
            get(ref(db, `groups/${data.key}/owed`))
        ]);
        const newGroup: Group = { id: data.key, name: nameData.val(), owed: owedData.val() };

        console.log(`Title: ${newGroup.name}`);
        console.groupEnd();

        setGroups(prev => [newGroup, ...prev]);
        unsubscribeOnChildChangeEvents.current[data.key!] = onChildChanged(ref(db, `groups/${data.key}`), onChildChangedCallback);
    };

    useEffect(() => {
        let groupAddedQuery: Query | null = null;
        if ((firstItem === null || firstItem === undefined) && !hasNextPage)
            groupAddedQuery = query(ref(db, `users/${user!.uid}/groups`));

        if (firstItem !== null && firstItem !== undefined)
            groupAddedQuery = query(ref(db, `users/${user!.uid}/groups`), orderByKey(), startAfter(firstItem));

        if (!groupAddedQuery) return;

        return onChildAdded(
            groupAddedQuery,
            onChildAddedCallback
        );
    }, [firstItem, hasNextPage]);

    useEffect(() => {
        const onChildRemovedUnsubscribe = onChildRemoved(ref(db, `users/${user!.uid}/groups`), (data) => {
            console.groupCollapsed("Removing Group Connection");
            console.log(`Id: ${data.key}`);
            console.groupEnd();

            unsubscribeOnChildChangeEvents.current[data.key!]();
            delete unsubscribeOnChildChangeEvents.current[data.key!];

            setGroups(prev => prev.filter(group => group.id !== data.key));
        });
        
        return () => {
            onChildRemovedUnsubscribe();
        };
    }, []);
    
    return (
        <>
            <div>Groups</div>
            <div>{JSON.stringify({ uid: user!.uid, email: user!.email, displayName: user!.displayName, photoUrl: user!.photoURL })}</div>
            <div ref={rootRef}>
                {groups.map(group => <div key={group.id}>{JSON.stringify(group)}</div>)}
                <div ref={sentryRef}></div>
            </div>
        </>
    )
};

export default Groups;