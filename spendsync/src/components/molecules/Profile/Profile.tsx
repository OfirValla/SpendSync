import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, signOutUser } from '../../../firebase';
import Avatar from '../../atoms/Avatar';
import stylex from '@stylexjs/stylex';
import { profileInfo } from '../../../styles/profile.stylex';

const Profile: FC = () => {
    const [user, ,] = useAuthState(auth);

    return (
        <div className="profile" {...stylex.props(profileInfo.base)} >
            <div>IsMobile: {isMobile.toString()}</div>
            <Avatar id={user?.uid} />
            <b>{user?.displayName ?? user?.email}</b>
            <button onClick={signOutUser}>Sign Out</button>
            <NavLink to="new-group">New Group</NavLink>
        </div>
    );
};

export default Profile;