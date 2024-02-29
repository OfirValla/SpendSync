import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, query, onChildAdded, onChildRemoved, onChildChanged } from 'firebase/database';

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
    
    useEffect(() => {
        const onChildAddedUnsubscribe = onChildAdded(query(ref(db, `groups/${groupId}/activity`)), (data) => {
            const result: ActivityDTO = data.val();
            const newActivity: Activity = { id: data.key, ...result };

            console.groupCollapsed("Adding Activity");
            console.log(`Id: ${newActivity.id}`);
            console.log(`Title: ${newActivity.title}`);
            console.groupEnd();

            setActivities(prev => {
                if (prev.some(e => e.id === newActivity.id))
                    return prev;
                return [newActivity, ...prev];
            });
        });

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
            onChildAddedUnsubscribe();
            onChildRemovedUnsubscribe();
            onChildChangedUnsubscribe();
        };
    }, []);

    return (
        <>
            <div>View Group {groupId}</div>
            <div >
                {
                    activities.map((activity, index) => {
                        return <div key={index}>{activity.id} - {activity.title}</div>;
                    })
                }
            </div>
        </>
    )
};

export default ViewGroup;