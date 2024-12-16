import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSYnrg7FubEd7sliOyHQU0x2KbXwoXI30",
  projectId: "thelunamoth-7a452",
  authDomain: "thelunamoth-7a452.firebaseapp.com",
  storageBucket: "thelunamoth-7a452.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);