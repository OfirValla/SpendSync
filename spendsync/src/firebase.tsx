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
    signOut,
} from "firebase/auth";
import { getDatabase } from 'firebase/database';

import { isMobile } from 'react-device-detect';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID
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