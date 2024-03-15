import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, signOutUser } from '../../../firebase';
import Member from '../../atoms/Member';

const Profile: FC = () => {
    const [user, ,] = useAuthState(auth);

    return (
        <div className="profile">
            <Member id={user?.uid} />
            <b>{user?.displayName ?? user?.email}</b>
            <button onClick={signOutUser}>Sign Out</button>
        </div>
    );
};

export default Profile;