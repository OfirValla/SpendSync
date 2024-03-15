import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import Groups from '../../../components/molecules/Groups';
import ProfileInfo from '../../../components/molecules/Profile';

const Profile: FC = () => {
    useDocumentTitle('SpendSync - Profile');
    
    return (
        <>
            <ProfileInfo />
            <Groups />

            {!isMobile ? <Outlet /> : <></>}
        </>
    )
};

export default Profile;