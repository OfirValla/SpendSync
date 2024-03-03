import { FC, useEffect, useState } from 'react';
import { DataSnapshot, get, ref } from 'firebase/database';
import { db } from '../../../firebase';

interface MemberProps {
    id: string;
}

const Member: FC<MemberProps> = ({ id }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');

    useEffect(() => {
        get(ref(db, `users/${id}/name`)).then((data: DataSnapshot) => { setName(data.val()); });
        get(ref(db, `users/${id}/email`)).then((data: DataSnapshot) => { setEmail(data.val()); });
        get(ref(db, `users/${id}/photo`)).then((data: DataSnapshot) => { setPhoto(data.val()); });
    }, [id])
    // Update the ui

    return (
        <div style={{ display: 'grid', justifyItems: 'center' }}>
            <img src={photo} style={{ borderRadius: '50%', height: '50px', width: '50px' }} />
            <b>{name || email}</b>
        </div>
    );
};

export default Member;