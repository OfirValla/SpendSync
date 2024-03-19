import { FC, useEffect, useRef, useState } from 'react';
import { DataSnapshot, Unsubscribe, get, limitToFirst, onChildChanged, query, ref } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

import { auth, db } from '../../../firebase';
import { GroupPreview } from '../../../types/Group';

interface GroupProps {
    groupId: string;
    onNotExisting: (error: Error, groupId: string) => void;
}

const updatableGroupKeys = ['name', 'owed', 'members'];

const Group: FC<GroupProps> = ({ groupId, onNotExisting = () => { } }) => {
    const [groupInfo, setGroupInfo] = useState<GroupPreview | null>(null);
    const unsubscribeOnChildChangeEvent = useRef<Unsubscribe>(() => { });
    const [user, ,] = useAuthState(auth);

    const onChildChangedCallback = (snapshot: DataSnapshot) => {
        const groupId: string = snapshot.ref.parent!.key!;
        console.groupCollapsed("Expense Changed");
        console.log(`Id: ${groupId}`);
        console.log(`Key: ${snapshot.key}`);
        console.log(`New Data: ${JSON.stringify(snapshot.val())}`);
        console.log(`Is Updating: ${updatableGroupKeys.includes(snapshot.key!)}`);
        console.groupEnd();

        // Check only if name or owed has updated
        if (!updatableGroupKeys.includes(snapshot.key!)) return;

        if (snapshot.key! === 'owed') {
            setGroupInfo(prev => {
                return { ...prev!, owed: snapshot.val()[user!.uid] };
            });
            return;
        }

        setGroupInfo(prev => {
            return { ...prev!, [snapshot.key!]: snapshot.val() };
        });
    }

    useEffect(() => {
        Promise.all([
            get(ref(db, `groups/${groupId}/name`)),
            get(ref(db, `groups/${groupId}/owed/${user!.uid}`)),
            get(query(ref(db, `groups/${groupId}/members`), limitToFirst(5))),
        ]).then(([nameData, owedData, membersData]) => {
            const group: GroupPreview = { id: groupId, name: nameData.val(), owed: owedData.val() ?? {}, lastUpdate: -1, members: Object.keys(membersData.val()) };
            setGroupInfo(group);

            unsubscribeOnChildChangeEvent.current = onChildChanged(ref(db, `groups/${groupId}`), onChildChangedCallback);
        }).catch((error: Error) => onNotExisting(error, groupId));
            
        return () => {
            unsubscribeOnChildChangeEvent.current && unsubscribeOnChildChangeEvent.current();
        };
    }, [groupId]);

    return (
        <div>
            <NavLink to={`/view/${groupId}`}><b>{groupId}</b></NavLink> - {groupInfo?.name} - {JSON.stringify(groupInfo?.owed)} - {JSON.stringify(groupInfo?.members)}
        </div>
    );
};

export default Group;