import { useEffect, FC, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';

import { signInWithGoogle, signInWithEmail, signUpWithEmailAndPassword } from '../../firebase';

import googleLogo from './Google.svg';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

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

const SignIn: FC = () => {
    useDocumentTitle('SpendSync - Sign In');

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const emailSignIn = () =>
        signInWithEmail(emailRef.current!.value, passwordRef.current!.value);

    useEffect(() => {
    }, []);

    return (
        <>
            <div><input type="email" ref={emailRef} /> <input type="password" ref={passwordRef} /><button onClick={emailSignIn}>Sign In</button></div>
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
        </>
    );
};

export default SignIn;