import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import Groups from '../../../components/molecules/Groups';
import ProfileInfo from '../../../components/molecules/Profile';

const Profile: FC = () => {
    useDocumentTitle('SpendSync - Profile');
    
    return (
        <>
            <div style={{ display: 'grid', gridAutoFlow: 'row', gridTemplateRows: 'max-content 1fr', overflow: 'hidden', gridArea: 'profile' }}>
                <div>IsMobile: {isMobile.toString()}</div>
                <ProfileInfo />
                <div>Profile - Section 2 - Groups</div>
                <NavLink to="new-group">New Group</NavLink>
            </div>
            <Groups />

            {!isMobile ? <Outlet /> : <></>}
        </>
    )
};

export default Profile;