import { FirebaseError } from 'firebase/app';
import { AUTH_ERRORS } from '../constants';

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return AUTH_ERRORS.ACCOUNT_EXISTS;
      case 'auth/invalid-email':
        return AUTH_ERRORS.INVALID_EMAIL;
      case 'auth/weak-password':
        return AUTH_ERRORS.WEAK_PASSWORD;
      case 'auth/requires-recent-login':
        return AUTH_ERRORS.REQUIRES_RECENT_LOGIN;
      default:
        return error.message;
    }
  }
  
  return error instanceof Error ? error.message : 'An unexpected error occurred';
}