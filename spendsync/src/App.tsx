import { FC } from 'react';

import Loader from './components/atoms/Loader';
import Login from './pages/Login';
import Error from './pages/Error';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';

import './App.css';

const ComponentSelector: { [id: string]: FC } = {
    'loading': Loader,
//    'authed': Authed,
    'not-authed': Login,
    'error': Error
};

const App: FC = () => {
    const [user, loading, error] = useAuthState(auth);

    let state = 'loading';
    if (user) state = 'authed';
    if (!user && !loading) state = 'not-authed';
    if (error) state = 'error';

    console.log({ user, loading, state });
    const Component = ComponentSelector[state];
    return (
        <Component />
    );
}

export default App;
