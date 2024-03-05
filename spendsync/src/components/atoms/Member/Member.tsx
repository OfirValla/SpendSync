import { FC, useEffect, useState } from 'react';
import { DataSnapshot, get, ref } from 'firebase/database';
import { db } from '../../../firebase';

import userSilhouette from '../../../assets/UserSilhouette.svg';

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

    return (
        <div style={{ display: 'grid', justifyItems: 'center', border: '2px white solid', borderRadius: '50%' }}>
            <img
                src={photo ?? ''}
                alt='User profile image'
                referrerPolicy='no-referrer'
                title={`${name ?? 'No Username'} - ${email}`}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = userSilhouette;
                }}
                style={{ borderRadius: '50%', height: '50px', width: '50px', backgroundColor: '#cecece' }}
            />
        </div>
    );
};

export default Member;