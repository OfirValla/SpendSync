import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useAuthState } from 'react-firebase-hooks/auth';
import { DataSnapshot, Query, endBefore, get, limitToLast, onChildAdded, onChildChanged, onChildRemoved, orderByChild, orderByKey, query, ref, remove, startAfter } from 'firebase/database';

import { auth, db } from '../../../firebase';

import Group from '../../atoms/Group';
import { GroupInitialData } from '../../../types/Group';
import { isMobile } from 'react-device-detect';

const Groups: FC = () => {
    const [user, ,] = useAuthState(auth);

    const renderedGroups = useRef<string[]>([]);
    const [groups, setGroups] = useState<GroupInitialData[]>([]);
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
            result = await get(query(ref(db, `users/${user!.uid}/groups`), orderByChild('lastUpdate'), endBefore(groups!.at(-1)!.lastUpdate), limitToLast(10)));
        else {
            result = await get(query(ref(db, `users/${user!.uid}/groups`), orderByChild('lastUpdate'), limitToLast(10)));

            const lastKey = await get(query(ref(db, `users/${user!.uid}/groups`), orderByKey(), limitToLast(1)));
            setFirstItem(Object.keys(lastKey.val() || {}).at(-1));
        }
        
        const data: { [key: string]: GroupInitialData; } = result.val();
        if (!data) {
            console.log("No more groups");
            setHasNextPage(false);
            console.groupEnd();
            return;
        }

        const newGroups: GroupInitialData[] = [];
        const groupIds = Object.keys(data);
        for (const groupId of groupIds) {
            if (groups.some(g => g.id === groupId)) continue;

            newGroups.push({ ...data[groupId], id: groupId });
        }
        setGroups(prev => [...prev, ...newGroups.sort((a, b) => (b.lastUpdate - a.lastUpdate))]);
        renderedGroups.current.push(...groupIds);
        
        console.log(`Found ${newGroups.length} new groups`);
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
                console.log(`Data: ${JSON.stringify(data.val())}`);
                console.groupEnd();

                setGroups(prev => [{ ...data.val(), id: data.key! }, ...prev]);
            }
        );
    }, [firstItem, hasNextPage, user]);

    useEffect(() => {
        const onChildRemovedUnsubscribe = onChildRemoved(ref(db, `users/${user!.uid}/groups`), (data) => {
            console.groupCollapsed("Removing Group Connection");
            console.log(`Id: ${data.key}`);
            console.groupEnd();

            setGroups(prev => prev.filter(group => group.id !== data.key));
            //const newRenderedGroups = renderedGroups.current.filter(id => id !== data.key);
            renderedGroups.current = renderedGroups.current.filter(id => id !== data.key);
        });

        const onChildChangedUnsubscribe = onChildChanged(ref(db, `users/${user!.uid}/groups`), (data) => {
            console.groupCollapsed("Changing Groups Order");
            console.log(`Id: ${data.key}`);
            console.log(`Data: ${JSON.stringify(data.val())}`);
            console.groupEnd();

            // If not shown already -> add it to the groups list
            if (!renderedGroups.current.some(id => id === data.key)) {
                setGroups(prev => [{ id: data.key, ...data.val() }, ...prev]);
                renderedGroups.current.push(data.key!);
                return;
            }

            setGroups(prev => {
                const itemIdx = prev.findIndex(item => item.id === data.key);
                
                return [
                    ...prev.slice(0, itemIdx),
                    { id: data.key, ...data.val() },
                    ...prev.slice(itemIdx + 1)
                ];
            })
            setGroups(prev => prev.sort((a, b) => (b.lastUpdate - a.lastUpdate)));
        });

        return () => { 
            onChildChangedUnsubscribe();
            onChildRemovedUnsubscribe();
        }
    }, [user]);

    const onNotExists = (error: Error, groupId: string) => {
        if (error.message.toLowerCase() !== 'permission denied') return;

        // Remove user connection to the group
        remove(ref(db, `users/${user!.uid}/groups/${groupId}`));
    };

    // Disable scrollable when in mobile mode
    const styles: CSSProperties = isMobile ? {} : { overflowY: 'auto', height: 'calc(100vh - 160px)', }
    return (
        <div className="groups" style={{ backgroundColor: 'teal', ...styles }}>
            {
                groups.map(group =>
                    <Group key={group.id} groupId={group!.id!} onNotExisting={onNotExists} />
                )
            }
            <div ref={sentryRef}></div>
        </div>
    );
};

export default Groups;