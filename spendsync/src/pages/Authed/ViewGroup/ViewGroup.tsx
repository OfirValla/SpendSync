import { FC, useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { ref, get, DataSnapshot, onChildChanged } from 'firebase/database';
import { isMobile } from 'react-device-detect';

import { db } from '../../../firebase';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import Expenses from '../../../components/molecules/Expenses';
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
        <>
            <div className="group-data" style={{ display: 'grid', gridAutoFlow: 'row', gridTemplateRows: 'max-content 1fr', overflow: 'hidden' }}>
                <div className="group-info">
                    <div>Group Information {groupId} - {name} - <Member id={managedBy} /> - {JSON.stringify(owed)}</div>
                <NavLink to='new-activity'>New Expense</NavLink>
                </div>
                <Members groupId={groupId!} />
            </div>
            <Expenses groupId={groupId!} />

            {!isMobile ? <Outlet /> : <></>}
        </>
    );
};

export default ViewGroup;