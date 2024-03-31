import { FC, useEffect, useRef, useState } from 'react';
import { DataSnapshot, Unsubscribe, get, limitToFirst, onChildChanged, query, ref } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

import { auth, db } from '../../../firebase';
import { GroupPreview } from '../../../types/Group';
import { colors } from '../../../styles/variables.stylex';
import Avatar from '../Avatar';

interface GroupProps {
    groupId: string;
    onNotExisting: (error: Error, groupId: string) => void;
}

const updatableGroupKeys = ['name', 'owed', 'members'];

const Group: FC<GroupProps> = ({ groupId, onNotExisting = () => { } }) => {
    const [groupInfo, setGroupInfo] = useState<GroupPreview | null>(null);
    const unsubscribeOnChildChangeEvent = useRef<Unsubscribe>(() => { });
    const unsubscribeOnHasUpdateChangedEvent = useRef<Unsubscribe>(() => { });
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

    const onHasUpdateChangedCallback = (snapshot: DataSnapshot) => {
        if (snapshot.key !== 'hasUpdate') return;

        setGroupInfo(prev => {
            return { ...prev!, hasUpdate: snapshot.val() };
        });
    }

    useEffect(() => {
        Promise.all([
            get(ref(db, `groups/${groupId}/name`)),
            get(ref(db, `groups/${groupId}/owed/${user!.uid}`)),
            get(ref(db, `users/${user!.uid}/groups/${groupId}/hasUpdate`)),
            get(query(ref(db, `groups/${groupId}/members`), limitToFirst(5))),
        ]).then(([nameData, owedData, hasUpdateData, membersData]) => {
            const group: GroupPreview = { id: groupId, name: nameData.val(), owed: owedData.val() ?? {}, lastUpdate: -1, members: Object.keys(membersData.val()), hasUpdate: hasUpdateData.val() };
            setGroupInfo(group);

            unsubscribeOnChildChangeEvent.current = onChildChanged(ref(db, `groups/${groupId}`), onChildChangedCallback);
            unsubscribeOnHasUpdateChangedEvent.current = onChildChanged(ref(db, `users/${user!.uid}/groups/${groupId}`), onHasUpdateChangedCallback);
        }).catch((error: Error) => onNotExisting(error, groupId));
            
        return () => {
            unsubscribeOnChildChangeEvent.current && unsubscribeOnChildChangeEvent.current();
            unsubscribeOnHasUpdateChangedEvent.current && unsubscribeOnHasUpdateChangedEvent.current();
        };
    }, [groupId]);

    return (
        <div style={{ color: colors.primaryText }}>
            <NavLink to={`/view/${groupId}`}><b>{groupId}</b></NavLink> - {groupInfo?.name} - {groupInfo?.hasUpdate.toString()} - {JSON.stringify(groupInfo?.owed)} - {JSON.stringify(groupInfo?.members)}
            <div style={{ display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', overflowX: 'auto' }}>
                { groupInfo?.members.map(memberId => <Avatar key={memberId} id={memberId} />) }
            </div>
        </div>
    );
};

export default Group;