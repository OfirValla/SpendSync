import { FC, memo, useEffect, useState } from 'react';
import { DataSnapshot, get, ref } from 'firebase/database';
import stylex from '@stylexjs/stylex';

import { db } from '../../../firebase';
import userSilhouette from '../../../assets/UserSilhouette.svg';

import { styles } from '../../../styles/member';
import { global } from '../../../styles/global';

interface MemberProps {
    id: string | null | undefined;
}

const Member: FC<MemberProps> = memo(({ id }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [photo, setPhoto] = useState<string>('');

    useEffect(() => {
        if (!id) return;

        get(ref(db, `users/${id}/name`)).then((data: DataSnapshot) => { setName(data.val()); });
        get(ref(db, `users/${id}/email`)).then((data: DataSnapshot) => { setEmail(data.val()); });
        get(ref(db, `users/${id}/photo`)).then((data: DataSnapshot) => { setPhoto(data.val()); });
    }, [id]);

    return (
        <div style={{ display: 'grid', gridTemplateAreas: '"member-image name" "member-image email"', justifyContent: 'start', gridColumnGap: '10px', paddingBottom: '20px' }}>
            <img
                src={photo ?? ''}
                alt={name ? name : 'User profile image'}
                referrerPolicy='no-referrer'
                title={`${name ?? 'No Username'} - ${email}`}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = userSilhouette;
                }}
                {...stylex.props(styles.image, global.preventSelect)}
                draggable='false'
                style={{ gridArea: 'member-image' }}
            />
            <span>{name ?? email}</span>
            <span>{name && email}</span>
        </div>
    );
});

export default Member;