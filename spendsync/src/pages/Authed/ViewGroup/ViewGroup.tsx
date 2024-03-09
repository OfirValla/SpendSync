import { FC, useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { ref, get, DataSnapshot, onChildChanged } from 'firebase/database';
import { isMobile } from 'react-device-detect';

import { db } from '../../../firebase';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import Activities from '../../../components/molecules/Activities';
import Members from '../../../components/molecules/Members';
import Member from '../../../components/atoms/Member';

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
        Promise.all([
            get(ref(db, `groups/${groupId}/name`)).then(updateName),
            get(ref(db, `groups/${groupId}/managedBy`)).then(updateManagedBy),
            get(ref(db, `groups/${groupId}/owed`)).then(updatedOwed)
        ]);

        return onChildChanged(ref(db, `groups/${groupId}`), (snapshot) => {
            if (snapshot.key === 'name') updateName(snapshot);
            if (snapshot.key === 'managedBy') updateManagedBy(snapshot);
            if (snapshot.key === 'owed') updatedOwed(snapshot);
        });
    }, [groupId]);

    return (
        <div>
            <div>View Group - Section 1 - Group Information {groupId} - {name} - <Member id={managedBy} /> - {JSON.stringify(owed)}</div>
            <div>View Group - Section 2 - Members (Scrollable circles x-axis)</div>
            <Members groupId={groupId!} />
            <div>View Group - Section 3 - Activities (Scrollable activities y-axis)</div>
            <NavLink to='new-activity'>New Activity</NavLink>
            <Activities groupId={groupId!} />

            {!isMobile ? <Outlet /> : <></>}
        </div>
    );
};

export default ViewGroup;