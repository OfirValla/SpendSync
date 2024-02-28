import { useEffect, FC } from 'react';
import * as stylex from '@stylexjs/stylex';

import { signInWithGoogle } from '../../firebase';

import googleLogo from './Google.svg';

import './Login.css';

const styles = stylex.create({
    container: {
        display: 'flex',
        placeItems: 'center',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#e5e4f3',
        color: 'black',
        borderRadius: '40px',
        overflow: 'hidden',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        transition: 'background-color 0.218s ease 0s, border-color 0.218s ease 0s, box-shadow 0.218s ease 0s',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: '60px',
        height: '60px',
    }
});

const Login: FC = () => {
    // On page load -> immideatly request login
    useEffect(() => {
        signInWithGoogle();
    }, []);

    return (
        <div {...stylex.props(styles.container)}>
            <div
                {...stylex.props(styles.button)}
                onClick={signInWithGoogle}
            >
                <img
                    {...stylex.props(styles.icon)}
                    src={googleLogo}
                    alt="Google logo" />
                <span>Sign in with Google</span>
            </div>
        </div>
    );
};

export default Login;