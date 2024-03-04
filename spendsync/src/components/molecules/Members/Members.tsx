import { FC, useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { DataSnapshot, Query, endBefore, get, limitToLast, onChildAdded, onChildRemoved, orderByKey, query, ref, startAfter } from 'firebase/database';

import { db } from '../../../firebase';
import Member from '../../atoms/Member';

import './Members.css';

interface MembersProps {
    groupId: string;
}

const Members: FC<MembersProps> = ({ groupId }) => {
    const [members, setMembers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [firstItem, setFirstItem] = useState<string | null | undefined>(null);

    const fetchData = async () => {
        console.groupCollapsed("Fetching Members");

        if (isLoading) {
            console.log("Already loading");
            console.groupEnd();
            return;
        }
        setIsLoading(true);

        let result: DataSnapshot;
        if (members.length !== 0)
            result = await get(query(ref(db, `groups/${groupId}/members`), orderByKey(), endBefore(members!.at(-1)!), limitToLast(10)));
        else {
            result = await get(query(ref(db, `groups/${groupId}/members`), orderByKey(), limitToLast(10)));
            setFirstItem(Object.keys(result.val() || {}).at(-1));
        }

        const data: { [key: string]: boolean; } = result.val();
        if (!data) {
            console.log("No more members");
            setHasNextPage(false);
            console.groupEnd();
            return;
        }

        const newMembers: string[] = (Object.keys(data) || []).reverse();
        setMembers(prev => [...prev, ...newMembers]);

        console.log(`Found ${newMembers.length} new members`);
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
        rootMargin: '0px 0px 0px 50px',
    });

    const onChildAddedCallback = (data: DataSnapshot) => {
        console.groupCollapsed("Member Added");
        console.log(`Id: ${data.key}`);
        //const result: ActivityDTO = data.val();
        //const newActivity: ActivityType = { id: data.key, ...result };
        //console.log(`Title: ${newActivity.title}`);
        console.groupEnd();

        setMembers(prev => [data.key!, ...prev]);
    }
    
    useEffect(() => {
        let activityAddedQuery: Query | null = null;
        if ((firstItem === null || firstItem === undefined) && !hasNextPage)
            activityAddedQuery = query(ref(db, `groups/${groupId}/members`));

        if (firstItem !== null && firstItem !== undefined)
            activityAddedQuery = query(ref(db, `groups/${groupId}/members`), orderByKey(), startAfter(firstItem));

        if (!activityAddedQuery) return;

        return onChildAdded(
            activityAddedQuery,
            onChildAddedCallback
        );
    }, [firstItem, hasNextPage, groupId]);

    useEffect(() => {
        const onChildRemovedUnsubscribe = onChildRemoved(ref(db, `groups/${groupId}/members`), (data: DataSnapshot) => {
            console.groupCollapsed("Removing Member");
            console.log(`Id: ${data.key}`);
            console.groupEnd();
            setMembers(prev => prev.filter(memberId => memberId !== data.key));
        });

        //const onChildChangedUnsubscribe = onChildChanged(ref(db, `groups/${groupId}/members`), (data: DataSnapshot) => {
        //    console.groupCollapsed("Member Changed");
        //    console.log(`Id: ${data.key}`);
        //    console.log(`New Data: ${JSON.stringify(data.val())}`);
        //    console.groupEnd();

        //    setMembers(prev => {
        //        const itemIdx = prev.findIndex(item => item.id === data.key);
        //        if (itemIdx === -1) return prev;

        //        return [
        //            ...prev.slice(0, itemIdx),
        //            { id: data.key, ...data.val() },
        //            ...prev.slice(itemIdx + 1)
        //        ];
        //    });
        //});

        return () => {
            onChildRemovedUnsubscribe();
            //onChildChangedUnsubscribe();
        };
    }, [groupId]);

    return (
        <div className="members" style={{ display: 'grid', gridAutoFlow: 'column', gridGap: '20px', justifyContent: 'start', overflowX: 'auto' }} >
            {
                members.map(member => {
                    return <Member key={member} id={member} />;
                })
            }

            <div ref={sentryRef}></div>
        </div>
    );
};

export default Members;