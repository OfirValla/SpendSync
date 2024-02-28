import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { ref, query, get, limitToLast, endBefore, orderByKey, DataSnapshot } from 'firebase/database';

import { db } from '../../../firebase';

type ActivityDTO = {
    title: string;
    amount: number;
    currency: string;
    createdAt: string;
    paidBy: string;
    split: { [key: string]: number; };
};

type Activity = ActivityDTO & { id: string; };

const ViewGroup: FC = () => {
    const { groupId } = useParams();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);

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
            result = await get(query(ref(db, `groups/${groupId}/activity`), orderByKey(), limitToLast(10)));
        
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