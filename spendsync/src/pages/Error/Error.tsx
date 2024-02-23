import { FC } from 'react';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase';

const Error: FC = () => {
    const [,, error] = useAuthState(auth);
    return (
        <div>{ error?.message }</div>
    )
};

export default Error;