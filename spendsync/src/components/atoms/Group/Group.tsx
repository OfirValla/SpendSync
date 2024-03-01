import { DataSnapshot, Unsubscribe, get, onChildChanged, ref } from 'firebase/database';
import { FC, useEffect, useRef, useState } from 'react';

import { db } from '../../../firebase';


interface GroupProps {
    groupId: string;
    onNotExisting: (error: Error, groupId: string) => void;
}

type Group = {
    id: string | null;
    name: string;
    owed: { [key: string]: number; };
};

const updatableGroupKeys = ['name', 'owed'];

const Group: FC<GroupProps> = ({ groupId, onNotExisting = () => { } }) => {
    const [groupInfo, setGroupInfo] = useState<Group | null>(null);
    const unsubscribeOnChildChangeEvent = useRef<Unsubscribe>(() => { });

    const onChildChangedCallback = (snapshot: DataSnapshot) => {
        const groupId: string = snapshot.ref.parent!.key!;
        console.groupCollapsed("Activity Changed");
        console.log(`Id: ${groupId}`);
        console.log(`Key: ${snapshot.key}`);
        console.log(`New Data: ${JSON.stringify(snapshot.val())}`);
        console.log(`Is Updating: ${updatableGroupKeys.includes(snapshot.key!)}`);
        console.groupEnd();

        // Check only if name or owed has updated
        if (!updatableGroupKeys.includes(snapshot.key!)) return;

        setGroupInfo(prev => { return { ...prev, [snapshot.key!]: snapshot.val() } });
    }

    useEffect(() => {
        Promise.all([
            get(ref(db, `groups/${groupId}/name`)),
            get(ref(db, `groups/${groupId}/owed`))
        ]).then(([nameData, owedData]) => {
            const group = { id: groupId, name: nameData.val(), owed: owedData.val() };
            setGroupInfo(group);

            unsubscribeOnChildChangeEvent.current = onChildChanged(ref(db, `groups/${groupId}`), onChildChangedCallback);
        }).catch((error: Error) => onNotExisting(error, groupId));
            
        return () => {
            unsubscribeOnChildChangeEvent.current && unsubscribeOnChildChangeEvent.current();
        }
    }, []);

    return <div><b>{groupInfo?.id}</b> - {groupInfo?.name} - {JSON.stringify(groupInfo?.owed)}</div>;
};

export default Group;