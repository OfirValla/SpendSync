import { FC } from 'react';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../../firebase';

const Groups: FC = () => {
    const [user,, ] = useAuthState(auth);
    return (
        <>
            <div>Groups</div>
            <>{JSON.stringify(user)}</>
        </>
    )
};

export default Groups;