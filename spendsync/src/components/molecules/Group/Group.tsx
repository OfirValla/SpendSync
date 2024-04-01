import { FC, useEffect, useRef, useState } from 'react';
import { DataSnapshot, Unsubscribe, get, onChildChanged, ref } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';

import { auth, db } from '../../../firebase';
import { GroupPreview } from '../../../types/Group';
import { colors } from '../../../styles/variables.stylex';
import Members from '../Members';
import stylex from '@stylexjs/stylex';
import { group } from '../../../styles/group.stylex';

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
    const navigate = useNavigate();
    const params = useParams();
    
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

    const onClick = () => navigate(`/view/${groupId}`);

    useEffect(() => {
        Promise.all([
            get(ref(db, `groups/${groupId}/name`)),
            get(ref(db, `groups/${groupId}/owed/${user!.uid}`)),
            get(ref(db, `users/${user!.uid}/groups/${groupId}/hasUpdate`)),
        ]).then(([nameData, owedData, hasUpdateData]) => {
            const group: GroupPreview = { id: groupId, name: nameData.val(), owed: owedData.val() ?? {}, lastUpdate: -1, hasUpdate: hasUpdateData.val() };
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
        <div onClick={onClick} style={{ color: colors.primaryText }} {...stylex.props(group.container, params.groupId === groupId ? group.active : {})}>
            <b>{groupId}</b> - {groupInfo?.name} - {groupInfo?.hasUpdate.toString()} - {JSON.stringify(groupInfo?.owed)}
            <Members groupId={groupId} previewMode={true} />
        </div>
    );
};

export default Group;