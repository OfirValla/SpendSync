import { FC, useEffect, useState } from 'react';
import { ref, onValue, get, onChildAdded, query, onChildRemoved, onChildChanged } from "firebase/database";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../../../firebase';

type GroupInformation = {
    id: string;
    name: string;
    owed: { [key: string]: number; };
};

const Groups: FC = () => {
    const [user, ,] = useAuthState(auth);
    const [groups, setGroups] = useState<GroupInformation[]>([]);
    const [renderedGroupIds, setRenderedGroupIds] = useState<string[]>([]);
    
    const handleUserGroups = () => {
        return onValue(ref(db, `users/${user!.uid}/groups`),
            async (snapshot) => {
                const data = snapshot.val();
                if (!data) return;

                const newGroups: GroupInformation[] = [];
                const groupIds = Object.keys(data);
                for (const groupId of groupIds) {
                    if (renderedGroupIds.includes(groupId)) continue;

                    const [nameData, owedData] = await Promise.all([
                        get(ref(db, `groups/${groupId}/name`)),
                        get(ref(db, `groups/${groupId}/owed`))
                    ]);
                    newGroups.push({ id: groupId, name: nameData.val(), owed: owedData.val() })
                }
                setRenderedGroupIds(prev => [...prev, ...newGroups.map(g => g.id)]);
                setGroups(prev => [...prev, ...newGroups]);
            },
            error => console.error(error)
        );
    }
    
    useEffect(() => {
        const onChildAddedUnsubscribe = onChildAdded(query(ref(db, `users/${user!.uid}/groups`)), async (data) => {
            console.groupCollapsed("Adding Group");
            console.log(`Id: ${data.key}`);

            const [nameData, owedData] = await Promise.all([
                get(ref(db, `groups/${data.key}/name`)),
                get(ref(db, `groups/${data.key}/owed`))
            ]);

            setGroups(prev => {
                if (prev.some(e => e.id === data.key))
                    return prev;
                const newGroup: GroupInformation = { id: data.key, name: nameData.val(), owed: owedData.val() };
                return [...prev, newGroup];
            });

            console.log(`Title: ${nameData.val()}`);
            console.groupEnd();

        });

        const onChildRemovedUnsubscribe = onChildRemoved(ref(db, `users/${user!.uid}/groups`), (data) => {
            console.groupCollapsed("Removing Group");
            console.log(`Id: ${data.key}`);
            console.log(`Title: ${data.val().title}`);
            console.groupEnd();

            setGroups(prev => prev.filter(group => group.id !== data.key));
        });
        
        return () => {
            onChildAddedUnsubscribe();
            onChildRemovedUnsubscribe();
        };
    }, []);

    return (
        <>
            <div>Groups</div>
            <div>{JSON.stringify({ uid: user!.uid, email: user!.email, displayName: user!.displayName, photoUrl: user!.photoURL })}</div>
            <div>{groups.map(group => <div key={group.id}>{JSON.stringify(group)}</div>)}</div>
        </>
    )
};

export default Groups;