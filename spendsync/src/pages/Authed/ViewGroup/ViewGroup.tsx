import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get, DataSnapshot, onChildChanged } from 'firebase/database';

import { db } from '../../../firebase';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import Activities from '../../../components/molecules/Activities';
import Members from '../../../components/molecules/Members';

const ViewGroup: FC = () => {
    useDocumentTitle('SpendSync - View Group');

    const { groupId } = useParams();
    const [name, setName] = useState<string>('');
    const [managedBy, setManagedBy] = useState<string>('');
    const [owed, setOwed] = useState<{ [key: string]: number; }>({});

    const updateName = (data: DataSnapshot) => setName(data.val());
    const updateManagedBy = (data: DataSnapshot) => setManagedBy(data.val());
    const updatedOwed = (data: DataSnapshot) => setOwed(data.val());
    
    useEffect(() => {
        const nameRef = ref(db, `groups/${groupId}/name`);
        get(nameRef).then(updateName);
        const onChildChangedNameEvent = onChildChanged(nameRef, updateName);

        const managedByRef = ref(db, `groups/${groupId}/managedBy`);
        get(managedByRef).then(updateManagedBy);
        const onChildChangedManagedByEvent = onChildChanged(managedByRef, updateManagedBy);

        const owedRef = ref(db, `groups/${groupId}/owed`);
        get(owedRef).then(updatedOwed);
        const onChildChangedOwedEvent = onChildChanged(owedRef, updatedOwed);

        return () => {
            onChildChangedNameEvent();
            onChildChangedManagedByEvent();
            onChildChangedOwedEvent();
        }
    }, [groupId]);

    return (
        <div>
            <div>View Group - Section 1 - Group Information {groupId} - {name} - {managedBy} - {JSON.stringify(owed)}</div>
            <div>View Group - Section 2 - Members (Scrollable circles x-axis)</div>
            <Members groupId={groupId!} />
            <div>View Group - Section 3 - Activities (Scrollable activities y-axis)</div>
            <Activities groupId={groupId!} />
        </div>
    );
};

export default ViewGroup;