import { FC, useEffect, useState } from 'react';
import { ref, onValue, get } from "firebase/database";

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
        const unsubscribeUserGroups = handleUserGroups();
        
        return () => {
            unsubscribeUserGroups();
        }
    }, []);

    return (
        <>
            <div>Groups</div>
            <div>{JSON.stringify({ uid: user!.uid, email: user!.email, displayName: user!.displayName, photoUrl: user!.photoURL })}</div>
            <div>{groups.map(group => <div>{JSON.stringify(group)}</div>)}</div>
        </>
    )
};

export default Groups;