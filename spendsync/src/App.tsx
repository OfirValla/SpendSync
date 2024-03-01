import { FC, useEffect, useState } from 'react';

import Loader from './components/atoms/Loader';
import Authed from './pages/Authed';
import SignIn from './pages/SignIn';
import Error from './pages/Error';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';

import './App.css';

type States = 'loading' | 'authed' | 'not-authed' | 'error';

const ComponentSelector: { [id: string]: FC } = {
    'loading': Loader,
    'authed': Authed,
    'not-authed': SignIn,
    'error': Error
};

const App: FC = () => {
    const [user, loading, error] = useAuthState(auth);
    const [state, setState] = useState<States>('loading');

    useEffect(() => {
        let newState: States = 'loading';
        if (user) newState = 'authed';
        if (!user && !loading) newState = 'not-authed';
        if (error) newState = 'error';

        setState(newState);
    }, [user, loading, error]);
    
    const Component = ComponentSelector[state];
    return (
        <Component />
    );
}

export default App;
