import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import Groups from '../../../components/molecules/Groups';
import ProfileInfo from '../../../components/molecules/Profile';
import { useResizeOnDragProfile } from '../../../hooks/useResizeOnDrag';
import { colors } from '../../../styles/variables.stylex';

const Profile: FC = () => {
    useDocumentTitle('SpendSync - Profile');
    const [resizeRef] = useResizeOnDragProfile();

    return (
        <>
            <div className="resizable" style={{ backgroundColor: colors.mainBackground, color: colors.primaryText, gridArea: 'profile', display: 'grid', gridTemplateRows: '160px 1fr', gridAutoFlow: 'row', right: 0 }} ref={resizeRef}>
                <ProfileInfo />
                <Groups />
            </div>

            <div style={{ gridArea: 'other' }}>
                {!isMobile ? <Outlet /> : <></>}
            </div>
        </>
    )
};

export default Profile;