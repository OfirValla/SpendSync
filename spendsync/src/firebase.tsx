import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup
} from "firebase/auth";
import { getDatabase } from 'firebase/database';

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;