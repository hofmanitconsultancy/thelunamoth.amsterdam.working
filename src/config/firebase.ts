import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSYnrg7FubEd7sliOyHQU0x2KbXwoXI30",
  projectId: "thelunamoth-7a452",
  authDomain: "thelunamoth-7a452.firebaseapp.com",
  storageBucket: "thelunamoth-7a452.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Collection references
export const COLLECTIONS = {
  USERS: 'users',
  MEMBERSHIPS: 'memberships',
  BIRTH_DATA: 'birthData'
} as const;

// Helper function to ensure user is authenticated
export const ensureAuth = () => {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated');
  }
  return auth.currentUser;
};