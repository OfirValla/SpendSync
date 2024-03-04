import { FC } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";

import { isMobile } from 'react-device-detect';

import { auth, signOutUser } from '../../../firebase';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import Groups from '../../../components/molecules/Groups';

const Profile: FC = () => {
    useDocumentTitle('SpendSync - Profile');

    const [user, ,] = useAuthState(auth);
    
    return (
        <>
            <div>IsMobile: {isMobile.toString()}</div>
            <div>Profile - Section 1 - User information (Image + Email + Name)</div>
            <button onClick={signOutUser}>Sign Out</button>
            <div>Profile - Section 2 - Groups</div>
            <div>{JSON.stringify({ uid: user!.uid, email: user!.email, displayName: user!.displayName, photoUrl: user!.photoURL })}</div>
            <Groups />
        </>
    )
};

export default Profile;