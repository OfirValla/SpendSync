import { useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';

import { signInWithGoogle } from '../../firebase';

import googleLogo from './Google.svg';

import './Login.css';

const styles = stylex.create({
    container: {
        backgroundColor: 'rgb(66, 133, 244)',
        color: 'rgb(255, 255, 255)',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        transition: 'background-color 0.218s ease 0s, border-color 0.218s ease 0s, box-shadow 0.218s ease 0s',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    button: {
        width: '48px',
        height: '48px',
        textAlign: 'center',
        display: 'block',
        marginTop: '1px',
        marginLeft: '1px',
        float: 'left',
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: '1px',
        whiteSpace: 'nowrap'
    }
});

const Login = () => {
    // On page load -> immideatly request login
    useEffect(() => {
        signInWithGoogle();
    }, []);

    return (
        <div
            {...stylex.props(styles.container)}
            onClick={signInWithGoogle}
        >
            <div {...stylex.props(styles.button)} >
                <img src={googleLogo} alt="Google logo" />
            </div>
            <span>Sign in with Google</span>
        </div>
    );
};

export default Login;