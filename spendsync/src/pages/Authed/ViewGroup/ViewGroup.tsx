// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FC, useEffect, useState } from 'react';
import { NavLink, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { ref, get, set, DataSnapshot, onChildChanged } from 'firebase/database';
import { isMobile } from 'react-device-detect';
import { useAuthState } from 'react-firebase-hooks/auth';
import stylex from '@stylexjs/stylex';

import { auth, db } from '../../../firebase';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { useResizeOnDragGroup } from '../../../hooks/useResizeOnDrag';
import Expenses from '../../../components/molecules/Expenses';
import Members from '../../../components/molecules/Members';
import Avatar from '../../../components/atoms/Avatar';
import Drawer from '../../../components/atoms/Drawer';

import { colors } from '../../../styles/variables.stylex';
import Expense from '../../../types/Expense';
import { authed } from '../../../styles/global.stylex';

const ViewGroup: FC = () => {
    useDocumentTitle('SpendSync - View Group');
    const [resizeRef] = useResizeOnDragGroup();

    const { groupId } = useParams();
    const [user, ,] = useAuthState(auth);

    const [name, setName] = useState<string>('');
    const [managedBy, setManagedBy] = useState<string>('');
    const [owed, setOwed] = useState<{ [key: string]: number; }>({});

    const outletComponent = useOutlet();
    const navigate = useNavigate();
    
    const updateName = (data: DataSnapshot) => setName(data.val());
    const updateManagedBy = (data: DataSnapshot) => setManagedBy(data.val()); 
    const updatedOwed = (data: DataSnapshot) => setOwed(data.val()[user!.uid]);
    
    useEffect(() => {
        Promise.all([
            get(ref(db, `groups/${groupId}/name`)).then(updateName),
            get(ref(db, `groups/${groupId}/managedBy`)).then(updateManagedBy),
            get(ref(db, `groups/${groupId}/owed`)).then(updatedOwed),
            set(ref(db, `users/${user!.uid}/groups/${groupId}/hasUpdate`), false)
        ]).catch(() => navigate('/'));

        const onChildChangedUnsubscribe = onChildChanged(ref(db, `groups/${groupId}`), (snapshot) => {
            if (snapshot.key === 'name') updateName(snapshot);
            if (snapshot.key === 'managedBy') updateManagedBy(snapshot);
            if (snapshot.key === 'owed') updatedOwed(snapshot);
        });

        return () => {
            setName('');
            setManagedBy('');
            setOwed({});

            onChildChangedUnsubscribe();
        }
    }, [groupId]);

    const onNewExpense = async (expense: Expense) => {
        console.log(`New Expense: ${expense.id}`);
        await set(ref(db, `users/${user!.uid}/groups/${groupId}/hasUpdate`), false);
    }

    return (
        <div {...stylex.props(isMobile ? authed.mobileGroup : authed.desktopGroup)}>
            <div style={{ backgroundColor: colors.mainBackground, color: colors.primaryText, gridArea: 'group-info', display: 'grid', gridTemplateRows: '160px 1fr', overflow: 'hidden' }} ref={resizeRef}>
                <div className="group-info">
                    <div>Group Information {groupId} - {name} - <Avatar id={managedBy} /> - {JSON.stringify(owed)}</div>
                    <NavLink to='new-expense'>New Expense</NavLink><span>  </span>
                    <NavLink to='new-user'>New User</NavLink>
                </div>
                <Members groupId={groupId!} />
            </div>
            <Expenses groupId={groupId!} onNewExpense={onNewExpense} />

            {!isMobile ? <Drawer open={!!outletComponent} onClose={() => { navigate(-1); }}>{outletComponent}</Drawer> : <></>}
        </div>
    );
};

export default ViewGroup;