import { FC, useEffect, useState } from 'react';
import { Activity as ActivityType, ActivityDTO } from '../../../types/Activity';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { DataSnapshot, Query, endBefore, get, limitToLast, onChildAdded, onChildChanged, onChildRemoved, orderByKey, query, ref, startAfter } from 'firebase/database';
import { db } from '../../../firebase';
import Activity from '../../atoms/Activity';

interface ActivitiesProps {
    groupId: string;
}

const Activities: FC<ActivitiesProps> = ({ groupId }) => {
    const [activities, setActivities] = useState<ActivityType[]>([]);
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
        else {
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

        const newActivities: ActivityType[] = (Object.keys(data) || []).map(id => { return { id, ...data[id] }; }).reverse();
        setActivities(prev => [...prev, ...newActivities]);

        console.log(`Found ${newActivities.length} new activities`);
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
        console.groupCollapsed("Activity Added");
        console.log(`Id: ${data.key}`);
        const result: ActivityDTO = data.val();
        const newActivity: ActivityType = { id: data.key, ...result };
        console.log(`Title: ${newActivity.title}`);
        console.groupEnd();

        setActivities(prev => [newActivity, ...prev]);
    }
    
    useEffect(() => {
        let activityAddedQuery: Query | null = null;
        if ((firstItem === null || firstItem === undefined) && !hasNextPage)
            activityAddedQuery = query(ref(db, `groups/${groupId}/activity`));

        if (firstItem !== null && firstItem !== undefined)
            activityAddedQuery = query(ref(db, `groups/${groupId}/activity`), orderByKey(), startAfter(firstItem));

        if (!activityAddedQuery) return;

        return onChildAdded(
            activityAddedQuery,
            onChildAddedCallback
        );
    }, [firstItem, hasNextPage, groupId]);

    useEffect(() => {
        const onChildRemovedUnsubscribe = onChildRemoved(ref(db, `groups/${groupId}/activity`), (data: DataSnapshot) => {
            console.groupCollapsed("Removing Activity");
            console.log(`Id: ${data.key}`);
            console.log(`Title: ${data.val().title}`);
            console.groupEnd();
            setActivities(prev => prev.filter(activity => activity.id !== data.key));
        });

        const onChildChangedUnsubscribe = onChildChanged(ref(db, `groups/${groupId}/activity`), (data: DataSnapshot) => {
            console.groupCollapsed("Activity Changed");
            console.log(`Id: ${data.key}`);
            console.log(`New Data: ${JSON.stringify(data.val())}`);
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
        };
    }, [groupId]);

    return (
        <div>
            {
                activities.map(activity => {
                    return <Activity key={activity.id} {...activity} />;
                })
            }

            <div ref={sentryRef}></div>
        </div>
    );
};

export default Activities;