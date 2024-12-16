import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  AuthError
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { UserService } from './user.service';
import { AuthErrorHandler } from '../utils/auth-error-handler';

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw AuthErrorHandler.handleError(error as AuthError);
    }
  }

  static async register(email: string, password: string, displayName: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      
      await UserService.createProfile(userCredential.user.uid, {
        email,
        displayName,
        uid: userCredential.user.uid,
        createdAt: new Date()
      });
      
      return userCredential.user;
    } catch (error) {
      throw AuthErrorHandler.handleError(error as AuthError);
    }
  }

  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw AuthErrorHandler.handleError(error as AuthError);
    }
  }

  static getCurrentUser(): User | null {
    return auth.currentUser;
  }
}