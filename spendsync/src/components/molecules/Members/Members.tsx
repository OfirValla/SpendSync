import { CSSProperties, FC, useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { DataSnapshot, Query, endBefore, get, limitToLast, onChildAdded, onChildRemoved, orderByKey, query, ref, startAfter } from 'firebase/database';

import { db } from '../../../firebase';
import Avatar from '../../atoms/Avatar';

import './Members.css';
import { isMobile } from 'react-device-detect';
import Member from '../../atoms/Member';

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
        console.log(`Group Id: ${groupId}`);

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
        console.groupEnd();

        setMembers(prev => [data.key!, ...prev]);
    }

    useEffect(() => {
        setMembers([]);
        setIsLoading(false);
        setHasNextPage(true);
        setFirstItem(null);
    }, [groupId]);

    useEffect(() => {
        let memberAddedQuery: Query | null = null;
        if ((firstItem === null || firstItem === undefined) && !hasNextPage)
            memberAddedQuery = query(ref(db, `groups/${groupId}/members`));

        if (firstItem !== null && firstItem !== undefined)
            memberAddedQuery = query(ref(db, `groups/${groupId}/members`), orderByKey(), startAfter(firstItem));

        if (!memberAddedQuery) return;

        return onChildAdded(
            memberAddedQuery,
            onChildAddedCallback
        );
    }, [firstItem, hasNextPage, groupId]);

    useEffect(() => {
        return onChildRemoved(ref(db, `groups/${groupId}/members`), (data: DataSnapshot) => {
            console.groupCollapsed("Removing Member");
            console.log(`Id: ${data.key}`);
            console.groupEnd();
            setMembers(prev => prev.filter(memberId => memberId !== data.key));
        });
    }, [groupId]);

    // If in mobile mode show members using Avatar component
    // If in desktop mode show members using Member component

    const Component = isMobile ? Avatar : Member;

    const styles: CSSProperties = isMobile ? { display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', overflowX: 'auto' }
                                           : { display: 'flex', flexDirection: 'column', overflowY: 'auto', height: 'calc(100vh - 160px)' }

    return (
        <div className="members" style={{ ...styles, backgroundColor: 'brown' }} >
            {
                members.map(member => {
                    return <Component key={member} id={member} />
                })
            }

            <div ref={sentryRef}></div>
        </div>
    );
};

export default Members;