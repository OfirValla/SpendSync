import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { ref, query, get, limitToLast, endBefore, orderByKey, DataSnapshot, onChildAdded, startAfter, startAt, onChildRemoved, onChildChanged } from 'firebase/database';

import { db } from '../../../firebase';

type ActivityDTO = {
    title: string;
    amount: number;
    currency: string;
    createdAt: string;
    paidBy: string;
    split: { [key: string]: number; };
};

type Activity = ActivityDTO & { id: string | null; };

const ViewGroup: FC = () => {
    const { groupId } = useParams();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [firstItem, setFirstItem] = useState<string | null | undefined>(null);

    const fetchData = async () => {
        console.groupCollapsed("Fetching Activities");

        if (isLoading) {
            console.log("Already loading");
            console.groupEnd();
            return;
        }
        setIsLoading(true);

        let result: DataSnapshot;
        if (activities.length !== 0)
            result = await get(query(ref(db, `groups/${groupId}/activity`), orderByKey(), endBefore(activities!.at(-1)!.id), limitToLast(10)));
        else
        {
            result = await get(query(ref(db, `groups/${groupId}/activity`), orderByKey(), limitToLast(10)));
            setFirstItem(Object.keys(result.val() || {}).at(-1));
        }
        
        const data: { [key: string]: ActivityDTO; } = result.val();
        if (!data) {
            console.log("No more activities");
            setHasNextPage(false);
            console.groupEnd();
            return;
        }

        const newActivities = (Object.keys(data) || []).map(id => { return { id, ...data[id] }; }).reverse();
        setActivities(prev => [...prev, ...newActivities]);

        console.log(`Found ${newActivities.length} new activities`);
        console.groupEnd();

        setIsLoading(false);
    }

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

        console.log(firstItem, hasNextPage);
        if ((firstItem === null || firstItem === undefined) && !hasNextPage) {
            console.log("onChildAdded " + firstItem + " no items");

            return onChildAdded(query(ref(db, `groups/${groupId}/activity`)), (data) => {
                const result: ActivityDTO = data.val();
                const newActivity: Activity = { id: data.key, ...result };

                setActivities(prev => [newActivity, ...prev]);
            });
        }

        if (firstItem !== null && firstItem !== undefined) {
            console.log("onChildAdded " + firstItem + " found items");

            return onChildAdded(query(ref(db, `groups/${groupId}/activity`), startAfter(firstItem)), (data) => {
            console.log(data.key, data.val());

            const result: ActivityDTO = data.val();
            const newActivity: Activity = { id: data.key, ...result };

            setActivities(prev => [newActivity, ...prev]);
        });
        }
        
    }, [firstItem, hasNextPage]);

    useEffect(() => {
        const onChildRemovedUnsubscribe = onChildRemoved(ref(db, `groups/${groupId}/activity`), (data) => {
            console.groupCollapsed("Removing Activity");
            console.log(`Id: ${data.key}`);
            console.log(`Title: ${data.val().title}`);
            console.groupEnd();
            setActivities(prev => prev.filter(activity => activity.id !== data.key));
        });

        const onChildChangedUnsubscribe = onChildChanged(ref(db, `groups/${groupId}/activity`), (data) => {
            console.groupCollapsed("Activity Changed");
            console.log(`Id: ${data.key}`);
            console.log(`New Data: ${data.val()}`);
            console.groupEnd();

            setActivities(prev => {
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
        }
    }, [])

    return (
        <>
            <div>View Group {groupId}</div>
            <div ref={rootRef}>
                {
                    activities.map((activity, index) => {
                        return <div key={index}>{activity.id} - {activity.title}</div>;
                    })
                }

                <div ref={sentryRef}></div>
            </div>
        </>
    )
};

export default ViewGroup;