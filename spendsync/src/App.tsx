import { FC, useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';

import Loader from './components/atoms/Loader';
import NotAuthed from './pages/NotAuthed';
import Authed from './pages/Authed';
import Error from './pages/Error';

import './App.css';

type States = 'loading' | 'authed' | 'not-authed' | 'error';

const ComponentSelector: { [id: string]: FC } = {
    'loading': Loader,
    'authed': Authed,
    'not-authed': NotAuthed,
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
