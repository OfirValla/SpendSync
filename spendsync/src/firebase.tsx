import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    confirmPasswordReset,
    verifyPasswordResetCode,
    signOut,
} from "firebase/auth";
import { getDatabase } from 'firebase/database';

import { isMobile } from 'react-device-detect';

const firebaseConfig = {
    apiKey: "AIzaSyAvK04e11o3RlHn4yivXguYK4tA9QXqb2A",
    authDomain: "spendsync-3f298.firebaseapp.com",
    databaseURL: "https://spendsync-3f298-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "spendsync-3f298",
    storageBucket: "spendsync-3f298.appspot.com",
    messagingSenderId: "1019232164976",
    appId: "1:1019232164976:web:16e45266ebed7187a8e8b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// If in mobile mode -> Use redirect sign in
// Else -> Use popup sign in
const signInMethod = isMobile ? signInWithRedirect : signInWithPopup;

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInMethod(auth, googleProvider);

const githubProvider = new GithubAuthProvider();
export const signInWithGithub = () => signInMethod(auth, githubProvider);

// Email Sign up/in
export const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
export const signUpWithEmailAndPassword = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
export const requestResetPassword = (email: string) => sendPasswordResetEmail(auth, email);1

export const signOutUser = () => signOut(auth);

export default app;