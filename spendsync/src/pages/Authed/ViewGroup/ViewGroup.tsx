// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FC, useEffect, useState } from 'react';
import { NavLink, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { ref, get, DataSnapshot, onChildChanged } from 'firebase/database';
import { isMobile } from 'react-device-detect';

import { db } from '../../../firebase';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { useResizeOnDragGroup } from '../../../hooks/useResizeOnDrag';
import Expenses from '../../../components/molecules/Expenses';
import Members from '../../../components/molecules/Members';
import Avatar from '../../../components/atoms/Avatar';
import Drawer from '../../../components/atoms/Drawer';

const ViewGroup: FC = () => {
    useDocumentTitle('SpendSync - View Group');
    const [resizeRef] = useResizeOnDragGroup();

    const { groupId } = useParams();
    const [name, setName] = useState<string>('');
    const [managedBy, setManagedBy] = useState<string>('');
    const [owed, setOwed] = useState<{ [key: string]: number; }>({});

    const outletComponent = useOutlet();
    const navigate = useNavigate();
    
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
            <div style={{ gridArea: 'group-info', display: 'grid', gridTemplateRows: '160px 1fr', overflow: 'hidden' }} ref={resizeRef}>
                <div className="group-info" style={{ backgroundColor: 'blueviolet' }}>
                    <div>Group Information {groupId} - {name} - <Avatar id={managedBy} /> - {JSON.stringify(owed)}</div>
                    <NavLink to='new-activity'>New Expense</NavLink><span>  </span>
                    <NavLink to='new-user'>New User</NavLink>
                </div>
                <Members groupId={groupId!} />
            </div>
            <Expenses groupId={groupId!} />

            {!isMobile ? <Drawer open={!!outletComponent} onClose={() => { navigate(-1); }}>{outletComponent}</Drawer> : <></>}
        </>
    );
};

export default ViewGroup;