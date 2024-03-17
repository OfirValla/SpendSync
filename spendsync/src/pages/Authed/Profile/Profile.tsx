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
            <div style={{ gridArea: 'profile', display: 'grid', gridTemplateRows: '160px 1fr', gridAutoFlow: 'row' }} >
                <ProfileInfo />
                <Groups />
            </div>
            {!isMobile ? <Outlet /> : <></>}
        </>
    )
};

export default Profile;