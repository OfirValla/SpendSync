import { FC, useEffect, useState } from 'react';
import { DataSnapshot, get, ref } from 'firebase/database';
import stylex from '@stylexjs/stylex';

import { db } from '../../../firebase';
import userSilhouette from '../../../assets/UserSilhouette.svg';

import { styles } from '../../../styles/member';

interface AvatarProps {
    id: string | null | undefined;
}

const Avatar: FC<AvatarProps> = ({ id }) => {
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
        <img
            src={photo ?? ''}
            alt={name ? name : 'User profile image'}
            referrerPolicy='no-referrer'
            title={`${name ?? 'No Username'} - ${email}`}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = userSilhouette;
            }}
            {...stylex.props(styles.image)}
        />
    );
};

export default Avatar;